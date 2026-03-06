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
      <div className="flex items-center justify-between py-3 px-1">
        {/* Logo */}
        <div className="cursor-pointer flex items-center gap-2.5" onClick={()=>{navigate('/user')}}>
          <img src={logo} className="h-9 w-9 sm:h-11 sm:w-11 rounded-full" />
          <span className="hidden sm:block font-['Fraunces'] font-semibold text-stone-900 text-lg">SnackSync</span>
        </div>

        {/* Search */}
        <div className="hidden sm:flex justify-center items-center">
          <Search className={`${className}`} />
        </div>

        <Wallet open={wallet} fn={walletopen} />
        <Cart open={open} fn={help} />

        {/* Nav Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wallet */}
          <button
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-['Outfit'] font-medium text-stone-600 hover:bg-stone-100 transition-colors"
            onClick={walletopen}
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1 0-6h.75A2.25 2.25 0 0 1 18 6v0a2.25 2.25 0 0 1-2.25 2.25H15M3.75 18h16.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75Z" />
            </svg>
            Wallet
          </button>

          {/* Cart */}
          <button
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-['Outfit'] font-medium text-stone-600 hover:bg-stone-100 transition-colors"
            onClick={help}
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {length}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-['Outfit'] font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              onClick={toggleDropdown}
            >
              <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Account</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-stone-100">
                  <p className="font-['Outfit'] text-sm font-semibold text-stone-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="font-['Outfit'] text-xs text-stone-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="py-1">
                  {[
                    { label: "Home", action: () => navigate("/user") },
                    { label: "My Orders", action: () => navigate("/orderhistory") },
                    { label: "My Wallet", action: walletopen, mobile: true },
                    { label: "Settings", action: () => navigate("/help") },
                    { label: "Help", action: () => navigate("/help") },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`${item.mobile ? 'md:hidden' : ''} w-full text-left px-4 py-2.5 font-['Outfit'] text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors`}
                      onClick={item.action}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-stone-100 mt-1">
                    <button
                      className="w-full text-left px-4 py-2.5 font-['Outfit'] text-sm text-red-500 hover:bg-red-50 transition-colors"
                      onClick={handle}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
