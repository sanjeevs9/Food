import Sidebar from "./Sidebar";
import image from "../../img/moible.svg";
import "../../index.css"
import { DetailsContext } from "./SellerDetailsApi";
import { useContext, useState } from "react";
import Edit from "./EditForm";

export default function Saccount() {
  const details=useContext(DetailsContext);
  const[isOpen,setOpen]=useState(false);
  const[type,setType]=useState();

  function handle(id){
    setType(id);
    setOpen(!isOpen);
  }

  return (
    <>
      <div className="relative bg-[#fff7ed] overflow-hidden min-h-screen flex justify-center sm:gap-64 sm:p-4 ">
        <div className="flex ">
          <Sidebar />
        </div>
        {isOpen?<div className="absolute"><Edit type={type} fn={handle}></Edit></div>:null}
        <div className="w-full sm:w-3/5 bg-white rounded-3xl flex flex-grow transform sm:-translate-x-3">
        <div class="container pl-5 pr-5">
  <div class="flex justify-between mb-4">
    <h1 class="text-2xl font-bold pl-3 pt-5">Dashboard</h1>
  
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center mb-2">
        <span class="text-gray-600 text-2xl">&#8377;</span>
        <h2 class="text-3xl font-bold ml-2">{details.revenue}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Revenue</p>
    </div>
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center mb-2">
       
        <h2 class="text-3xl font-bold ">{details.totalMenu}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Menus</p>
    </div>
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex items-center mb-2">
  
        <h2 class="text-3xl font-bold ">{details.totalOrder}</h2>
      </div>
      <p class="text-gray-500 text-sm">Total Orders</p>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Customer Information</h2>
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
    </>
  );
}
