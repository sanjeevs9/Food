import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "./Search";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartSize } from "../../atoms/cartState";
import Cart from "../Cart";
import axios from "axios";
import { userState } from "../../atoms/userState";
import { NETWORK } from "../../../network";
import Wallet from "./Wallet";
import { errorToast } from "../../toast";

export default function Navbar({ className }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const length = useRecoilValue(cartSize);
  const [open, setopen] = useState(false);
  const [wallet, setWallet] = useState(false);

  let token = localStorage.getItem("token");
  const [user, setuser] = useRecoilState(userState);

  useEffect(() => {
    if(!token){
      token=sessionStorage.getItem("token")
      if(!token){
        // errorToast("please login")
        return
      }
    }
    axios
      .get(`${NETWORK}/food/user/getUser`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
     
        setuser(res.data);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function help() {
    setopen(!open);
  }

  function handle() {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }

  function walletopen() {
    setWallet(!wallet);
  }

  return (
    <>
      <div className=" flex flex-row justify-between p-1 sm:pr-16 pl-2 sm:pl-16">
        <div className="cursor-pointer" onClick={()=>{navigate('/user')}}>
          <img src={logo} className="h-11 w-11 sm:h-16 sm:w-16"></img>
        </div>
        <div className="hidden sm:flex justify-center items-center ">
          <Search className={`${className}`} />
        </div>
        <Wallet open={wallet} fn={walletopen} />
        <Cart open={open} fn={help} />

        <div className="p-4 flex w-44 sm:w-52 md:w-80 lg:w-96">
          <ul className="flex justify-between w-full text-sm sm:text-base">
            <li
              className=" relative flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..."
              onClick={toggleDropdown}
            >
              <svg className="h-5 sm:h-7"
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
              <span>User</span>
            </li>
            <div
              className={` absolute transform translate-y-4 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${
                isOpen ? "block" : "hidden"
              }`}
              id="dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block text-xs font-medium text-gray-900 truncate">
                  {user.email}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <button
                    className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 "
                    onClick={() => {
                      navigate("/user");
                    }}
                  >
                    Home
                  </button>
                </li>
                
                <li>
                  <button
                    className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 "
                    onClick={() => {
                      navigate("/orderhistory");
                    }}
                  >
                    My order
                  </button>
                </li>
                <li>
                  <button
                    className=" md:hidden  text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 "
                    onClick={() => {
                      walletopen()
                    }}
                  >
                   My Wallet
                  </button>
                </li>
                <li>
                  <button
                    className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 "
                    onClick={() => {
                      navigate("/help");
                    }}
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4 "
                    onClick={()=>{navigate("/help")}}
                  >
                    Help
                  </button>
                </li>
                <li>
                  <button
                    className="text-sm hover:bg-gray-100 text-gray-700 block  py-2 w-full text-left px-4"
                    onClick={handle}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>

            <li
              className=" hidden md:flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..."
              onClick={() => {
                walletopen()
                
              }}
            >
              <div>
             <svg className="w-7 h-7 "   viewBox="0 0 100 100" ><path d="M93 48.627h-.5V34.968c0-4.263-3.157-7.792-7.254-8.398v-3.073c0-4.687-3.813-8.5-8.5-8.5H72.98l-1.983-5.285a1.5 1.5 0 0 0-1.864-.901l-19.201 6.186H10.735c-3.989 0-7.235 3.246-7.235 7.235V82.76c0 4.687 3.813 8.5 8.5 8.5h72c4.687 0 8.5-3.813 8.5-8.5V69.101h.5c1.93 0 3.5-1.57 3.5-3.5V52.127c0-1.929-1.57-3.5-3.5-3.5zM74.106 17.998h2.64c3.032 0 5.5 2.467 5.5 5.5v2.971h-4.961l-.299-.797-2.88-7.674zm-4.33-3 2.437 6.494 1.868 4.977H24.109l44.582-14.362 1.085 2.891zm-59.041 3h29.884l-18.84 6.07-7.453 2.401h-3.591c-2.335 0-4.235-1.9-4.235-4.235s1.9-4.236 4.235-4.236zM89.5 82.76c0 3.033-2.468 5.5-5.5 5.5H12a5.506 5.506 0 0 1-5.5-5.5V28.096c.021.016.046.026.068.042.262.185.535.354.821.504.053.028.109.052.163.079.265.131.538.246.82.344.048.017.094.036.142.052.312.101.633.177.962.235.073.013.147.023.221.034.34.049.685.083 1.038.083H84c3.032 0 5.5 2.467 5.5 5.5v13.659h-9.938c-4.687 0-8.5 3.813-8.5 8.5v3.474c0 4.687 3.813 8.5 8.5 8.5H89.5V82.76zm4-17.159a.5.5 0 0 1-.5.5H79.562a5.506 5.506 0 0 1-5.5-5.5v-3.474c0-3.033 2.468-5.5 5.5-5.5H93a.5.5 0 0 1 .5.5v13.474z"></path><path d="M83.449 54.522a4.347 4.347 0 0 0-4.343 4.342c0 2.395 1.948 4.342 4.343 4.342s4.342-1.948 4.342-4.342a4.347 4.347 0 0 0-4.342-4.342zm0 5.685c-.74 0-1.343-.602-1.343-1.342a1.343 1.343 0 0 1 2.685 0c0 .739-.602 1.342-1.342 1.342z"></path></svg>
             </div>
              <span className="cursor-pointer">Wallet</span>
            </li>
            <li
              className="relative flex cursor-pointer hover:scale-95 motion-reduce:transform-none ..."
              onClick={help}
            >
              <svg className="h-5"
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
              <span className="cursor-pointer">Cart</span>
              <div
                className={`bg-[#FC5664] h-7 w-7 absolute rounded-full text-white flex justify-center items-center font-extrabold text-sm transform translate-x-28 -translate-y-5 ${
                  length === 0 ? `hidden` : `flex`
                }`}
                style={{ top: "35px", right: "100px" }}
              >
                {length}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
