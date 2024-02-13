import Carousel from "../Carousel";
import FoodComponent from "../FoodComponent";

export default function Dashboard(){
    return(
        <>
        <div className="flex flex-col p-3 gap-7 bg-[#fff7ed] min-h-screen">
            <Carousel/>
            <div className="grid items-center gap-5  justify-center sm:grid-cols-2 sm:justify-between  md:grid-cols-3   lg:grid-cols-4 "> 
            <div className="flex justify-center items-center">
            <FoodComponent name="Samosa" price="20" available={true} imageUrl={'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
            </div>
            <div className="flex justify-center items-center">
           
            <FoodComponent name="Chai" price="25" available={true} imageUrl={'https://images.unsplash.com/photo-1630748662359-40a2105640c7?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </div>
         
          <div className="flex justify-center items-center">
            <FoodComponent name="chowmein" price="99/-" available={false}  imageUrl={'https://images.unsplash.com/photo-1634864572872-a01c21e388d4?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}/>
            </div>
            </div>
           
        </div>
        </>
    )
}