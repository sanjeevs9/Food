import work from "../../img/work/—Pngtree—a man at work_4463549.png";
import stair from "../../img/work/pngwing.com.png";
import man from "../../img/work/man.png.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { NETWORK } from "../../../network";
import { errorToast, successToast } from "../../toast";
import { useRecoilState } from "recoil";
import { AdminLogin } from "../../atoms/AdminLogin";

export default function SellerSignin() {
  const [phone, setphone] = useState(0);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [check,setCheck]=useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [adminlogin,setAdminLogin]=useRecoilState(AdminLogin);

  async function handle() {
    await axios
      .post(`${NETWORK}/food/seller/signin`, {
        phoneNumber: Number(phone),
        password,
      })
      .then((res) => {
        successToast(res.data.message)
        if(check){
          localStorage.setItem("token", `Bearer ${res.data.token}`);
        }else{
          sessionStorage.setItem("token",`Bearer ${res.data.token}`)
        }
        setAdminLogin(!adminlogin)
        navigate("/vendor");
      })
      .catch((error) => {
        errorToast(error.response.data.message)
        // alert(error.response.data.message);
      
      });
  }

  return (
    <>
      <div className=" bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-[#fff7ed]  to-[#e0e7ff] bottom-0 leading-5 min-h-screen w-full overflow-hidden"></div>
    <div className="relative min-h-screen flex flex-row justify-center bg-transparent rounded-3xl shadow-xl">
      
      <div className="flex justify-center self-center ">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
            <p className="text-gray-400">
              Don't have an account? <a href="/create" className="text-sm text-red-500 ">Sign Up</a>
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                type="tel"
                placeholder="Phone Number"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
            </div>
            <div className="relative">
              <input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                className="text-sm  px-4 py-3 rounded-lg w-full bg-gray-200  border-gray-200 focus:outline-none focus:border-red-500"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  className={`h-4 text-[#FC5664] ${showPassword ? 'hidden' : 'block'}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  />
                </svg>
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  className={`h-4 text-purple-700 ${showPassword ? 'block' : 'hidden'}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-row justify-between sm:justify-evenly lg:justify-between w-full">
              <div className="flex gap-2">
                <div className="">
                  <input
                    checked={check}
                    id="disabled-checkbox"
                    type="checkbox"
                    value=""
                    className=" w-4 h-4 border-gray-300 rounded"
                    onChange={()=>{
                      setCheck(!check)
                    }}
                  ></input>
                </div>
                <div className="-my-0.5">Remember me</div>
              </div>
              <div className="flex cursor-pointer text-xs pt-1 underline" onClick={()=>{alert("Working On It")}}>
                Term and Conditons
              </div>
            </div>
            <div>
              <button
              onClick={handle}
                type="submit"
                className="w-full flex justify-center bg-[#FC5664] hover:bg-red-600 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer "
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-center space-x-2 my-5">
              <span className="h-px w-16 bg-gray-100"></span>
              <span className="text-gray-300 font-normal">or</span>
              <span className="h-px w-16 bg-gray-100"></span>
            </div>
            <div className="flex justify-center gap-5 w-full">
              <button
                type="submit"
                className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
              >
                <svg
                  className="w-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.913 0 5.57-.994 7.654-2.694l-3.614-3.293Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M21.665 13.023c-.15-.498-.34-.977-.585-1.431a1.872 1.872 0 0 0-.086-.155A12.037 12.037 0 0 0 12 8.045c-3.2 0-5.97 1.297-7.732 3.37l-.016.016L.994 8.335l-.24.387C2.48 4.35 6.877 1.491 12 1.491c2.854 0 5.472 1.026 7.512 2.693l3.44-3.44C20.646 1.345 18.422.236 16.04 0c-1.572 0-3.086.247-4.52.709C8.063 1.327 5.267 3.067 3.58 5.536c-.414.597-.777 1.234-1.104 1.902C4.706 10.932 8.057 13.318 12 13.318c.797 0 1.56-.11 2.294-.314l1.436.155.278.072-.018.055c.233.649.451 1.316.646 1.995l1.433.48C18.06 17.854 17.54 18 17 18h-1c-.69 0-1.253.147-1.788.33-1.44.468-2.837.726-4.215.726-1.6 0-3.183-.22-4.726-.675-1.277-.377-2.513-.98-3.68-1.672l1.09 4.417A11.956 11.956 0 0 0 12 24c5.22 0 9.674-3.36 11.147-8.043a14.732 14.732 0 0 0 .333-1.96l-1.42-.57-1.087-.404a1.885 1.885 0 0 0 .692-.59Z"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                type="submit"
                className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
              >
                <svg
                  className="w-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.409c0-3.018 1.794-4.687 4.533-4.687 1.312 0 2.686.235 2.686.235v2.98h-1.512c-1.49 0-1.953.927-1.953 1.875v2.245h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.064 24 12.073z"
                  />
                </svg>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  );
}
