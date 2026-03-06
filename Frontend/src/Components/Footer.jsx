import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="border-t border-stone-200 mt-8">
      <div className="w-full py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="font-['Outfit'] text-xs sm:text-sm text-stone-400">
          &copy; 2024 SnackSync. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
          {[
            { label: "About", path: "/about" },
            { label: "Privacy", path: "/privacy-policy" },
            { label: "Licensing", path: "/licensing" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item.path)}
                className="font-['Outfit'] text-xs sm:text-sm text-stone-400 hover:text-stone-600 transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
