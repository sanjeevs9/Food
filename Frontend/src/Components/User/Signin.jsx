import foodimg from '../../img/victoria-shes-UC0HZdUitWY-unsplash.jpg';
import burger from '../../../public/food/p9.png'
import pizza from '../../../public/food/p12.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';

export default function Signin(){
    const[email,setemail]=useState();
    const[password,setpassword]=useState();

    async function handle(){
        axios.post("http://localhost:3000/food/user/signin",
        {
            email,
            password
        }
        )
        .then(res=>{
            console.log(res.data.message);
            alert(res.data.message)
            localStorage("token",res.data.token)
        })
        .catch(error=>{
            console.log(error);
        })
    }


    const navigate = useNavigate();
    return(
        <>
        <div className="min-h-screen p-1 ">
        <div className="bg-[#fff7ed] p-10 min-h-screen   rounded-xl flex flex-col lg:flex-row  gap-3 xl:justify-between   ">
           <img src={burger} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={foodimg} className="  flex w-full h-60 object-cover items-center lg:h-96 lg:w-full rounded-lg xl:hidden  md:h-72"></img>
           
         
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 pt-10 lg:pt-1  xl:pt-20  items-center h-fit'>
                <hr className="w-full h-px my-4 bg-gray-200 border-0 flex lg:hidden"/>
                <input className='p-2 border-2 w-96 rounded-lg ' placeholder='Email address' onChange={
                    (e)=>{setemail(e.target.value)}
                }></input>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='Password' onChange={
                    (e)=>{setpassword(e.target.value)}
                }></input>
                    <div className='flex flex-row justify-between sm:justify-evenly lg:justify-between w-full' >
                        <div className='flex gap-2'>
                            <div className=''><input disabled id="disabled-checkbox" type="checkbox" value="" className=" w-4 h-4 border-gray-300 rounded"></input></div>
                            <div className=''>Remember me</div>
                            
                        </div>    
                        <div className='flex cursor-pointer text-xs pt-1'>Term and Conditons</div>
                    </div>
                <button className='bg-blue-500 p-2 w-32 rounded-md text-white' onClick={handle}>Login</button>
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