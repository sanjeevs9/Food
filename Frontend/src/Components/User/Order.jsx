import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import FoodComponent from "../FoodComponent";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../atoms/cartState";
import { NETWORK } from "../../../network";

export default function Order() {
  const token = localStorage.getItem("token");
  const rest = localStorage.getItem("restra");

  const [item, setitem] = useState([]);
  const [detail, setdetail] = useState();
  const setCart=useSetRecoilState(cartState)

  useEffect(() => {
    return () => {
      setCart([]);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/item?id=${rest}`)
      .then((res) => {
        setitem(res.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/detail?id=${rest}`)
      .then((res) => {
        setdetail(res.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="px-4 md:px-10 lg:px-16">
        <Navbar className="w-60 xl:w-80" />
      </div>
      <div className="px-4 md:px-10 lg:px-16 pb-10">
        <div className="bg-white border border-stone-200 rounded-2xl px-6 sm:px-10 md:px-16 lg:px-20 py-8 min-h-[70vh]">
          {/* Restaurant Header */}
          <div className="mb-8">
            <h1 className="font-['Fraunces'] text-2xl sm:text-3xl font-semibold text-stone-900">
              {detail ? detail.shopName : "Loading..."}
            </h1>
            <p className="font-['Outfit'] text-sm text-stone-400 mt-1">
              Contact: {detail ? detail.phoneNumber : "..."}
            </p>
          </div>
          <div className="w-full h-px bg-stone-200 mb-8" />

          {/* Menu Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-5 sm:gap-8">
            {item.map((x) => (
              <div className="flex justify-center" key={x._id}>
                <FoodComponent
                  name={x.foodName}
                  price={x.price}
                  imageUrl={x.imgUrl}
                  id={x._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
