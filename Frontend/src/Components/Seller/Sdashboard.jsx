import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { NETWORK } from "../../../network";
import Sidebar from "./Sidebar";
import Table from "./Table";

export default function Sdashoard(){
    return (
        <>
       <div className="relative bg-[#fff7ed] overflow-hidden min-h-screen flex justify-center sm:gap-64 sm:p-4"> 
    <div className="flex">
        <Sidebar/>
    </div>
    <div className="w-full sm:w-3/5  bg-white rounded-3xl flex flex-grow transform sm:-translate-x-3">
        <div className="w-full">
        <Table/>
            
            </div>
        
    </div>
</div>
       
       
       
        </>
    )
} 