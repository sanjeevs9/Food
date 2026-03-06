import React,{ useEffect, useState } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import MenuUpdate from "./MenuUpdate";
import AddMenu from "./Addmenu";
import { errorToast, successToast } from "../../toast";
import { sidebar } from "../../atoms/alert";
import { useRecoilState } from "recoil";


 function Menutable() {
  let token = localStorage.getItem("token");
  const [menu, setmenu] = useState([]);
  const[open,setopen]=useState(false);
  const[menuadd,setmenuadd]=useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const[bar ,setbarr]=useRecoilState(sidebar);

  useEffect(() => {
    if(!token){
      token=sessionStorage.getItem("token")
      if(!token){
        errorToast("please login")
        return
      }
    }
    axios
      .get(`${NETWORK}/food/seller/itemm`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setmenu(res.data);
      })
      .catch((error) => {});
  }, []);

  function handle(item){
    if (item && typeof item === 'object') {
      setSelectedItem(item);
      setopen(true);
    } else {
      setSelectedItem(null);
      setopen(false);
    }
  }

  function handleaddmenu(){
    setmenuadd(!menuadd)
  }

  function addItem(data){
    setmenu([data, ...menu])
  }

  async function deleteItem(id){
    if(!token){
      token=sessionStorage.getItem("token")
    }
    try {
      await axios.delete(`${NETWORK}/food/seller/menuitem/${id}`, {
        headers: { Authorization: token }
      });
      setmenu(menu.filter(item => item._id !== id));
      successToast("Item deleted");
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to delete");
    }
  }

  return (
    <div className="overflow-x-auto">
      {/* Add Item button */}
      <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
        <p className="font-['Outfit'] text-sm text-stone-500">{menu.length} items</p>
        <button
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-['Outfit'] text-sm font-medium rounded-xl transition-colors"
          onClick={handleaddmenu}
        >
          + Add Item
        </button>
        {menuadd ? <AddMenu prop={handleaddmenu} addItem={addItem} /> : null}
      </div>

      {open && selectedItem && (
        <MenuUpdate
          prop1={() => handle(null)}
          id={selectedItem._id}
          itemData={selectedItem}
        />
      )}

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {menu.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center">
                <p className="font-['Outfit'] text-sm text-stone-400">No menu items yet. Add your first item above.</p>
              </td>
            </tr>
          ) : (
            menu.map((item) => (
              <tr key={item._id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={item.imgUrl}
                    className="w-14 h-14 sm:w-20 sm:h-16 rounded-xl object-cover bg-stone-100"
                    alt={item.foodName}
                  />
                </td>
                <td className="px-6 py-4 font-['Outfit'] text-sm font-medium text-stone-900">
                  {item.foodName}
                </td>
                <td className="px-6 py-4 font-['Outfit'] text-sm font-semibold text-stone-900">
                  &#8377;{item.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      className="font-['Outfit'] text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                      onClick={() => handle(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-['Outfit'] text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(Menutable);
