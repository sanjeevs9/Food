import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NETWORK } from "../../../network";
import { useRef,useEffect } from "react";
import { sellerCheckBox } from "../../atoms/alert";
import { useRecoilState } from "recoil";

export default function Otp() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const check=useRecoilState(sellerCheckBox)

  const handleInputChange = (index, value) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = value;
    setVerificationCode(updatedVerificationCode);
  };
  useEffect(() => {
    const index = verificationCode.findIndex((code) => code === "");
    if (index !== -1 && inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  }, [verificationCode]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleSubmit = () => {
    const code = verificationCode.join("");
    console.log("Verifying code:", code);

    axios
      .post(`${NETWORK}/food/seller/verify`, {
        otp: code,
      })
      .then((res) => {
        if(check){
          localStorage.setItem("token", `Bearer ${res.data.token}`);  
        }else{
          sessionStorage.setItem("token",`Bearer ${res.data.token}`)
        }
        alert(res.data.message);
        navigate("/vendor");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Phone Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your Phone Number </p>
            </div>
          </div>

          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {verificationCode.map((digit, index) => (
                <div className="w-16 h-16" key={index}>
                  <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && digit === "" && inputRefs.current[index - 1]) {
                      inputRefs.current[index - 1].focus();
                    }
                  }}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    maxLength={1}
                    value={digit}
                    onInput={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  onClick={handleSubmit}
                >
                  Verify Number
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>{" "}
                <span
                  className="flex flex-row items-center text-blue-600 cursor-pointer"
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  Go back
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
