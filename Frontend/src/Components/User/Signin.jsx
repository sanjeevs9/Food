import foodimg from '../../img/victoria-shes-UC0HZdUitWY-unsplash.jpg';
import burger from '../../img/food/p9.png'
import pizza from '../../img/food/p12.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from 'react';
import { NETWORK } from '../../../network';
import { errorToast, successToast } from '../../toast';

export default function Signin(){
    const navigate = useNavigate();
    const[email,setEmail]=useState("");
    const[password,setpassword]=useState("");
    const[check,setcheck] =useState(false);
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
        <div className="min-h-screen p-1 ">
        <div className="bg-[#fff7ed] p-10 h-[99vh]   rounded-xl flex flex-col lg:flex-row  gap-3 xl:justify-between   ">
           <img src={burger} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={foodimg} className="  flex w-full h-60 object-cover items-center lg:h-96 lg:w-full rounded-lg xl:hidden  md:h-72"></img>
           
         
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 pt-10 lg:pt-1  xl:pt-20  items-center h-fit'>
                <hr className="w-full h-px my-4 bg-gray-200 border-0 flex lg:hidden"/>
                <input className='p-2 border-2 w-80 rounded-lg ' placeholder='Email address' onChange={
                    (e)=>{
                        setEmail(e.target.value)}
                }></input>
                <div className='relative'>
                <input className='p-2 w-80 rounded-lg border-2' type={pass} placeholder='Password' onChange={
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
                    <div className='flex flex-row justify-between sm:justify-evenly lg:justify-between w-full' >
                        <div className='flex gap-2'>
                            <div className=''><input  id="checkbox" checked={check} type="checkbox" value="" className=" w-4 h-4 border-gray-300 rounded"
                             onChange={()=>{setcheck(!check)}}></input></div>
                            <div className='-my-0.5'>Remember me</div>
                            
                        </div>    
                        <div className='flex cursor-pointer text-xs pt-1 underline' onClick={()=>{alert("Working On it")}}>Term and Conditons</div>
                    </div>
                <button className='bg-blue-500 p-2 w-32 rounded-md text-white' onClick={()=>{handle()}}>Login</button>
                <div>
                    <span className='font-bold text-sm'>Dont have an account?</span>
                    <button className='text-red-600 font-semibold cursor-pointer' onClick={
                        ()=>{navigate('/signup')}
                    }>Sign Up</button>
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