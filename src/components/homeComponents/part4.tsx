import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { BOOKS_API } from "../Api/api";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";


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


  const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  const handleAddToCart = (book: any) => {
    console.log(book)
    dispatch(addToCart(book));

  }

  const getData = async () => {
    try {
      const response = await axios.get(BOOKS_API);
      const Book = response.data.filter((book: any) => book.featured === 'true')
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
    <div className="flex flex-col items-center py-10">
      <div className="w-full mb-2">
      <h1 className="border-b-2 border-l-2 rounded-full border-indigo-900 w-max m-auto px-5 text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-indigo-900 mb-8 text-center">Featured Books</h1>

        <Slider {...settings}>
          {books.map((book: any, index) => (
            <div key={index}>
                <div className="flex justify-between sm:justify-between md:justify-around lg:justify-around xl:justify-around m-4 gap-4">
                    <div className="text-center gap-y-3 flex flex-col justify-center items-center text-md sm:text-md md:text-lg lg:text-xl xl:text-xl" >
                    <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">{book.name}</h1>
                        <h1 className="text-lg font-semibold text-gray-400">{book.author}</h1>
              <h1 className="text-indigo-500 text-lg font-bold">${book.price}</h1>
              <div className="border border-indigo-800 py-2 px-2 text-indigo-800 rounded-lg w-max hover:bg-indigo-100 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg"><Link to='/home/book'>View More</Link></div>

              </div>
              <div className=" relative inset-0 p-2 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-300">
                <img src={book.image} alt={book.name} className="rounded-xl m-auto h-80 w-60 object-center"  loading="lazy"/>
                {/* زرارين يظهران عند hover */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 hover:opacity-100 duration-500">
                                { role === 'Customer' ?
                                <div className="flex flex-col gap-2 justify-center items-center w-full">
                            <button className="bg-primary text-white w-1/2 py-3">
                              <Link to={`/home/details/${book.id}`} className="text-white">View Details</Link> </button>
                               <button className="bg-indigo-800 text-white w-1/2  py-3">
                              <FaShoppingCart size={25} onClick={() => handleAddToCart(book)} className="m-auto" /></button>
                                </div> : null}
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

export default Feature;
