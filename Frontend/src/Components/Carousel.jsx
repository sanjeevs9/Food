import { useEffect, useState } from "react";
import pic1 from "../img/carousel/1.jpg";
import pic2 from "../img/carousel/2.jpg";
import pic3 from "../img/carousel/3.jpg";
import pic4 from "../img/carousel/4.jpg";
import pic5 from "../img/carousel/5.jpg";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [pic1, pic2, pic3, pic4, pic5];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1));
  };

  useEffect(()=>{
    let SI;
    function AutoScroll(){
      SI= setInterval(()=>{handleNextSlide()},3000)
    }
    AutoScroll();
    return()=>{clearInterval(SI)}
  },[])

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-40 sm:h-56 overflow-hidden rounded-2xl md:h-80 xl:h-[28rem] bg-stone-100">
        {images.map((img, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? "" : "hidden"
            } duration-500 ease-in-out`}
            data-carousel-item
          >
            <img
              src={img}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 left-3 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        onClick={handlePrevSlide}
      >
        <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 right-3 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        onClick={handleNextSlide}
      >
        <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
