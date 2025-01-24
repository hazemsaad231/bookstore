import Slider from "react-slick";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

function bookSlide() {

  const [Data, setData] = useState([]);

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


  const getData = async () => {
    try {
      let response = await axios.get("http://localhost:5000/books");
      const Book = response.data.filter((book: any) => book.profile === "yes").slice(0, 6);
      console.log(response.data);
      setData(Book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


 
  return (
    <div className="flex justify-center bg-gradient-to-l from-red-100 to-white-100 py-16">
      <div className="slider-container w-[96%] py-10 px-8 sm:px-8 md:px-4">
        <Slider {...settings}>

          {/* الشريحة الأولى */}
          {Data.map((book: any, index) => (
            
          <div key={index}>

          <div className="flex justify-center items-center space-x-0 sm:space-x-20  md:space-x-16 lg:space-x-40 xl:space-x-80"> 
              <div className="hidden sm:hidden md:block lg:block xl:block">
             <div className="flex flex-col gap-3 justify-center ">
            <h1 className="text-5xl font-semibold text-orange-500 text-center">{book.name}</h1>
            <p className="text-gray-500 w-96 p-6"> {book.description}</p>
          <button className="border border-orange-500 px-4 py-2 rounded-lg w-max m-auto text-orange-500 hover:bg-orange-300 ">Read more</button>
                
                </div>
                </div>  
          
<div className="relative shadow-lg rounded-xl transform hover:scale-105 transition duration-300 group">
  <img
    src={book.image}
    alt="book"
    className="rounded-lg h-80 w-full sm:h-52 md:h-72 lg:h-80 xl:h-96 xl:w-64 m-auto object-cover"
    loading="lazy"
  />
  {/* الوصف يظهر عند hover */}
  <div className="block sm:block md:hidden lg:hidden xl:hidden">
  <div className="absolute inset-0  flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-80 text-white text-center rounded-lg p-4">
  <h1 className="text-2xl font-bold text-orange-600 text-center relative bottom-16">{book.name}</h1>
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
  );
}

export default React.memo(bookSlide);
