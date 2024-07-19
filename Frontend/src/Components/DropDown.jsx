import { useNavigate } from "react-router-dom"

export default function DropDown(){
    const navigate =useNavigate();

    return(
        <>
        <div className=" flex flex-col  bg-[#fff7ed] w-44  gap-2 p-4 rounded-lg border-[1px]">
            <button className="text-white bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-md font-semibold p-2" onClick={
                ()=>{navigate('/signup')}
            }>    
                Login as user
            </button>
            <button className=" text-white bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-md font-semibold p-2 "onClick={
                ()=>{navigate('/create')}
            }>
            Login as Seller
            </button>
        </div>
        </>
    )
}