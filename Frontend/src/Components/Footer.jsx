import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-white rounded-lg shadow m-4 ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-[9px] sm:text-sm text-gray-500 sm:text-center ">
          © 2023{" "}
          <a href="" className="hover:underline">
            Food2You™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-[12px] sm:text-sm font-medium text-gray-500  sm:mt-0">
          <li>
            <button
              onClick={() => handleNavigation("/about")}
              className="hover:underline me-4 md:me-6"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/privacy-policy")}
              className="hover:underline me-4 md:me-6"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/licensing")}
              className="hover:underline me-4 md:me-6"
            >
              Licensing
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/contact")}
              className="hover:underline"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
