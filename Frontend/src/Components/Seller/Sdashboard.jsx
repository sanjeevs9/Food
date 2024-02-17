import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";

export default function Sdashoard(){
    const navigate=useNavigate();
    const[menu,setmenu]=useState([]);
    const token=localStorage.getItem("token");

    useEffect(()=>{
        console.log(token);
        axios.get("http://192.168.1.247:3000/food/seller/itemm",
        {headers:{
                Authorization:token
            }}
        )
        .then(res=>{
            setmenu(res.data);
    
        })
        .catch(error=>{
            console.log(error);
        })
    
    },[])
    
    return (
        <>
        <div className="p-5">
            <div className="flex justify-between bg-slate-800 text-white">
                <div>Account name</div>
                <div  className="cursor-pointer" onClick={()=>{navigate('/addmenu')}}>Add Menu</div>
            </div>
            <div className=" flex border-2 h-screen justify-center flex-col ">
                    <div className="font-bold bg-slate-500 h-fit " >Menu</div>
                    <div className="flex ">
                    {
                    menu.map((x)=>(

                        <div className="flex">{x.foodName}  {x.price}</div>
                    ))
    
                    }
                    </div>
            </div>
        </div>
       
        </>
    )
} 