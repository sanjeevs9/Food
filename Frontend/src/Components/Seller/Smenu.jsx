import Sidebar from "./Sidebar";
import Menutable from "./Menutable";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { sidebar } from "../../atoms/alert";

export default function Smenu() {
  const[bar ,setbarr]=useRecoilState(sidebar);

  function handle(){
    setbarr(!bar);
  }
  return (
    <>
      <div className="relative bg-[#fff7ed] overflow-hidden min-h-screen flex justify-center sm:gap-64 sm:p-4">
        <div className="flex">
          <Sidebar/>
        </div>
        <div className={`${bar ? 'w-2/6' : ''} w-full sm:w-3/5 bg-white rounded-3xl flex flex-grow transform sm:-translate-x-3`}>
          <div className="w-full">
          <div className="  flex sm:hidden relative mx-3 pt-2 cursor-pointer -translate-x-4 -translate-y-1"onClick={handle}> 
        
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="30" viewBox="0 0 50 50">
              <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
              </svg>
                </div>
            <Menutable sidebar={handle} />
          </div>
        </div>
      </div>
    </>
  );
}
