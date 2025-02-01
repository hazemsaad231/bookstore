import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";


function Feature() {
  const [books, setBooks] = useState([]); // تهيئة books بمصفوفة فارغة

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };




  const getData = async () => {
    try {
      let response = await axios.get("https://backend-production-65d5.up.railway.app/books");
      const Book = response.data.filter((book: any) => book.favourite === "yes").slice(0, 6);
      console.log(response.data);
      setBooks(Book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center py-12">
      <div className="w-full mb-4">
        <Slider {...settings}>
          {books.map((book: any, index) => (
            <div key={index}>
                <div className="flex justify-between sm:justify-between md:justify-around lg:justify-around xl:justify-around m-5 gap-8">
                    <div className="p-4 bg-white shadow-lg rounded-lg"><img src={book.image} alt={book.name} className="rounded-xl m-auto h-60 w-60 sm:h-60 md:h-72 lg:h-80 xl:h-96 object-center" loading="lazy" /></div>
                    <div className="text-center gap-3 flex flex-col justify-center items-center text-md sm:text-md md:text-lg lg:text-xl xl:text-xl" >
                        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-indigo-800 font-semibold">Featured Books</h1>
                        <h1 className="text-lg font-semibold text-gray-400">{book.author}</h1>
                        <h1 className="text-md sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">{book.name}</h1>
              <h1 className="text-indigo-500 text-lg font-bold">${book.price}</h1>
              <div className="border border-indigo-800 py-2 px-2 text-indigo-800 rounded-lg w-max hover:bg-indigo-100 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg"><Link to='/home/book'>View More</Link></div>
              
              </div>
              
                </div>
             
            </div>
          ))}
        </Slider>
      </div>
      
    </div>
  );  
}

export default Feature;
