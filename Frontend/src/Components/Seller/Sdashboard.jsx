import { useRecoilState } from "recoil";
import Sidebar from "./Sidebar";
import Table from "./Table";
import { sidebar } from "../../atoms/alert";

export default function Sdashoard() {
  const[bar,setbar]=useRecoilState(sidebar);

  function handle1(){
    setbar(!bar);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <Sidebar />
      <div className={`${!bar ? 'flex-1' : 'flex-1'} sm:ml-60`}>
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
          <h1 className="font-['Fraunces'] text-2xl font-semibold text-stone-900 mb-6">Orders</h1>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}
