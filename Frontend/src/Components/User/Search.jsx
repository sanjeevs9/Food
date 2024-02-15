
import { useEffect, useState } from "react";
import { useSearchParams,useLocation } from "react-router-dom";


export default function Search({ className }) {
const[filter,setfilter]=useState("");
const [param, setParam] = useSearchParams();
const location = useLocation();

useEffect(() => {
    setParam({ filter: filter }); 
  }, [filter]);


  return (
    <>
      <div className={`relative ${className}`}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 bg-transparent "
          placeholder="Search Food..."
          onChange={(e)=>{setfilter(e.target.value)}}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </>
  );
}
