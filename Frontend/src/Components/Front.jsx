import a from '../../public/Front/a.jpg'
import b from '../../public/Front/b.jpg'
import c from '../../public/Front/c.jpg'
import d from '../../public/Front/d.jpg'
import e from '../../public/Front/e.jpg'
import logo from '../../public/front/logo.png'
import burger from '../../public/food/p9.png'
import pizza from '../../public/food/p12.png'
import thali from "../../public/front/thali.png"
import { useState } from 'react'

import man from '../../public/work/man.png.png'
import DropDown from './DropDown'


export default function Front(){
    const[drop,setdrop]=useState(false);
    return (
        <>
       
       
        <div className=" min-h-screen p-16">
            <div className="absolute inset-0 bg-no-repeat bg-left-top filter blur-[6px] z-[-1]"
            style={{
            backgroundImage: `url(${burger})`,
            backgroundSize: '300px'
            }}>
            </div>
      
            <div className="absolute inset-0 bg-no-repeat bg-right-bottom filter blur-[6px] z-[-1]"
            style={{
            backgroundImage: `url(${pizza})`,
            backgroundSize: '300px'
            }}>
            </div>
        
            <div className=' h-screen  bg-[#fff7ed] rounded-xl' >
                <div className='flex p-12 justify-between'>
                    <img src={logo} className='h-10 w-10'></img>
                    <ul className='hidden sm:flex gap-10 pr-2 '>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>Contact Us</li>
                        {/* <li className=>Join</li> */}
                        <li> 
                            <button className=' bg-red-600 rounded-lg font-semibold w-11  cursor-pointer h-7 text-white' onClick={()=>{
                                setdrop(!drop)
                            }}>
                            Join
                            </button>
                            {drop && (
            <div className="absolute -mx-36">
            <DropDown />
                 </div>
                    )}
                        </li>
                    </ul>
                    {/* <button className=' bg-red-600 rounded-lg font-semibold w-11  cursor-pointer h-7 text-white sm:hidden' onClick={()=>{
                                setdrop(!drop)
                            }}>
                            Join
                            </button>
                            {drop && (
            <div className="absolute mx-48 my-8 h-64 w-32">
            <DropDown/>
                 </div>
                    )} */}
                    <div className='sm:hidden'>
                        <DropDown/>
                    </div>
                    
                </div>
                <div className='flex flex-row justify-between p-12 xl:justify-around'>
                    <div className=''>
                        <span className='text-red-500 font-bold text-5xl md:text-7xl'>Welcome </span>
                        <span className=' font-bold text-3xl md:text-4xl'>to </span>
                        <h1 className='font-bold text-3xl md:text-4xl'>The World Of</h1>
                        <h3 className=' font-bold text-3xl md:text-4xl pb-10'>Tasty and fresh Food</h3>
                        <div>
                            <input placeholder='Search Burger' className='p-3 w-44 md:w-60 '></input>
                            <button className='bg-red-600 text-white p-3  w-20 md:w-28'>Search</button>
                        </div>    
                    </div>
                    <div>
                        <img src={thali} className='hidden md:flex h-80 w-80'/>
                    </div>
                </div>
            </div>
        </div>

            

    
       
       
        
        </>
    )
}