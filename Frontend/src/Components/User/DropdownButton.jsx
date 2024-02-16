import { useState } from "react";

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleItemClick = (itemName) => {
      // Handle item click here, for example, navigate to a different page or perform an action
      console.log(`Clicked on ${itemName}`);
      // For demonstration purposes, let's close the dropdown when an item is clicked
      setIsOpen(false);
    };
  
    return (
      <div className="max-w-lg mx-auto">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={toggleDropdown}
        >
          Dropdown button{' '}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
  
        {/* Dropdown menu */}
        <div className={`bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${isOpen ? 'block' : 'hidden'}`} id="dropdown">
          <div className="px-4 py-3">
            <span className="block text-sm">Bonnie Green</span>
            <span className="block text-sm font-medium text-gray-900 truncate">name@flowbite.com</span>
          </div>
          <ul className="py-1" aria-labelledby="dropdown">
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={() => handleItemClick('Dashboard')}>Dashboard</button>
            </li>
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={() => handleItemClick('Settings')}>Settings</button>
            </li>
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={() => handleItemClick('Earnings')}>Earnings</button>
            </li>
            <li>
              <button className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onClick={() => handleItemClick('Sign out')}>Sign out</button>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default DropdownButton;