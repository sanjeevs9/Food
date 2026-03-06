
import { useRecoilState } from "recoil";
import { filterState } from "../../atoms/filterState";


export default function Search({ className }) {
const[filter,setfilter]=useRecoilState(filterState);

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-2.5 ps-10 pe-4 font-['Outfit'] text-sm text-stone-900 bg-stone-100 border border-stone-200 rounded-xl placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition-colors"
          placeholder="Search restaurants..."
          onChange={(e)=>{setfilter(e.target.value)}}
        />
      </div>
    </>
  );
}
