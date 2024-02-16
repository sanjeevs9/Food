import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import FoodComponent from "../FoodComponent";
import Footer from "../Footer";
import Resturant from "../Resturant";
import Navbar from "./Navbar";
import Search from "./Search";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import DropDown from "../DropDown";
import DropdownButton from "./DropdownButton";



export default function Dashboard() {
  const [resturant, setresturant] = useState([]);
  const[param, setParam] = useSearchParams();
  const navigate=useNavigate();

    function handle(x){
        localStorage.setItem("restra",x);
        navigate('/order');
    } 
 

  //all shopname
  useEffect(() => {
    axios
      .get("http://192.168.1.247:3000/food/seller/filter",
      {
        params: {
          filter: param.get("filter"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setresturant(res.data);
        console.log(resturant);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.get("filter")]);



  return (
    <>
      <div className="flex flex-col p-3 gap-7 bg-[#fff7ed] min-h-screen">
        <Navbar className="w-60 lg:w-96"/>
        <Carousel />
        

        <div className="grid items-center gap-5  justify-center sm:grid-cols-2 sm:justify-between  md:grid-cols-3   lg:grid-cols-4 ">
          {resturant &&
            resturant.map((x) => (
              <div className="grid justify-center">
              <Resturant key={x._id}
                name={x.shopName}
                description={x.description}
                imgUrl={x.imgUrl}
                onClick={() =>handle(x._id)}
              ></Resturant>
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
