import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { useRecoilValue } from "recoil";
import { sidebar } from "../../atoms/alert";
import { useEffect } from "react";

export default function Sidebar() {
  const bar=useRecoilValue(sidebar)
  const navigate = useNavigate();
 
  return (
    <>
<aside className={`${ !bar  && window.innerWidth < 640 ? 'hidden' : ''} sm:flex  sm:fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60 `}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b flex">
              <img src={logo} className="h-16 w-16"></img>
              <div className="flex pt-6">
                <h1 className="text-xl font-bold leading-none ">
                  <span className="text-yellow-700">Food2</span> You
                </h1>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
              <li>
                  <button
                    className="flex bg-white hover:bg-yellow-200 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 w-full"
                    onClick={() => {
                      navigate("/saccount");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1.25em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    My Account
                  </button>
                </li>
                <li>
                  <Link to="/vendor" >
                  <button
                    className="flex items-center hover:bg-yellow-200 rounded-xl font-bold text-sm  py-3 px-4 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    Orders
                  </button>
                  </Link>
                </li>
                <li>
                  <button
                    className="flex bg-white hover:bg-yellow-200 rounded-xl font-bold text-sm text-gray-900  py-3 px-4 w-full"
                    onClick={() => {
                      navigate("/smenu");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                    </svg>
                    Menu
                  </button>
                </li>
                
               
                <li>
                  <button
                    className="flex bg-white hover:bg-yellow-200 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 w-full"
                    onClick={() => {
                      navigate("/ssettings");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1.25em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4">
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear()
                navigate("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>{" "}
            <span className="font-bold text-sm ml-2">Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
}
