import plate from "../img/Plate.svg";

export default function Resturant({ name, description, imgUrl, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer transform motion-safe:hover:scale-105 rounded-xl shadow-lg border-[1px] sm:shadow-none  sm:border-0 "
      >
        <div className="flex flex-row sm:flex-col  w-72   h-auto sm:w-52  ">
          <div
            className="h-36 sm:h-44 rounded-l-xl sm:rounded-xl w-36 sm:w-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url('${imgUrl ? imgUrl : plate}')` }}
          ></div>

          <div className="h-fit flex flex-col pl-2 break-words">
            <div className="flex flex-col sm:flex-row sm:gap-2 ">
              <div className="font-sans font-semibold  text-lg sm:text-xl overflow-hidden">{name}</div>
              <div className="pt-[10px] flex gap-1  h-fit -translate-y-2 sm:translate-y-0">
                <div
                  className="h-3 w-3 bg-cover bg-center rounded-full"
                  style={{
                    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokvLLBOHLxXQqxAnbEb5VEQKK8rzhSNwXrT-Tgkur0eYfaqPfr_U1ErWRGtwT1e-SnLE&usqp=CAU")`,
                  }}
                ></div>
                <div className="transform  -translate-y-2">
                  <span className="font-semibold text-[12px] sm:text-sm  ">4.3</span>
                </div>
              </div>
            </div>
            <div className="font-semibold italic text-[10px] sm:text-xs max-w-full overflow-hidden">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
