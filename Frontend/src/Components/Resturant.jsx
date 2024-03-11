import plate from "../img/Plate.svg";

export default function Resturant({ name, description, imgUrl, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer transform motion-safe:hover:scale-105"
      >
        <div className="flex flex-col h-60 w-52 ">
          <div
            className="h-44 rounded-xl w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${imgUrl ? imgUrl : plate}')` }}
          ></div>

          <div className="h-fit flex flex-col pl-2 ">
            <div className="flex flex-row gap-2 ">
              <div className=" font-bold text-xl">{name}</div>
              <div className="pt-1 flex gap-1">
                <div
                  className="h-4 w-4 bg-cover bg-center rounded-full"
                  style={{
                    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokvLLBOHLxXQqxAnbEb5VEQKK8rzhSNwXrT-Tgkur0eYfaqPfr_U1ErWRGtwT1e-SnLE&usqp=CAU")`,
                  }}
                ></div>
                <div className="transform -translate-y-1">
                  <span className="font-semibold text-sm ">4.3</span>
                </div>
              </div>
            </div>
            <div className="font-semibold text-xs">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
