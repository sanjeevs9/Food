import Sidebar from "./Sidebar";
import image from "../../img/moible.svg";
import "../../index.css"
import { DetailsContext } from "./SellerDetailsApi";
import { useContext, useState } from "react";
import Edit from "./EditForm";
import { sidebar } from "../../atoms/alert";
import { useRecoilState } from "recoil";

export default function Saccount() {
  const details=useContext(DetailsContext);
  const[isOpen,setOpen]=useState(false);
  const[type,setType]=useState();
  const[bar,setbar]=useRecoilState(sidebar);

  function handle1(){
    setbar(!bar);
  }

  function handle(id){
    setType(id);
    setOpen(!isOpen);
  }
 

  return (
    <>
       <div className="relative bg-[#fff7ed]  overflow-x-hidden  flex justify-center sm:gap-64 sm:p-4">
        <div className="flex  ">
          <Sidebar />
        </div>
        <div className={`${!bar ? 'w-2/6  ' : 'overflow-hidden h-screen   w-2/6'} sm:w-3/5 bg-white rounded-3xl flex flex-grow transform sm:-translate-x-3`}style={{height:"100vh"}}>
        <div className="w-full ">
        <div className="  flex sm:hidden relative   cursor-pointer translate-x-2 translate-y-5"onClick={handle1}>
        
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="30" viewBox="0 0 50 50">
        <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
        </svg>
          </div>
        <div className="w-full translate-y-5 sm:translate-y-0 bg-white rounded-3xl flex flex-grow transform sm:-translate-x-3">
        <div class="container pl-5 pr-5">
  <div class="flex justify-between mb-4">
    <h1 class="text-2xl font-bold pl-3 pt-5">Dashboard</h1>
  
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center mb-2">
        <span class="text-gray-600 text-2xl">&#8377;</span>
        <h2 class="text-3xl font-bold ml-2">{details.revenue}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Revenue</p>
    </div>
    <div class={`${bar?`hidden`:`block`} sm:block bg-white rounded-lg shadow-md p-4`}>
      <div class={`flex items-center mb-2`}>
       
        <h2 class="text-3xl font-bold ">{details.totalMenu}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Menus</p>
    </div>
    <div class={`${bar?`hidden`:`block` } sm:block bg-white rounded-lg shadow-md p-4`}>
      <div class="flex items-center mb-2">
  
        <h2 class="text-3xl font-bold ">{details.totalOrder}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Orders</p>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Cafe Information</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-bold mb-2">Name</h3>
        <p class="text-gray-500 text-sm">{details.name}</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" id="name"
        onClick={(e)=>{handle(e.target.id)}}>
          Edit
        </button>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-bold mb-2">Description</h3>
        <p class="text-gray-500 text-sm">{details.description}</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" id="description"  onClick={(e)=>{handle(e.target.id)}}>
          Edit
        </button>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-bold mb-2">Image</h3>
        <img
          src={`${details.image}`}
          alt="Customer Image"
          class="w-full h-24 object-cover rounded-lg"
        />
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" id="image"  onClick={(e)=>{handle(e.target.id)}}>
          Edit
        </button>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-bold mb-2">Phone Number</h3>
        <p class="text-gray-500 text-sm">{details.phone}</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" id="phone"  onClick={(e)=>{handle(e.target.id)}}>
          Edit
        </button>
      </div>
    </div>
  </div>
</div>
</div>
        </div>
        </div>
      </div>
    </>
  );
}
