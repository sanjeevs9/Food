import ReactDOM from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartSize, cartState } from "../atoms/cartState";
import { useState, useEffect } from "react";
import axios from "axios";
import EmptyCart from "../img/EmptyCart.svg";
import { NETWORK } from "../../network";
import { userState } from "../atoms/userState";
import { balanceState } from "../atoms/balanceState";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../toast";

export default function Cart({ fn, open }) {
  const [cart, setCart] = useRecoilState(cartState);
  const [total, setTotal] = useState(0);
  const size = useRecoilValue(cartSize);
  const user = useRecoilValue(userState);
  const [balance, setbalance] = useRecoilState(balanceState);
  const[delay,setdelay]=useState(true);
  const navigate =useNavigate();

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => total + item.cost, 0);
    setTotal(newTotal);
  }, [cart]);

  if (!open) return null;

  function removeFromCart(x) {
    setCart(cart.filter((item) => item.id !== x.id));
  }

  let token = localStorage.getItem("token");
  const restra = localStorage.getItem("restra");

  async function checkout() {
    if(!token){
      token=sessionStorage.getItem("token");
      if(!token){
        errorToast("Please login")
        return
      }
    }
    setdelay(false)

    axios
      .post(
        `${NETWORK}/food/user/transaction`,
        { id: restra, total: total },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setbalance();
        order();
      })
      .catch((error) => {
        alert(error.response.data.message);
        setdelay(true)
        return;
      });
  }
  async function order() {
    const name = user.firstName.concat(" ").concat(user.lastName);
    
    await axios
      .post(
        `${NETWORK}/food/order/create`,
        {
          sellerId: restra,
          cost: Number(total),
          status: "placed",
          items: cart,
          name: name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
     
        setdelay(true)
        setCart([]);
        successToast("Order placed")
        // alert("Order placed");
        navigate('/orderhistory')
      })
      .catch((error) => {
      
      });
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm  ">
        <div
          className={`${
            size === 0 ? `flex` : `hidden`
          } relative flex-col w-5/6 h-3/5 md:w-3/5 sm:h-3/4 md:h-3/5 xl:w-2/5   bg-white rounded-xl  inset-x-26 sm:inset-x-16 lg:inset-x-36 p-6 -translate-y-12 sm:-translate-y-8 xl:-translate-y-20 md:-translate-x-10 xl:translate-x-32 2xl:translate-x-64`}
        >
          <div
            className="absolute top-0 right-0 translate-x-4 -translate-y-4 cursor-pointer"
            onClick={fn}
          >
            <svg
              className="h-14 w-14 transform rotate-45"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex mx-auto font-bold text-2xl ">Cart Empty</div>
            <div className="flex justify-center items-center mx-auto my-auto h-3/4 w-3/4">
              <img src={EmptyCart} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <div
          className={`${
            size === 0 ? `hidden` : `flex`
          }  relative flex-col w-5/6 h-4/6 md:w-3/5 sm:h-3/4 xl:w-2/5 bg-white rounded-xl  inset-x-26 sm:inset-x-16 lg:inset-x-36 p-6 -translate-y-8 sm:-translate-y-0 xl:-translate-y-2 md:-translate-x-10 xl:translate-x-32 2xl:translate-x-64`}
        >
          <div
            className="absolute top-0 right-0 translate-x-4 -translate-y-4 cursor-pointer"
            onClick={fn}
          >
            <svg
              className="h-14 w-14 transform rotate-45"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <hr />
          </div>

          <div className="flex-grow overflow-y-auto mb-4 space-y-3 overflow-x-auto " >
            {cart.map((x) => (
              <div className="flex  rounded-lg bg-white flex-row sm:p-4">
                <img
                  className="m-2 h-14 w-16 sm:h-24 sm:w-28 rounded-md border object-cover object-center"
                  src={x.imageUrl}
                />
                <div className="flex w-full flex-col px-2 py-2">
                  <span className="font-medium sm:font-semibold">{x.name}</span>
                  <span className="float-right text-gray-400 text-sm sm:text-base">
                    {x.quantity}
                  </span>
                  <p className="text-sm sm:text-base font-semibold">&#8377;{x.cost}</p>
                </div>
                <div
                  className=" text-red-600 cursor-pointer flex text-sm sm:text-base font-medium sm:font-semibold pt-2 sm:pt-0"
                  onClick={() => removeFromCart(x)}
                >
                  remove
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mb-4">
            <span className="font-bold">SubTotal</span>
            <span className="font-bold pr-5">&#8377;{total}</span>
          </div>
              {
                delay===true? (
                  <>
                  <button
            className="w-full py-2 px-4 bg-[#FC5664] hover:bg-red-500 text-white rounded-md"
            onClick={checkout}
          >
            Checkout
          </button>
          </>
                ):(
                  <>
                  <button 
                 className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
                  >
                    Loading...
                  </button>
                  </>
                )
              }
          
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
