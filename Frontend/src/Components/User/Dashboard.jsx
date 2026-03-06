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

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
        <div className="px-4 md:px-10 lg:px-16">
          <Navbar className="w-60 lg:w-80" />
        </div>
        <div className="px-4 md:px-10 lg:px-16">
          <Carousel />
        </div>
        <div className="px-4 md:px-10 lg:px-16 py-8 flex-grow">
          <h2 className="font-['Fraunces'] text-2xl font-semibold text-stone-900 mb-6">Restaurants near you</h2>
          <div className="grid items-start gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {resturant &&
              resturant.map((x) => (
                <Resturant
                  key={x._id}
                  name={x.shopName}
                  description={x.description}
                  imgUrl={x.imgUrl}
                  onClick={() => handle(x._id)}
                />
              ))}
          </div>
        </div>
        <div className="px-4 md:px-10 lg:px-16">
          <Footer />
        </div>
      </div>
    </>
  );
}
