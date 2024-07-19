import { useContext, useEffect, useState } from "react";
import Carousel from "../Carousel";
import Footer from "../Footer";
import Resturant from "../Resturant";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { filterState } from "../../atoms/filterState";
import { NETWORK } from "../../../network";
import { Rcontext } from "./ResturantContext";

export default function Dashboard() {
  const [filter, setfilter] = useRecoilState(filterState);
  const navigate = useNavigate();
  const {resturant}=useContext(Rcontext)

  function handle(x) {
    localStorage.setItem("restra", x);
    navigate("/order");
  }

  //all shopname
  

  return (
    <>
      <div className="flex flex-col p-3 gap-7 bg-[#fff7ed] min-h-screen md:pl-10 md:pr-10">
        <Navbar className="w-60 lg:w-96" />
        <Carousel />
      <div className="md:pl-5 md:pr-5">
        <div className="grid items-center gap-5  justify-center grid-cols-2 sm:justify-between  md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-5 ">
          {resturant &&
            resturant.map((x) => (
              <div className="grid justify-center">
                <Resturant
                  key={x._id}
                  name={x.shopName}
                  description={x.description}
                  imgUrl={x.imgUrl}
                  onClick={() => handle(x._id)}
                ></Resturant>
              </div>
            ))}
        </div>
        <Footer />
      </div>
      </div>
    </>
  );
}
