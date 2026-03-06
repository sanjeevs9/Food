import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../../toast";
import { NETWORK } from "../../../network";

export default function MenuUpdate({prop1, id, itemData}){
    const [data,setData]=useState({
      foodName: itemData?.foodName || "",
      price: itemData?.price || 0,
      imgUrl: itemData?.imgUrl || ""
    })
    let token =localStorage.getItem("token");
    const [load ,setlaod ]=useState(false);

    async function click(){
      if(!token){
        token=sessionStorage.getItem("token")
        if(!token){
          errorToast("Please login")
          return
        }
      }
        if(load){
            return
        }
       setlaod(true)
        await axios.post(`${NETWORK}/food/seller/updatemanu`,
        {
            foodName:data.foodName,
            price:Number(data.price),
            imgUrl:data.imgUrl
        },{
            headers:{
                id:id,
                Authorization:token
            }
        })
        .then(res=>{
            setlaod(false)
            successToast(res.data.message);
        })
        .catch((error)=>{
            setlaod(false)
            errorToast(error.response.data.message)
        })
    }
    function handle(e) {
        setData({ ...data, [e.target.name]: e.target.value });
      }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm" onClick={prop1}>
          <div
            className="bg-white rounded-2xl border border-stone-200 w-[90%] max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="font-['Fraunces'] text-lg font-semibold text-stone-900">Edit Item</h2>
              <button
                onClick={prop1}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
              >
                <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block font-['Outfit'] text-sm font-medium text-stone-700 mb-1.5">Food Name</label>
                <input
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl font-['Outfit'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition-colors"
                  placeholder="Enter food name"
                  name="foodName"
                  value={data.foodName}
                  onChange={handle}
                />
              </div>
              <div>
                <label className="block font-['Outfit'] text-sm font-medium text-stone-700 mb-1.5">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl font-['Outfit'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition-colors"
                  placeholder="Enter price"
                  name="price"
                  value={data.price}
                  onChange={handle}
                />
              </div>
              <div>
                <label className="block font-['Outfit'] text-sm font-medium text-stone-700 mb-1.5">Image URL</label>
                <input
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl font-['Outfit'] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition-colors"
                  placeholder="Enter image URL"
                  name="imgUrl"
                  value={data.imgUrl}
                  onChange={handle}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-stone-100 flex justify-end gap-2">
              <button
                className="px-4 py-2.5 border border-stone-200 rounded-xl font-['Outfit'] text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                onClick={prop1}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2.5 rounded-xl font-['Outfit'] text-sm font-medium transition-colors ${
                  load
                    ? 'bg-stone-200 text-stone-500 cursor-wait'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
                onClick={click}
                disabled={load}
              >
                {load ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>,
        document.getElementById("update")
    )
}
