import plate from "../img/Plate.svg";

export default function Resturant({ name, description, imgUrl, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer transform motion-safe:hover:scale-105 rounded-xl  "
      >
        <div className="flex flex-col  w-36   h-auto sm:w-64  md:w-60 lg:w-52  2xl:w-72   ">
          <div
            className="h-28 w-36 sm:h-44 md:h-48 lg:h-40 xl:h-52 rounded-xl  sm:w-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url('${imgUrl ? imgUrl : plate}')` }}
          ></div>

          <div className="h-fit flex flex-col pl-2 break-words">
            <div className="flex flex-row gap-2 ">
              <div className="font-sans font-semibold  text-lg sm:text-xl xl:text-[24px]  leading-tight pt-[1px]  truncate h-7 overflow-hidden ">{name}</div>
              <div className="pt-[4px] flex gap-1  h-fit -translate-y-[1px] sm:translate-y-[3px] leading-none">
                <div
                  className="h-3 w-3 bg-cover bg-center rounded-full translate-y-[3px]"
                  style={{
                    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokvLLBOHLxXQqxAnbEb5VEQKK8rzhSNwXrT-Tgkur0eYfaqPfr_U1ErWRGtwT1e-SnLE&usqp=CAU")`,
                  }}
                ></div>
                <div className="-translate-y-[1px]  ">
                  <span className="font-semibold text-[12px] sm:text-sm  ">4.3</span>
                </div>
              </div>
            </div>
            <div className="font-semibold italic text-[10px] sm:text-xs max-w-full overflow-hidden sm:pt-[5px]">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
