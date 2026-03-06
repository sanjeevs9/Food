import Sidebar from "./Sidebar";
import { DetailsContext } from "./SellerDetailsApi";
import { useContext, useState } from "react";
import Edit from "./EditForm";
import { sidebar } from "../../atoms/alert";
import { useRecoilState } from "recoil";

export default function Saccount() {
  const details=useContext(DetailsContext);
  const[isOpen,setOpen]=useState(false);
  const[type,setType]=useState();
  const[bar,setbar]=useRecoilState(sidebar);

  function handle1(){
    setbar(!bar);
  }

  function handle(id){
    setType(id);
    setOpen(!isOpen);
  }

  const stats = [
    { label: "Total Revenue", value: `\u20B9${details.revenue}`, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )},
    { label: "Total Menus", value: details.totalMenu, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    )},
    { label: "Total Orders", value: details.totalOrder, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    )},
  ];

  const infoCards = [
    { label: "Name", value: details.name, id: "name" },
    { label: "Description", value: details.description, id: "description" },
    { label: "Image", value: details.image, id: "image", isImage: true },
    { label: "Phone", value: details.phone, id: "phone" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <Sidebar />
      {isOpen ? <Edit type={type} fn={()=>{setOpen(!open)}} /> : ""}

      <div className="flex-1 sm:ml-60">
        {/* Mobile menu toggle */}
        <div className="flex sm:hidden p-4">
          <button
            onClick={handle1}
            className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-8">
          <h1 className="font-['Fraunces'] text-2xl font-semibold text-stone-900 mb-6">Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border border-stone-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
                    {stat.icon}
                  </div>
                </div>
                <p className="font-['Fraunces'] text-2xl font-semibold text-stone-900">{stat.value}</p>
                <p className="font-['Outfit'] text-sm text-stone-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cafe Info */}
          <h2 className="font-['Fraunces'] text-xl font-semibold text-stone-900 mb-4">Cafe Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map((card) => (
              <div key={card.id} className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="font-['Outfit'] text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{card.label}</p>
                {card.isImage ? (
                  <img
                    src={card.value}
                    alt="Cafe"
                    className="w-full h-24 object-cover rounded-xl bg-stone-100"
                  />
                ) : (
                  <p className="font-['Outfit'] text-sm text-stone-700 mb-3 line-clamp-2">{card.value}</p>
                )}
                <button
                  className="mt-3 px-3 py-1.5 border border-stone-200 rounded-lg font-['Outfit'] text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                  id={card.id}
                  onClick={(e)=>{handle(e.target.id)}}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
