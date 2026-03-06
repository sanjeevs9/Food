import Sidebar from "./Sidebar";
import image from "../../img/settings.svg";
import { useRecoilState } from "recoil";
import { sidebar } from "../../atoms/alert";

export default function Ssettings() {
  const[bar,setbar]=useRecoilState(sidebar);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <Sidebar />
      <div className="flex-1 sm:ml-60">
        <div className="flex sm:hidden p-4">
          <button
            onClick={() => setbar(!bar)}
            className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="p-4 sm:p-8">
          <h1 className="font-['Fraunces'] text-2xl font-semibold text-stone-900 mb-6">Settings</h1>
          <div className="bg-white border border-stone-200 rounded-2xl flex justify-center items-center p-12">
            <img src={image} className="max-w-md w-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
