import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NETWORK } from "../../../network";
import { useRecoilValue } from "recoil";
import { AdminLogin } from "../../atoms/AdminLogin";

export const DetailsContext=createContext(null);

export default function DetailsProcider(props){
    const[name,setName]=useState("@");
    const[description,setdescription]=useState("..");
    const[image,setImage]=useState("");
    const[phone,setPhone]=useState("");
    const[revenue,setRevenue]=useState();
    const[totalMenu,setTotalMenu]=useState("...");
    const[totalOrder,setTotalOrder]=useState("...");
    const[edit,setEdit]=useState(false);
    let token=localStorage.getItem("token");
    const adminLogin=useRecoilValue(AdminLogin)

  

    useEffect(()=>{
        if(!token){
            token=sessionStorage.getItem("token");
        }
        if(!token){
          return 
        }
      axios.get(`${NETWORK}/food/seller/admin`,{
        headers:{
            Authorization:token
        }
      }).then(res=>{
     
        setRevenue(res.data.balance.balance);
        setName(res.data.detail.shopName);
        setdescription(res.data.detail.description);
        setImage(res.data.detail.imgUrl);
        setPhone(res.data.detail.phoneNumber);
      }).catch(err=>{
       
      })

    },[adminLogin])

    return(
        <>
        <DetailsContext.Provider value={{ name, description, image, phone, revenue, totalMenu, totalOrder , setName , setdescription , setImage , setPhone ,setEdit , edit  }}>
            {props.children}
        </DetailsContext.Provider>

        </>
    )
}