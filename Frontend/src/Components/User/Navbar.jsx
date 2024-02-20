import logo from "../../../public/Front/logo.png";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Search from "./Search";
import { useRecoilValue,useRecoilState } from "recoil";
import { cartSize } from "../../atoms/cartState";
import Cart from "../Cart";
import axios from "axios"
import { userState } from "../../atoms/userState";
import { NETWORK } from "../../../network";


export default function Navbar({className}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const length=useRecoilValue(cartSize);
  const [open,setopen]=useState(false);

  const token=localStorage.getItem("token");
    const[user,setuser]=useRecoilState(userState);

  useEffect(()=>{
    axios.get(`${NETWORK}:3000/food/user/getUser`,
    {
      headers:{
        authorization:token
      }
    }
    )
    .then(res=>{
      setuser(res.data)
    })
  },[])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function help(){
    setopen(!open);
  }

function handle(){
  localStorage.clear()
  navigate('/signin')
}

  return (
    <>
      <div className=" flex flex-row justify-between p-1 pr-16 pl-10 sm:pl-16 bg-">
        <div className="">
          <img src={logo} className="h-16 w-16"></img>
        </div>
        <div className="hidden sm:flex justify-center items-center ">
      <Search  className={`${className}`}/>
      </div>
     
      <Cart open={open} fn={help}/>
      
        <div className="p-4 flex w-44 sm:w-52 md:w-80 lg:w-96">
          <ul className="flex justify-between w-full">
            <li className=" relative flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..."
            onClick={toggleDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              <span
              >
                User
              </span>
            </li>
            <div className={` absolute transform translate-y-4 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${isOpen ? 'block' : 'hidden'}`} id="dropdown">
          <div className="px-4 py-3">
            <span className="block text-sm">{user.firstName}  {user.lastName}</span>
            <span className="block text-xs font-medium text-gray-900 truncate">{user.email}</span>
          </div>
          <ul className="py-1" aria-labelledby="dropdown">
          <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 " onClick={
                ()=>{navigate('/user')}
              }>Home</button>
              </li>
          <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 " onClick={
                ()=>{navigate('/orderhistory')}}>My order</button>
              </li>
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 " onClick={
                ()=>{navigate('/help')}
              }>Settings</button>
              </li>
           
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4"  onClick={handle}>Sign out</button>
            </li>
          </ul>
         
        </div>
            
            <li className="hidden md:flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..." onClick={() => {
                  navigate("/help");
                }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span className="cursor-pointer"
                >Help</span>
            </li>
            <li className="relative flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..."  onClick={help}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="cursor-pointer"
               >Cart</span>
               <div className={`bg-red-500 h-7 w-7 absolute rounded-full text-white flex justify-center items-center font-extrabold text-sm transform translate-x-28 -translate-y-5 ${length===0?`hidden` : `flex`}`} style={{ top: '35px', right: '100px' }}>{length}</div>
            </li>
           
          </ul>
        </div>
      </div>
    </>
  );
}
