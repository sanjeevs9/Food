import logo from "../../public/front/logo.png";
import burger from "../../public/food/p9.png";
import pizza from "../../public/food/p12.png";
import thali from "../../public/front/thali.png";
import { useState } from "react";
import axios from "axios";

import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import { NETWORK } from "../../network";

export default function Front() {
  const [drop, setdrop] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handle() {
    if (!token) {
      alert("Please Login or Create Your account");
      return;
    }
    await axios
      .post(
        `${NETWORK}:3000/food/local`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        {
          res.data === "user" ? navigate("/user") : navigate("/vendor");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  }

  // useEffect(() => {
  //   function requestNotificationPermission() {
  //     Notification.requestPermission().then(function(permission) {
  //       if (permission === 'granted') {
  //         console.log('Notification permission granted.');
  //       } else {
  //         console.log('Unable to get permission to notify.');
  //       }
  //     });
  //   }

  //   requestNotificationPermission();
  // }, []);

  return (
    <>
      <div className=" min-h-screen p-16">
        <div
          className="absolute inset-0 bg-no-repeat bg-left-top filter blur-[6px] z-[-1]"
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

        <div className=" h-screen  bg-[#fff7ed] rounded-xl">
          <div className="flex p-12 justify-between">
            <img src={logo} className="h-10 w-10"></img>
            <ul className="hidden sm:flex gap-10 pr-2 ">
              <li className="cursor-pointer" onClick={handle}>
                Dashboard
              </li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  navigate("/help");
                }}
              >
                Contact Us
              </li>
              {/* <li className=>Join</li> */}
              <li>
                <button
                  className=" bg-red-600 hover:bg-red-700 active:bg-red-600 rounded-lg font-semibold w-11  cursor-pointer h-7 text-white"
                  onClick={() => {
                    setdrop(!drop);
                  }}
                >
                  Join
                </button>
                {drop && (
                  <div className="absolute -mx-36">
                    <DropDown />
                  </div>
                )}
              </li>
            </ul>

            <div className="sm:hidden">
              <DropDown />
            </div>
          </div>
          <div className="flex flex-row justify-between p-12 xl:justify-around">
            <div className="">
              <span className="text-red-500 font-bold text-5xl md:text-7xl">
                Welcome{" "}
              </span>
              <span className=" font-bold text-3xl md:text-4xl">to </span>
              <h1 className="font-bold text-3xl md:text-4xl">The World Of</h1>
              <h3 className=" font-bold text-3xl md:text-4xl pb-10">
                Tasty and fresh Food
              </h3>
              <div>
                <input
                  placeholder="Search Burger"
                  className="p-3 w-44 md:w-60 "
                ></input>
                <button className="bg-red-600 hover:bg-red-700 active:bg-red-600 text-white p-3  w-20 md:w-28">
                  Search
                </button>
              </div>
            </div>
            <div>
              <img src={thali} className="hidden md:flex h-80 w-80" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
