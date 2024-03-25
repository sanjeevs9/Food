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
    // emailjs
    //   .send(
    //     serive,
    //     temp,
    //     {
    //       to_name: name,
    //       message: `Your otp is ${otp}`,
    //       from_name: "Sanjeev",
    //       receiver: "sanjeev.19kr@gmail.com",
    //       reply_to: "sanjeev.19kr@gmail.com",
    //     },
    //     key
    //   )
    //   .then(
    //     () => {
    //       console.log("success");
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }




    
    return(
        <>
        <div className="max-h-screen p-1 ">
        <div className="bg-[#fff7ed] p-10  h-[99vh]  rounded-xl flex flex-col lg:flex-row    justify-between gap-3  ">
           <img src={pizza} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={burger} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={foodimg} className="  hidden lg:flex md:flex w-full h-60 object-cover items-center lg:h-96 lg:w-full rounded-lg xl:hidden  md:h-32"></img>
           
         
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-5 items-center sm:pt-5 h-fit w-80 '>
                <hr className="w-full h-px sm:my-8   bg-gray-200 border-0 flex lg:hidden"/>
                <input className='p-2 w-80 rounded-lg border-2' placeholder='First Name' onChange={
                    (e)=>{setfirstname(e.target.value)}
                }></input>
                <input className='p-2 w-80  rounded-lg border-2' placeholder='Last Name' onChange={
                    (e)=>{setlastname(e.target.value)}
                }></input>
                <input className='p-2 w-80  rounded-lg border-2' placeholder='Email address' onChange={
                    (e)=>{setemail(e.target.value)}
                }></input>
                <div className='relative'>
                <input className='p-2  w-80 rounded-lg border-2' type={pass} placeholder='Password' id="password" onChange={
                    (e)=>{setpassword(e.target.value)}
                }></input>
                 <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={passHandle}>
      <svg class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path className={pass=="text"?`hidden`:``} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path className={pass=="text"?`hidden`:``} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path className={pass=="text"?`hidden`:``} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line className={pass=="text"?`hidden`:``} x1="2" x2="22" y1="2" y2="22"/>
        <path className={pass=="password"?`hidden`:`block`} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle className={pass=="password"?`hidden`:`block`} cx="12" cy="12" r="3"/>
      </svg>
    </button>
    </div>
                <input className='p-2  w-80 rounded-lg border-2' placeholder='Phone Number' onChange={
                    (e)=>{setphone(e.target.value)}
                }></input>
                    <div className='flex flex-row justify-between w-full sm:w-96 lg:w-full' >
                        <div className='flex gap-2'>
                            <input  id="checkbox" type="checkbox" value="" checked={isChecked} className="w-4 h-4 border-gray-300 rounded "
                            onChange={()=>{setIsChecked(!isChecked)}}></input>
                            <div className='-my-1'>Remember me</div>
                            
                        </div>    
                        <div className='flex cursor-pointer text-xs pt-1 underline' onClick={()=>{alert("Working On It")}}>Term and Conditons</div>
                    </div>
                <button className='bg-blue-500 p-2 w-32 rounded-md text-white' onClick={handle}>Sign Up</button>
                <div>
                    <span className='font-bold text-sm'>Already have an account?</span>
                    <button className='text-red-600 font-semibold cursor-pointer' onClick={
                        ()=>{navigate('/signin')}
                    }> Login</button>
                </div>
                {/* <img src={burger} className='xl:hidden h-16 w-16 '></img> */}
            </div>
            <div className='text-black'>
               
            </div>
        </div> 
        </div>
        </div>
       
        </>
    )
}