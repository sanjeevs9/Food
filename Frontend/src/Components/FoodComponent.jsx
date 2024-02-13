import { useState } from "react";

export default function FoodComponent({
    name,
    price,
    available,
    className,
    imageUrl
})
{
    const [number, setNumber] = useState(1);
    return(
        <>
        <div>
        <div className={`flex flex-col bg-white shadow rounded-lg  ${className}  w-56`} >
  <div className=" rounded-t-lg  h-32 w-full flex-grow bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center" style={{backgroundImage: `url('${imageUrl}')`}}>

   <div className="flex flex-col justify-end flex-grow ">
    
      <span className="uppercase w-fit text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
      {available ? 'Available' : 'Not Available'}
      </span>
    </div>
  </div>
  <div className="p-4 flex flex-col items-center flex-grow" >
    <h1 className="text-gray-800 text-center  font-bold text-lg">{name}</h1>
<div className="flex justify-between  flex-row  w-full " >
  
    <p className=" text-center text-gray-800 mt-1 text-lg ">&#8377;{price}</p>
    
    <div className="inline-flex items-center mt-2  ">
      <button className="w-7 justify-center bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center  border-r border-gray-200 "
      onClick={() => number > 1 && setNumber(number - 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
        </svg>
        
      </button>
      <div className="justify-center w-7 bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center  select-none">
      {number}
      </div>
      <button className="w-7 justify-center bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center  border-r border-gray-200"
       onClick={() => number < 6 && setNumber(number + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
        </svg>
       
      </button>
    </div>
    </div>
    <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
      Add Item
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    </button>
  </div>
</div>

        </div>
        </>
    )
} 