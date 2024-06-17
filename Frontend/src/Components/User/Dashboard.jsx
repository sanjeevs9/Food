import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import Footer from "../Footer";
import Resturant from "../Resturant";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { filterState } from "../../atoms/filterState";
import { NETWORK } from "../../../network";

export default function Dashboard() {
  const [resturant, setresturant] = useState([]);
  const [filter, setfilter] = useRecoilState(filterState);
  const navigate = useNavigate();

  function handle(x) {
    localStorage.setItem("restra", x);
    navigate("/order");
  }

  //all shopname
  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/filter?filter=${filter}`)
      .then((res) => {
        console.log(res.data);
        setresturant(res.data);
        console.log(resturant);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

  return (
    <>
      <div className="flex flex-col p-3 gap-7 bg-[#fff7ed] min-h-screen">
        <Navbar className="w-60 lg:w-96" />
        <Carousel />

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
    </>
  );
}
