import { useState } from "react";
import pic1 from '../../public/carousel/1.jpg';
import pic2 from '../../public/carousel/2.jpg';
import pic3 from '../../public/carousel/3.jpg';
import pic4 from '../../public/carousel/4.jpg';
import pic5 from '../../public/carousel/5.jpg';
import Search from "./User/Search";

export default function Carousel(){
        const [currentSlide, setCurrentSlide] = useState(0);
        const images = [pic1, pic2, pic3, pic4, pic5];

const handlePrevSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1));
};

const handleNextSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1));
};

const handleSlideTo = (index) => {
  setCurrentSlide(index);
};

return (
    <>
    
  <div id="default-carousel" className="relative w-full" data-carousel="slide">
    {/* Carousel wrapper */}
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
    
  {[1, 2, 3, 4, 5].map((item, index) => (
    <div key={index} className={`${index === currentSlide ? '' : 'hidden'} duration-700 ease-in-out`} data-carousel-item>
      <img src={images[index]} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Slide ${item}`} />
      
    </div>
    
  ))}
  
      </div> 
     
       {/* Slider indicators */}
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      {[...Array(5).keys()].map((index) => (
        <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`} aria-current={index === currentSlide ? 'true' : 'false'} aria-label={`Slide ${index + 1}`} onClick={() => handleSlideTo(index)}></button>
      ))}
    </div>
   
  
    {/* Slider controls */}
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevSlide}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
        <span className="sr-only">Previous</span>
      </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNextSlide}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="sr-only">Next</span>
      </span>
    </button>
  </div>
        </>
    )
}