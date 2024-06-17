import logo from "../img/logo.png";
import burger from "../img/food/p9.png";
import pizza from "../img/food/p12.png";
// import thali from "../img/front/thali.jpg";
import { useState } from "react";
import axios from "axios";

import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import { NETWORK } from "../../network";
import { errorToast } from "../toast";

export default function Front() {
  const [drop, setdrop] = useState(false);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handle() {
    if (!token) {
        token=sessionStorage.getItem("token");
         if(!token){
         errorToast("Please login or Create your account")
         return;
        } 
    }
    await axios
      .post(
        `${NETWORK}/food/local`,
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
        errorToast(error.response.data.message)
        // alert(error.response.data.message);
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
      <div className=" max-h-screen sm:p-16 p-8">
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

        <div className=" h-[85vh] sm:h-[85vh]  bg-[#fff7ed] rounded-xl">
          <div className="flex p-12 justify-between">
            <img src={logo} className="h-10 w-10"></img>
            <ul className=" sm:flex gap-10 pr-2 ">
              <li className="cursor-pointer hidden sm:flex" onClick={handle}>
                Dashboard
              </li>
              <li
                className="cursor-pointer hidden sm:flex"
                onClick={() => {
                  navigate("/help");
                }}
              >
                Contact Us
              </li>
              {/* <li className=>Join</li> */}
              <li>
                <button
                  className=" bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-lg font-semibold w-11  cursor-pointer h-7 text-white"
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

            {/* <div className="">
              <DropDown />
            </div> */}
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
                
              </div>
            </div>
            <div>
              {/* <img src={thali} className="hidden md:flex h-80 w-80" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
