import React,{ useEffect, useState } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import MenuUpdate from "./MenuUpdate";
import AddMenu from "./Addmenu";
import { errorToast } from "../../toast";
import { sidebar } from "../../atoms/alert";
import { useRecoilState } from "recoil";


 function Menutable() {
  let token = localStorage.getItem("token");
  const [menu, setmenu] = useState([]);
  const[open,setopen]=useState(false);
  const[menuadd,setmenuadd]=useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const[bar ,setbarr]=useRecoilState(sidebar);
  const [refreshMenu, setRefreshMenu] = useState(false);

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
      .catch((error) => {
   
      });
  }, []);

  function handle(id){
    setSelectedId(id);
    setRefreshMenu(p=>!p);
    setopen(!open)
  }

    function handleaddmenu(){
      setmenuadd(!menuadd)
    }

    function addItem(data){

      setmenu([data, ...menu])
    }
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg  ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-white uppercase bg-yellow-700 ">
            <tr>
              
              <th scope="col" class="px-16 py-3 absolute">

              <div className={` ${bar?`hidden`:``}  sm:flex -translate-x-14 relative text-xs   lowercase underline cursor-pointer`}
              onClick={handleaddmenu}>
                Add item
              </div>
              {
                menuadd?<div><AddMenu prop={handleaddmenu} addItem={addItem}> </AddMenu> </div>:null
              }
                
              
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                Item
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
              {/* <th scope="col" class="px-6 py-3">
                avaliable/
              </th> */}
            </tr>
          </thead>
          <tbody>{
            menu.length==0?<>
              <tr class="bg-[#fff7ed] border-b  hover:bg-gray-50 ">
                <td class="p-4">
                 
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                 
                </td>
                <td class="px-6 py-4">
                  <div  className="font-medium text-red-600 hover:underline cursor-pointer" onClick={handle}>
                 
                  </div>
                </td>
              </tr>
            </>
            :menu.map((item) => (
              <tr class="bg-[#fff7ed] border-b  hover:bg-gray-50 ">
                <td class="p-4">
                  <img
                    src={item.imgUrl}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  {item.foodName}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  &#8377;{item.price}
                </td>
                <td class="px-6 py-4">
                  <div  className="font-medium text-red-600 hover:underline cursor-pointer" onClick={()=>{handle(item._id)}}>
                    Update
                  </div>
                 
                  {selectedId === item._id && (
  <MenuUpdate prop1={handle} id={item._id} />
)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default React.memo(Menutable);