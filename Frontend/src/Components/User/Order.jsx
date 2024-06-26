import { useEffect, useState,useRef } from "react";
import Resturant from "../Resturant";
import Navbar from "./Navbar";
import axios from "axios";
import FoodComponent from "../FoodComponent";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, costState, numberState } from "../../atoms/cartState";
import { useLocation } from "react-router-dom";
import burger from '../../img/food/p9.png'
import pizza from '../../img/food/p12.png'
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


  //get items for resturant
  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/item?id=${rest}`)
      .then((res) => {
        setitem(res.data);
      })
      .catch((error) => {
    
      });
  }, []);

  //get resturant details
  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/detail?id=${rest}`)
      .then((res) => {
        setdetail(res.data);
      })
      .catch((error) => {
     
      });
  }, []);


  return (
    <>
      <div className="xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-5 pb-10">
      <div
          className="absolute inset-0 bg-no-repeat bg-left-top filter blur-[6px] z-[-1] translate-y-10"
          style={{
            backgroundImage: `url(${burger})`,
            backgroundSize: "300px",
          }}
        ></div>

        <div
          className="absolute inset-0 bg-no-repeat bg-right-bottom filter blur-[6px] z-[-1]"
          style={{
            backgroundImage: `url(${pizza})`,
            backgroundSize: "300px",
          }}
        ></div>
        <Navbar className="w-60 xl:w-80" />
        <div className="xl:pl-10 xl:pr-10 pl-5 pr-5 ">
          <div className="bg-[#fff7ed] pl-7 pr-7 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 xl:pl-32 xl:pr-32 min-h-screen pb-10 rounded-xl "
            
          >
            <div className=" flex flex-col  ">
              <div className="text-2xl pt-5 font-bold">{detail ? detail.shopName : "Loading..."}</div>
              <div className="pt-1">
                <span>Contact no: </span>{detail ? detail.phoneNumber : "Loading ..."}
              </div>
            </div>
            <hr class="h-px my-8 bg-gray-600 border-0"></hr>
            <div className="grid grid-cols-2  md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 sm:pt-10   gap-10 ">
              {item.map((x) => (
                <div className="grid justify-center">
                <FoodComponent
                  key={x._id}
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
    </>
  );
}
