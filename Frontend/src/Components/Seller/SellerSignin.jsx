import work from "../../img/work/—Pngtree—a man at work_4463549.png";
import stair from "../../img/work/pngwing.com.png";
import man from "../../img/work/man.png.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { NETWORK } from "../../../network";
import { errorToast, successToast } from "../../toast";

export default function SellerSignin() {
  const [phone, setphone] = useState(0);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [check,setCheck]=useState(false);

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
        }
        navigate("/vendor");
      })
      .catch((error) => {
        errorToast(error.response.data.message)
        // alert(error.response.data.message);
        console.log(error);
      });
  }

  return (
    <>
      <div className=" p-1  h-screen">
        <div className="bg-[#fff7ed]  h-[99vh]    rounded-xl flex flex-row justify-center md:justify-between  lg:justify-center">
          <div className="flex flex-col">
            <img
              src={work}
              className=" hidden md:flex h-96 w-96 mt-auto lg:absolute lg:inset-y-0 lg:left-0"
            />
          </div>
          <div className="flex flex-col p-10 gap-5 w-96 sm:pt-28 xl:ml-16">
            <input
              placeholder="Phone Number"
              className="p-2 border-2 rounded-lg"
              onChange={(e) => {
                setphone(e.target.value);
              }}
            ></input>
            <input
              placeholder="Password"
              className="p-2 border-2 rounded-lg"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>
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

            <div className=" flex justify-center ">
              <button
                className="bg-blue-500 p-2 w-36  rounded-md text-white "
                onClick={handle}
              >
                Signin
              </button>
            </div>
            <div className="flex justify-center">
              <span className="font-bold text-sm">Dont have an account?</span>
              <button
                className="text-red-600 font-semibold cursor-pointer -my-1"
                onClick={() => {
                  navigate("/create");
                }}
              >
                Sign Up
              </button>
            </div>
            <img src={stair} className="flex md:hidden h-80" />
          </div>
          <img
            src={man}
            className="hidden lg:flex h-1/2 lg:absolute lg:bottom-0 right-0"
          />
        </div>
      </div>
    </>
  );
}
