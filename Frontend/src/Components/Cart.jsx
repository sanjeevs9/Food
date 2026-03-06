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
        navigate('/orderhistory')
      })
      .catch((error) => {
      });
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm" onClick={fn}>
      <div
        className="bg-white rounded-2xl border border-stone-200 w-[90%] max-w-md max-h-[80vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-['Fraunces'] text-lg font-semibold text-stone-900">
            Your Cart {size > 0 && <span className="font-['Outfit'] text-sm font-normal text-stone-400">({size} items)</span>}
          </h2>
          <button
            onClick={fn}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Empty State */}
        {size === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <img src={EmptyCart} className="w-32 h-32 opacity-60 mb-4" />
            <p className="font-['Outfit'] text-stone-400 text-sm">Your cart is empty</p>
          </div>
        )}

        {/* Items */}
        {size > 0 && (
          <>
            <div className="flex-grow overflow-y-auto px-6 py-3 divide-y divide-stone-100">
              {cart.map((x) => (
                <div key={x.id} className="flex items-center gap-3 py-3">
                  <img
                    className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0"
                    src={x.imageUrl}
                  />
                  <div className="flex-grow min-w-0">
                    <p className="font-['Outfit'] font-medium text-stone-900 text-sm truncate">{x.name}</p>
                    <p className="font-['Outfit'] text-xs text-stone-400">Qty: {x.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-['Outfit'] font-semibold text-stone-900 text-sm">&#8377;{x.cost}</p>
                    <button
                      className="font-['Outfit'] text-xs text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => removeFromCart(x)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-stone-100">
              <div className="flex justify-between mb-4">
                <span className="font-['Outfit'] font-medium text-stone-500 text-sm">Subtotal</span>
                <span className="font-['Outfit'] font-bold text-stone-900">&#8377;{total}</span>
              </div>
              <button
                className={`w-full py-3 rounded-xl font-['Outfit'] font-medium text-sm transition-colors ${
                  delay
                    ? 'bg-stone-900 hover:bg-stone-800 text-white'
                    : 'bg-stone-200 text-stone-500 cursor-wait'
                }`}
                onClick={delay ? checkout : undefined}
              >
                {delay ? 'Checkout' : 'Processing...'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
