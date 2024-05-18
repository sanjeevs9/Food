import { useEffect, useState,useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { NETWORK } from "../../../network";
import axios from "axios";
import { errorToast, successToast } from "../../toast";
import { useRecoilValue } from "recoil";
import { checkbox } from "../../atoms/alert";

export default function UserOtp(){
    const navigate= useNavigate()
    const[value,setvalue]=useState({
        one:"",
        two:"",
        three:"",
        four:""
    });
    const num1=useRef();
    const num2=useRef();
    const num3=useRef();
    const num4=useRef();
    const checkBox=useRecoilValue(checkbox);

    useEffect(()=>{
      num1.current.focus();
    },[])
    
    function focusclick(value){
        value.current.focus()
    }



    async function handle(){
      const num=value.one+value.two+value.three+value.four
  
      console.log(num)
        await axios.post(`${NETWORK}/food/user/verify`,
        {
            otp:(num)
        },
        ).then(res=>{
            console.log(res.data.message);
            if(checkBox){
              localStorage.setItem("token",`Bearer ${res.data.token}`)
            }else{
              sessionStorage.setItem("token",`Bearer ${res.data.token}`)
            }
            
            successToast(res.data.message)
            navigate("/user")
        }).catch((error)=>{
            console.log(error)
            errorToast(error.response.data.message)
        })
    }
    return (
        <>

<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent an otp to Your Email</p>
        </div>
      </div>

      <div>
     
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                 maxLength="1" size="1" max="1" pattern="[0-9]{1}"
                onInput={(e)=>{
                    setvalue((c=>({
                        ...c,
                        one:e.target.value
                    })))
                    if(e.target.value!==""){
                      focusclick(num2)
                    }
                }}
                ref={num1}

                />
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                 maxLength="1" size="1" max="1" pattern="[0-9]{1}"
                onInput={(e)=>{
                    setvalue((c)=>({
                        ...c,
                        two:e.target.value
                    }))
                    if(e.target.value!==""){
                      focusclick(num3)
                    }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && e.target.value === "" && num2.current) {
                    num1.current.focus();
                  }
                }}
                ref={num2}
                />
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                 maxLength="1" size="1" max="1" pattern="[0-9]{1}"
                  ref={num3}
                  onInput={(e)=>{
                    setvalue((c)=>({
                        ...c,
                        three:e.target.value
                    }))
                    if(e.target.value!==""){
                      focusclick(num4)
                    }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && e.target.value === "" && num3.current) {
                    num2.current.focus();
                  }
                }}
                />
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""
                 maxLength="1" size="1" max="1" pattern="[0-9]{1}"
                ref={num4}
                onInput={(e)=>{
                  setvalue((c)=>({
                      ...c,
                      four:e.target.value
                  }))
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && e.target.value === "" && num4.current) {
                  num3.current.focus();
                }
              }}
                />

              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                onClick={handle}>
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a classNameName="flex flex-row items-center text-blue-600 cursor-pointer"
                onClick={()=>{navigate('/signup')}}>Resend</a>
              </div>
            </div>
          </div>
       
      </div>
    </div>
  </div>
</div>
        </>
    )
}