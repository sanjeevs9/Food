import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../../toast";
import { NETWORK } from "../../../network";

export default function MenuUpdate({prop1,id}){
    const [data,setData]=useState({foodName:"",price:0,imgUrl:""})
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
        <>
        <div className="backdrop-blur-sm z-50 h-screen w-screen fixed inset-0 justify-center items-center flex " >
        
            <div className="h-[40rem] w-4/6 bg-[#fff7ed]  flex relative backdrop-blur-sm rounded-lg "  >
               
            <div className="flex items-center justify-center  w-full">
        <div className="flex flex-col gap-6 w-72">
          <div className="relative w-full min-w-[200px] h-10">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-2 transition-all placeholder-shown:border     placeholder-shown:border-black placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-yellow-700 "
              placeholder=" "
              name="foodName"
              value={data.foodName}
              onChange={handle}
            />
             <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-yellow-700 before:border-blue-gray-200 peer-focus:before:!border-yellow-700 after:border-yellow-700 peer-focus:after:!border-yellow-700">
              {" "}
              FoodName
            </label>
          </div>
          <div className="relative w-full min-w-[200px] h-10">
            <input
            type="number"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-2 transition-all placeholder-shown:border     placeholder-shown:border-black placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-black focus:border-yellow-700 "
              placeholder=" "
              name="price"
              value={data.price}
              onChange={handle}
            />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-yellow-700 before:border-black peer-focus:before:!border-yellow-700 after:border-black peer-focus:after:!border-yellow-700">
              {" "}
              Price
            </label>
          </div>
          <div className="relative w-full min-w-[200px] h-10">
            <input
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-black disabled:border-2 transition-all placeholder-shown:border     placeholder-shown:border-black placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-yellow-700 "
              placeholder=" "
              name="imgUrl"
              value={data.imgUrl}
              onChange={handle}
            />
             <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-yellow-700 before:border-blue-gray-200 peer-focus:before:!border-yellow-700 after:border-yellow-700 peer-focus:after:!border-yellow-700">
              {" "}
              Image URL
            </label>
          </div>
          <div className="flex justify-center">
            <button
            className="text-white  end-2.5 bottom-2.5 bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 "
              onClick={click}
            >
              Update
            </button>
          </div>
        </div>
      </div>
            <div className="absolute right-0 top-0 cursor-pointer " >
                    
                    <svg className="h-8 w-8 text-black rotate-45  " viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" onClick={prop1}>  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </div>
            </div>
        </div>
        </>,
        document.getElementById("update")
    )
}