import plate from "../img/Plate.svg";

export default function Resturant({ name, description, imgUrl, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="flex flex-col">
        <div
          className="aspect-[4/3] w-full rounded-2xl bg-stone-100 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundImage: `url('${imgUrl ? imgUrl : plate}')` }}
        />
        <div className="pt-3 px-0.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-['Outfit'] font-semibold text-stone-900 text-sm sm:text-base truncate">{name}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-['Outfit'] text-xs font-medium text-stone-500">4.3</span>
            </div>
          </div>
          <p className="font-['Outfit'] text-xs text-stone-400 mt-0.5 truncate">{description}</p>
        </div>
      </div>
    </div>
  );
}
