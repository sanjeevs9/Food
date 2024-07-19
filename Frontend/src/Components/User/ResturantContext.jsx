import { createContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../../atoms/filterState";
import axios from "axios";
import { NETWORK } from "../../../network";


export const Rcontext=createContext(null);

export default function ResturantProvider({children}){
    const[resturant,setresturant]=useState([])
    const [filter, setfilter] = useRecoilState(filterState);

    useEffect(() => {
        axios
          .get(`${NETWORK}/food/seller/filter?filter=${filter}`)
          .then((res) => {
        
            setresturant(res.data);
        
          })
          .catch((error) => {
         
          });
      }, [filter]);

      useEffect(()=>{
        console.log(resturant)
      },[resturant])

    return(
        <>
        <Rcontext.Provider value={{resturant}}>
            {children}
        </Rcontext.Provider>
        </>
    )
}