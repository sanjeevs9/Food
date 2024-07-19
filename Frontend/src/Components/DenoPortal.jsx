import axios from "axios"
import ReactDOM from "react-dom"
import { NETWORK } from "../../network"
import { errorToast, successToast } from "../toast"
import { Navigate, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { AdminLogin } from "../atoms/AdminLogin"

export default function Demo({isOpen,fn}) {
    const navigate =useNavigate();
    const [adminlogin,setAdminLogin]=useRecoilState(AdminLogin);

    async function LoginUser(){
        await axios.post(`${NETWORK}/food/user/signin`,
            {
                email:"guest1@gmail.com",
                password:"password"
            }
        ).then(res=>{
            successToast(res.data.message)
            sessionStorage.setItem("token",`Bearer ${res.data.token}`);
            navigate("/user");
        }).catch(err=>{
            errorToast(err.response.data.message);
            console.log(err)
        })
    }

    async function LoginSeller(){
        await axios.post(`${NETWORK}/food/seller/signin`,{
            phoneNumber:993166,
            password:"password"
        }).then(res=>{
            successToast(res.data.message);
            sessionStorage.setItem("token",`Bearer ${res.data.token}`)
            setAdminLogin(!adminlogin)
            navigate("/vendor");
            
        }).catch(err=>{
            errorToast(err.response.data.message);
        })
    }
  
    return (
        <>
          <div className=" flex flex-col  bg-[#fff7ed] w-44  gap-2 p-4 rounded-lg border-[1px]">
            <button className="text-white bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-md font-semibold p-2" onClick={LoginUser}>    
                Join as User
            </button>
            <button className=" text-white bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-md font-semibold p-2 "onClick={LoginSeller}>
            Join as Vendor
            </button>
        </div>
        </>
    )
}