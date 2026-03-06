
import ReactDOM from "react-dom";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import { useRecoilState } from "recoil";
import { balanceState } from "../../atoms/balanceState";
import { errorToast, successToast } from "../../toast";

export default function Wallet({ fn, open }) {
    const[balance,setbalance]=useRecoilState(balanceState)
    let token=localStorage.getItem("token");
    const[input,setinput]=useState(1000);
    const element=useRef();

    useEffect(()=>{
      if(!token){
        token=sessionStorage.getItem("token")
        if(!token){
          errorToast("PLease login")
          return
        }
      }
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
      if(!token){
        token=sessionStorage.getItem("token")
        if(!token){
          errorToast("PLease login")
          return
        }
      }
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
            successToast(res.data.message)
        })
        .catch((error)=>{
            alert("something failed")
        })
    }


  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm" onClick={fn}>
      <div
        className="bg-white rounded-2xl border border-stone-200 w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-['Fraunces'] text-lg font-semibold text-stone-900">Wallet</h2>
          <button
            onClick={fn}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Balance */}
        <div className="px-6 py-5 border-b border-stone-100 bg-stone-50">
          <p className="font-['Outfit'] text-sm text-stone-400 mb-1">Available Balance</p>
          <p className="font-['Fraunces'] text-3xl font-semibold text-stone-900">&#8377;{balance}</p>
        </div>

        {/* Add Funds */}
        <div className="px-6 py-5">
          <p className="font-['Outfit'] text-sm font-medium text-stone-700 mb-3">Add funds</p>

          <div className="border border-stone-200 rounded-xl px-4 py-3 focus-within:border-stone-400 transition-colors cursor-text"
            onClick={()=>{element.current.focus()}}
          >
            <p className="font-['Outfit'] text-xs text-stone-400 mb-1">Enter amount</p>
            <div className="flex items-center">
              <span className="font-['Outfit'] text-xl text-stone-900 mr-1">&#8377;</span>
              <input
                className="font-['Outfit'] text-xl font-semibold text-stone-900 border-0 focus:outline-none w-full bg-transparent placeholder:text-stone-300"
                value={input}
                type="number"
                onChange={(e) => setinput(Number(e.target.value))}
                ref={element}
              />
            </div>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 mt-3">
            {[500, 1000, 1500].map((amount) => (
              <button
                key={amount}
                className={`flex-1 py-2 border rounded-xl font-['Outfit'] text-sm font-medium transition-colors ${
                  input === amount
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
                onClick={()=>{setinput(amount)}}
              >
                &#8377;{amount}
              </button>
            ))}
          </div>

          <button
            className="mt-4 w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-['Outfit'] text-sm font-medium rounded-xl transition-colors"
            onClick={transaction}
          >
            Add to wallet
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("wallet")
  );
}
