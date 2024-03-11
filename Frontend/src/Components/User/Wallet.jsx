import Footer from "../Footer";
import Navbar from "./Navbar";
import construct from "../../img/construct.svg";
import ReactDOM from "react-dom";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import { useRecoilState } from "recoil";
import { balanceState } from "../../atoms/balanceState";
import { successToast } from "../../toast";

export default function Wallet({ fn, open }) {
    const[balance,setbalance]=useRecoilState(balanceState)
    const token=localStorage.getItem("token");
    const[input,setinput]=useState(1000);
    const element=useRef();

    useEffect(()=>{
        axios.get(`${NETWORK}/food/user/balance`,
        {
            headers:{
                Authorization:token
            }
        })
        .then(res=>{
            setbalance(res.data.balance)
        })
    },[balance])

    function transaction(){
        axios.put(`${NETWORK}/food/user/addmoney`,
        {
            money:(Number)(input)
        },
        {
            headers:{
                Authorization:token
            }
        })
        .then(res=>{
            setbalance(balance=>balance+input)
            // alert(res.data.message)
            successToast(res.data.message)
        })
        .catch((error)=>{
            alert("something failed")
        })
    }


  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="h-96 w-2/3 xl:w-2/4 bg-[#E5E4E2] rounded-3xl flex p-5  flex-col items-center gap-5">
          <div className="flex flex-row justify-between  w-10/12 p-2">
            <div className="flex font-extrabold text-lg">Total balance</div>
            <div className="flex font-extrabold text-black text-lg">
              &#8377;{balance}
            </div>
          </div>
          <div className="w-10/12 h-3/4 bg-white justify-center flex p-3 rounded-2xl border-[1px] border-gray-400">
            <div className="w-full gap-3 flex flex-col p-2">
              <div className="flex font-semibold">
                Add gift cards to balance
              </div>
              <div className="border-[1px] border-gray-400 rounded-md p-2 w-full"  
              onClick={()=>{element.current.focus()}}>
                <div className="text-sm font-light">Enter ammount</div>
                <div className="text-2xl w-full flex items-center">
  &#8377;
  <input
    className="font-semibold border-0 focus:outline-none placeholder-black w-full"
    placeholder="1000"
    value={input}
    onChange={() => setinput(value)}
    ref={element}
  />
</div>
              </div>
              <div className="flex">
                <div className="flex flex-row gap-2">
                  <button className="flex border-[0.5px] border-gray-400 rounded-md p-1 font-semibold pr-2 ps-2"
                  onClick={()=>{setinput(500)}}>
                    &#8377;500
                  </button>
                  <button className="flex border-[0.5px] border-gray-400 rounded-md p-1 font-semibold pr-2 ps-2"
                  onClick={()=>{setinput(1000)}}>
                    &#8377;1000
                  </button>
                  <button className="flex border-[0.5px] border-gray-400 rounded-md p-1 font-semibold pr-2 ps-2"
                  onClick={()=>{setinput(1500)}}>
                    &#8377;1500
                  </button>
                </div>
              </div>

              <button className=" font-extrabold  justify-center  flex w-full bg-[#fce010] rounded-3xl  p-3"
              onClick={transaction}>
                <span>Add gift cards to balance</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="relative top-0 right-0 -translate-x-7 -translate-y-44 cursor-pointer rotate-45"
          onClick={fn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </div>
      </div>
    </>,
    document.getElementById("wallet")
  );
}
