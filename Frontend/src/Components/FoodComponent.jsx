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
  // const [number, setNumber] = useRecoilState(numberState(id));
  // const [cost,setcost]=useRecoilState(costState(id));

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
    <>
      <div>
        <div
          className={`flex flex-col bg-white shadow-md rounded-lg  ${className} w-32 sm:w-48  lg:w-56  `}
        >
          <div
            className=" rounded-t-lg h-24 sm:h-32 lg:h-36 xl:h-40  w-full flex-grow bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          >
          </div>
          <div className="p-2 sm:p-4 pt-1 flex flex-col items-center flex-grow sm:gap-1">
            <h1 className="text-gray-800 text-center  font-semibold sm:text-lg xl:text-xl">
              {name}
            </h1>
            <div className="flex justify-between  flex-row  w-full ">
              <p className=" text-center text-gray-800 mt-1 text-sm sm:text-base pt-1">
                &#8377;{cost}
              </p>

              <div className="inline-flex items-center mt-2  ">
                <button
                  className="w-7 justify-center bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center  border-r border-gray-200 "
                  onClick={() => number > 1 && setNumber(number - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-3 sm:h-6 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="justify-center w-5 text-sm sm:text-base sm:w-7 bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center  select-none">
                  {number}
                </div>
                <button
                  className="w-7 justify-center bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center  border-r border-gray-200"
                  onClick={() => number < 6 && setNumber(number + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-3 sm:h-6 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              className="py-2 px-4 bg-[#FC5664] text-xs sm:text-base text-white rounded hover:bg-red-500 active:bg-red-600 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
              onClick={onClick}
            >
              Add Item
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-4 w-4 sm:h-6 sm:w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
