import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartSize,
  cartState,
} from "../atoms/cartState";

export default function FoodComponent({
  name,
  price,
  available,
  className,
  imageUrl,
  id,
}) {
  const [number, setNumber] = useState(1);
  const [cost, setcost] = useState(price);
  const [cart, setCart] = useRecoilState(cartState);
  const size = useRecoilValue(cartSize);

  useEffect(() => {
    setcost(number * price);
  }, [number]);

  function onClick() {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + number,
        cost: newCart[index].cost + cost,
      };
      setCart(newCart);
    } else {
      setCart([...cart, { id, name, quantity: number, cost, imageUrl }]);
    }
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden w-36 sm:w-48 lg:w-56 group">
        <div
          className="h-28 sm:h-36 lg:h-40 w-full bg-stone-100 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="p-3 sm:p-4">
          <h3 className="font-['Outfit'] font-semibold text-stone-900 text-sm sm:text-base truncate">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-['Outfit'] text-stone-900 font-semibold text-sm sm:text-base">
              &#8377;{cost}
            </span>
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button
                className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                onClick={() => number > 1 && setNumber(number - 1)}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span className="w-7 h-7 flex items-center justify-center font-['Outfit'] text-sm font-medium text-stone-900 bg-stone-50">
                {number}
              </span>
              <button
                className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                onClick={() => number < 6 && setNumber(number + 1)}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
          <button
            className="mt-3 w-full py-2 bg-stone-900 hover:bg-stone-800 text-white font-['Outfit'] text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
            onClick={onClick}
          >
            Add to cart
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
