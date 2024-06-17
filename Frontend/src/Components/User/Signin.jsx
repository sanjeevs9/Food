import foodimg from '../../img/victoria-shes-UC0HZdUitWY-unsplash.jpg';
import burger from '../../img/food/p9.png'
import pizza from '../../img/food/p12.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from 'react';
import { NETWORK } from '../../../network';
import { errorToast, successToast } from '../../toast';
import logo from "../../img/logo.png"
import image from "../../img/sign.png"

export default function Signin(){
    const navigate = useNavigate();
    const[email,setEmail]=useState("");
    const[password,setpassword]=useState("");
    const[check,setcheck] =useState(true);
    const[pass,setpass]=useState("password")

    function passHandle(){
        pass=="password"?setpass("text"):setpass("password")
    }


    async function handle(){
        await axios.post(`${NETWORK}/food/user/signin`,
        {
            email,
            password
        }
        )
        .then(res=>{
            console.log(res.data.message);
            successToast(res.data.message)
            // alert(res.data.message)
            if(check){
                localStorage.setItem("token",`Bearer ${res.data.token}`)
            }else{
                sessionStorage.setItem("token",`Bearer ${res.data.token}`)
            }
            
            navigate('/user')
        
                    
        })
        .catch(error => {
            errorToast(error.response.data.message)
            // alert(error.response.data.message)
        })
    }


   
    return(
        <>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center p-5 sm:p-0">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:min-w-5/12 p-6 sm:p-12">
                    <div>
                        <img
                            src={logo}
                            className=" w-14 sm:w-24 mx-auto"
                            alt="Logo"
                        />
                    </div>
                    <div className="sm:mt-5 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign In
                        </h1>
                        <div className="w-full flex-1 pt-2 sm:mt-8">
                            <div className="hidden sm:flex flex-col items-center">
                                <button className="w-full max-w-xs font-bold shadow-sm text-sm sm:text-base rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Login with Google</span>
                                </button>

                                <button className="w-full max-w-xs text-sm sm:text-base font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                    <div className="bg-white p-1 rounded-full">
                                        <svg className="w-6" viewBox="0 0 32 32">
                                            <path
                                                fillRule="evenodd"
                                                d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Login with GitHub</span>
                                </button>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Sign in with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                                <div className='relative'>
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type={pass}
                                    placeholder="Password"
                                    onChange={(e)=>{setpassword(e.target.value)}}

                                />
                                 <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }'className="absolute top-1/2 right-0 pr-3 " onClick={passHandle}>
      <svg className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path className={pass=="text"?`hidden`:``} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path className={pass=="text"?`hidden`:``} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path className={pass=="text"?`hidden`:``} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line className={pass=="text"?`hidden`:``} x1="2" x2="22" y1="2" y2="22"/>
        <path className={pass=="password"?`hidden`:`block`} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle className={pass=="password"?`hidden`:`block`} cx="12" cy="12" r="3"/>
      </svg>
    </button>
    </div>
                                <div className='flex gap-2 pt-2 pl-1 '>
                            <div className=''><input  id="checkbox" checked={check} type="checkbox" value="" className=" w-4 h-4 border-gray-300 rounded cursor-pointer"
                             onChange={()=>{setcheck(!check)}}></input></div>
                            <div className='-my-0.5'>Remember me</div>
                            
                        </div>
                                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                onClick={handle}>
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Sign In</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                                <div className='flex justify-center pt-5 gap-1'>
                    <span className=' text-sm'>Dont have an account?</span>
                    <button className='text-red-600 font-medium cursor-pointer -translate-y-[2px] ' onClick={
                        ()=>{navigate('/signup')}
                    }>Sign Up</button>
                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex  items-center">
                    <div
                        className="h-[40rem]  w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        
                    ></div>
                </div>
            </div>
        </div>
        </>
    )
}