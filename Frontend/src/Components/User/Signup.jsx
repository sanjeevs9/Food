import foodimg from '../../img/victoria-shes-UC0HZdUitWY-unsplash.jpg';
import burger from '../../img/food/p9.png'
import pizza from '../../img/food/p12.png'
import { useNavigate } from 'react-router-dom';
import  { useState } from "react"
import axios from "axios";
import { NETWORK } from '../../../network';
import emailjs from "@emailjs/browser";
import { errorToast, successToast } from '../../toast';
import { useRecoilState } from 'recoil';
import { checkbox } from '../../atoms/alert';
import logo from "../../img/logo.png"
import image from "../../img/sign.png"


export default function Signup(){
    const[firstname,setfirstname]=useState("");
    const[lastname,setlastname]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[phone,setphone]=useState(0);
    const navigate=useNavigate();
    const[pass,setpass]=useState("password")
    const[isChecked , setIsChecked]=useRecoilState(checkbox);
    const serive = import.meta.env.VITE_SERVICE_ID;
    const temp = import.meta.env.VITE_TEMPLATE_ID;
    const key = import.meta.env.VITE_PUBLIC_KEY;

    function passHandle(){
        pass=="password"?setpass("text"):setpass("password")
    }

async function handle(){
    await axios.post(`${NETWORK}/food/user/signup`,
        {
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:password,
            mobileNumber:(Number)(phone)
        })
    .then(res=>{
       console.log(res.data)
       SendEmail(res.data.email,res.data.name,res.data.otp)
       successToast(`otp sent on ${res.data.email}` )
        // alert(`otp send on ${res.data.email}` );
        navigate('/uotp')
    })
    .catch(error=>{
        errorToast(error.response.data.message)
        // alert(error.response.data.message)
        console.log(error);
    })
}

function SendEmail(email, name,otp) {
    emailjs
      .send(
        serive,
        temp,
        {
          to_name: name,
          message: `Your otp is ${otp}`,
          from_name: "Sanjeev",
          receiver: email,
          reply_to: "sanjeev.19kr@gmail.com",
        },
        key
      )
      .then(
        () => {
          console.log("success");
        },
        (error) => {
          console.log(error);
        }
      );
  }




    
    return(
        <>
        
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center p-5 sm:p-0">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
                <div className="lg:w-1/2 xl:min-w-5/12   p-5 sm:p-12  sm:pt-0">
                    <div>
                        <img
                            src={logo}
                            className="w-12 mx-auto"
                            alt="Logo"
                        />
                    </div>
                    <div className="mt-1 sm:mt-5 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign up
                        </h1>
                        <div className="w-full flex-1  sm:mt-5 ">
                            <div className="my-5 sm:my-10 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                     sign up with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type=""
                                    placeholder="First Name"
                                    onChange={(e)=>{setfirstname(e.target.value)}}
                                />
                                
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type=""
                                    placeholder="Last Name"
                                    onChange={(e)=>{setlastname(e.target.value)}}
                                />
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e)=>{setemail(e.target.value)}}
                                />
                                <div className='relative'>
                                 <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type={pass}
                                    placeholder="Password"
                                    onChange={(e)=>{setpassword(e.target.value)}}
                                />
                                <button  type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' className="absolute top-1/2   rounded-e-md right-0  pr-3" onClick={passHandle}>
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
                                
                                <input
                                    className="w-full px-5 py-3 sm:px-8 sm:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type=""
                                    placeholder="Mobile no."
                                    onChange={(e)=>{setphone(e.target.value)}}
                                />
                                <div className='flex gap-2 pt-3 pl-2'>
                            <input  id="checkbox" type="checkbox" value="" checked={isChecked} className="w-4 h-4 border-gray-300 rounded-xl "
                            onChange={()=>{setIsChecked(!isChecked)}}></input>
                            <div className='-my-[3px] text-sm'>Remember me</div>
                            
                        </div>  
                                <button className="mt-5 tracking-wide font-semibold bg-[#FC5664] text-gray-100 w-full py-4 rounded-lg hover:bg-red-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                                    <span className="ml-3">Sign Up</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's ‎ ‎ 
                                    <a  className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    ‎ ‎     and its‎ ‎ 
                                    <a  className="border-b border-gray-500 border-dotted">
                                         Privacy Policy
                                    </a>
                                </p>
                                <div className='pt-5 flex justify-center'>
                    <span className=' text-sm'>Already have an account?</span>
                    <button className='text-red-600 font-medium cursor-pointer -translate-y-[2px]' onClick={
                        ()=>{navigate('/signin')}
                    }> Login</button>
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