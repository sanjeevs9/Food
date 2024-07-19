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
import Demo from "./DenoPortal";

export default function Front() {
  const [drop, setdrop] = useState(false);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [demo,setDemo]=useState(false);

  function handleDemo(){
    setDemo(!demo)
  }

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

        <div className=" h-[85vh] sm:h-[85vh]  bg-[#fff7ed] rounded-xl  relative">
          
        

          <div className="flex p-12 justify-between">
            <img src={logo} className="h-10 w-10"></img>
            <ul className=" sm:flex gap-10 pr-2 ">
            <li>
                <button
                  className=" bg-[#FC5664] flex justify-center   hover:bg-red-500 active:bg-red-600 rounded-lg font-semibold w-32  cursor-pointer h-9 sm:h-8 items-center text-white"
                  onClick={() => {
                    setDemo(!demo);
                  }}
                >
                  <div className="flex flex-row ">
                  Join as Guest
                  </div>
                  
                </button>
                {demo && (
                  <div className="absolute -mx-20 mt-1">
                    <Demo />
                  </div>
                )}
              </li>
              <li className="cursor-pointer hidden sm:flex pt-1" onClick={handle}>
                Dashboard
              </li>
              <li
                className="cursor-pointer hidden sm:flex pt-1"
                onClick={() => {
                  navigate("/help");
                }}
              >
                Contact Us
              </li>
              {/* <li className=>Join</li> */}
              <li className="pt-2 sm:pt-0 flex justify-end sm:block">
                <button
                  className=" bg-[#FC5664] hover:bg-red-500 active:bg-red-600 rounded-lg font-semibold w-14   cursor-pointer h-8 text-white"
                  onClick={() => {
                    setdrop(!drop);
                  }}
                >
                  Login
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
        <div className=" flex justify-center items-center">
              <div className="flex items-center gap-1 cursor-pointer absolute bottom-28 sm:bottom-24" onClick={()=>{window.open("https://github.com/sanjeevs9/Food")}}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>
                </div>
                <div className="text-lg font-semibold">
                  Github
                </div>

              </div>
              
        </div>
      </div>
    </>
  );
}
