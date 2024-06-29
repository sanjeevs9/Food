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
    if(!isOpen){
        return
    }
    return ReactDOM.createPortal(
        <>
            <div className="backdrop-blur-sm z-50 h-screen w-screen fixed inset-0 justify-center items-center flex " >

                <div className= "h-[14rem] sm:h-[15rem] sm:w-[27rem] w-[21rem]  bg-[#e0e7ff]   flex relative backdrop-blur-sm rounded-lg border-[1px] border-gray-500"  >

                    <div className="flex items-center justify-center w-full">
                        <div className="flex text-black flex-col w-full items-center   h-full justify-center">
                            <div className="flex font-bold text-xl xl:text-2xl sm:pb-5 pb-2 ">
                                Skip Login!! Join as &nbsp;<span className="text-[#FC5664]"> Guest</span>
                            </div>
                        <div className="h-[0.5px]  w-full bg-white text-white  font-medium "></div>
                        <div className=" p-3">
                            Skip the process of creating your account and see the features of the webiste instant ...
                            I hope you like it !
                        </div>
                        <div className="h-[0.1px] w-full bg-white text-white "></div>
                            <div className="flex justify-end w-full gap-4 sm:pt-5 pt-4 pr-5  text-white "> 
                                <button className="  pl-2 pr-2 p-2 bg-[#FC5664] rounded-lg text-sm sm:pl-3 sm:pr-3 font-medium" onClick={fn}>Cancel</button>
                                <button className=" pl-2 pr-2 p-2 bg-green-600 rounded-lg text-sm sm:pl-3 sm:pr-3 font-medium" onClick={LoginUser}>Join as User</button>
                                <button className=" pl-2 pr-2 p-2 bg-green-600 rounded-lg text-sm sm:pl-3 sm:pr-3 font-medium" onClick={LoginSeller}>Join as Shop</button>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 cursor-pointer  " onClick={fn} >

                            <svg className="h-8 w-8 text-black rotate-45  " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("demo")
    )
}