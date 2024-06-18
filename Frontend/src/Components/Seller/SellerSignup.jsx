import work from "../../img/work/—Pngtree—a man at work_4463549.png";
import stair from "../../img/work/pngwing.com.png";
import man from "../../img/work/man.png.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { NETWORK } from "../../../network";
import { useRecoilState } from "recoil";
import { sellerCheckBox } from "../../atoms/alert";
import { errorToast, successToast } from "../../toast";

export default function SellerSignup() {
  const [ShopName, setSopName] = useState("");
  const [phone, setphone] = useState(0);
  const [password, setpassword] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const [check,setcheck]=useRecoilState(sellerCheckBox)
  const [showPassword, setShowPassword] = useState(false);

  async function handle() {
    await axios
      .post(`${NETWORK}/food/seller/create`, {
        shopName: ShopName,
        password,
        phoneNumber: Number(phone),
        imgUrl,
        description,
      })
      .then((res) => {
        successToast(res.data.message)

        navigate("/otp");
      })
      .catch((error) => {
        errorToast(error.response.data.message)
        console.log(error);
      });
  }

  return (
    <>

      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-[#fff7ed]  to-[#e0e7ff] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
    <div className="relative min-h-screen flex flex-row justify-center bg-transparent rounded-3xl shadow-xl">
      
      <div className="flex justify-center self-center z-10">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">Sign Up</h3>
            <p className="text-gray-400">
              Already have an account? <a href="/login" className="text-sm text-red-500">Sign In</a>
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="ShopName"
                onChange={(e)=>{
                  setSopName(e.target.value)
                }}
              />
            </div>
            <div>
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                onChange={(e)=>{
                  setphone(e.target.value)
                }}
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            <div className="relative">
              <input
              onChange={(e)=>{setpassword(e.target.value)}}
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                className="text-sm  px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-red-500"
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
            <div>
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                type=""
                onChange={(e)=>{setdescription(e.target.value)}}
                placeholder="Description"
              />
            </div>
            <div>
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                onChange={(e)=>{setimgUrl(e.target.value)}}
                placeholder="ImgUrl"
              />
            </div>
            
            <div className="flex flex-row justify-between sm:justify-evenly lg:justify-between w-full">
              <div className="flex gap-2">
                <div className="">
                  <input
                    id="checkbox"
                    type="checkbox"
                    value=""
                    checked={check}
                    className=" w-4 h-4 border-gray-300 rounded"
                    onChange={()=>{
                    setcheck(!check)
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
                className="w-full flex justify-center bg-[#FC5664] hover:bg-red-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  );
}
