import work from '../../../public/work/—Pngtree—a man at work_4463549.png'
import stair from '../../../public/work/pngwing.com.png'
import man from '../../../public/work/man.png.png'

import burger from '../../../public/food/p9.png'

export default function SellerSignin(){
    return(
        <>
         <div className="min-h-screen p-1 ">
            <div className="bg-[#fff7ed]  min-h-screen   rounded-xl flex flex-row justify-center md:justify-between  lg:justify-center">
                    <div className='flex flex-col'>
                    
                    <img src={work} className=' hidden md:flex h-96 w-96 mt-auto lg:absolute lg:inset-y-0 lg:left-0' />
                    </div>
                    <div className='flex flex-col p-10 gap-5 w-96 pt-32 xl:ml-16'>
                        <input placeholder='Phone Number' className='p-2 border-2 rounded-lg'></input>
                        <input placeholder='Password' className='p-2 border-2 rounded-lg'></input>
                        <div className='flex flex-row justify-between sm:justify-evenly lg:justify-between w-full' >
                        <div className='flex gap-2'>
                            <div className=''><input disabled id="disabled-checkbox" type="checkbox" value="" className=" w-4 h-4 border-gray-300 rounded"></input></div>
                            <div className=''>Remember me</div>
                            
                        </div>    
                        <div className='flex cursor-pointer text-xs pt-1'>Term and Conditons</div>
                    </div>
                        
                        <div className=' flex justify-center '>
                        <button className='bg-blue-500 p-2 w-36  rounded-md text-white '>Signin</button>
                        </div>
                        <img src={stair} className='flex md:hidden h-80'/>
                    </div>
                    <img src={man} className='hidden lg:flex h-1/2 lg:absolute lg:bottom-0 right-0'/>
             
            </div>
        </div>
        </>
    )
}