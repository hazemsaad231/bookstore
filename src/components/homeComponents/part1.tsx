import Slider from "react-slick";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import React from "react";
import data1 from "./data";

function bookSlide() {


  {/*silder*/}
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    nextArrow: <GoArrowRight size={30} color="#ff6347"/>,
    prevArrow: <GoArrowLeft size={30} color="#ff6347"/>,
  };


 
  return (
    <>
    
  
    
    <div className="flex justify-center bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF] py-12" style={{fontFamily: "sans-serif"}}>
   
       <div className="slider-container w-full">         <Slider {...settings}>

          {/* الشريحة الأولى */}
          {data1?.map((book: any, index:any) => (
            
          <div key={index}>

          <div className="flex justify-center items-center space-x-0 sm:space-x-20  md:space-x-16 lg:space-x-40 xl:space-x-80"> 
              <div className="hidden sm:hidden md:block lg:block xl:block">
             <div className="flex flex-col gap-3 justify-center ">
            <h1 className="text-5xl font-semibold text-indigo-900 text-center">{book.name}</h1>
            <p className="text-indigo-800 w-[400px] p-6"> {book.description}</p>
          <button className="border border-indigo-700 px-4 py-2 rounded-lg w-max m-auto text-indigo-500 hover:bg-indigo-500 hover:text-white transition duration-300 ">Read more</button>
                
                </div>
                </div>  
          
<div className="relative rounded-xl transform hover:scale-105 transition duration-300 m-6 group">
  <img
    src={book.image}
    alt="book"
    className="rounded-lg h-80 w-full sm:h-52 md:h-72 lg:h-80 xl:h-[420px] xl:w-64 m-auto object-center"
    loading="lazy"
  />
  {/* الوصف يظهر عند hover */}
  <div className="block sm:block md:hidden lg:hidden xl:hidden">
  <div className="absolute inset-0  flex flex-col justify-center items-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
  {/* <h1 className="text-2xl font-bold text-orange-600 text-center relative bottom-16">{book.name}</h1> */}
  {/* <p className="text-white text-sm text-center w-32"> {book.description} </p> */}
  </div>
  </div>
  </div>

          </div>
            

          </div>

))}



        </Slider>
      </div>
    </div>


  </>
  );
}

export default React.memo(bookSlide);
