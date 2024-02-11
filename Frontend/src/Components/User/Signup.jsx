import foodimg from '../../img/victoria-shes-UC0HZdUitWY-unsplash.jpg';
import burger from '../../../public/food/p9.png'
import pizza from '../../../public/food/p12.png'

export default function Signup(){
    return(
        <>
        <div className="min-h-screen p-1 ">
        <div className="bg-[#fff7ed] p-10 min-h-screen rounded-xl flex flex-col lg:flex-row    justify-between gap-3  ">
           <img src={pizza} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={burger} className='hidden xl:block xl:h-80 xl:w-80'></img>
           <img src={foodimg} className="  hidden lg:flex md:flex w-full h-60 object-cover items-center lg:h-96 lg:w-full rounded-lg xl:hidden  md:h-32"></img>
           
         
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 items-center pt-5 h-fit'>
                <hr className="w-full h-px my-8 bg-gray-200 border-0 flex lg:hidden"/>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='First Name'></input>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='Last Name'></input>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='Email address'></input>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='Password'></input>
                <input className='p-2 w-96 rounded-lg border-2' placeholder='Phone Number'></input>
                    <div className='flex flex-row justify-between w-full' >
                        <div className='flex gap-2'>
                            <input disabled id="disabled-checkbox" type="checkbox" value="" className="w-4 h-4 border-gray-300 rounded pt-6"></input>
                            <div className=''>Remember me</div>
                            
                        </div>    
                        <div className='flex cursor-pointer text-xs pt-1'>Term and Conditons</div>
                    </div>
                <button className='bg-blue-500 p-2 w-32 rounded-md text-white'>Sign Up</button>
                <div>
                    <span className='font-bold text-sm'>Already have an account?</span>
                    <span className='text-red-600 font-semibold cursor-pointer'> Login in</span>
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