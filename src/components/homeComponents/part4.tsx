// export default Feature;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BOOKS_API } from "../Api/api";
import { FaShoppingCart, FaEye, FaBookOpen } from "react-icons/fa";
// Mocking Redux for the UI demo
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axios from "axios";




function Feature() {

  const [books, setBooks] = useState<any[]>([]);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  const getData = async () => {
    try {
      const response = await axios.get(BOOKS_API);
      const Book = response.data.filter((book: any) => book.featured === "true");
      setBooks(Book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const islogin = localStorage.getItem("token");
  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-center mb-8 gap-6">
          <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-transparent to-orange-500 rounded-full opacity-70"></div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-2">
              Featured <span className="text-indigo-600">Books</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">Curated Selection</p>
          </div>
          <div className="hidden md:block w-16 h-1 bg-gradient-to-l from-transparent to-orange-500 rounded-full opacity-70"></div>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ 
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-indigo-600 !w-8 !rounded-full transition-all duration-300'
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 !pt-10 !px-4"
        >
          {books.map((book: any, index: number) => (
            <SwiperSlide key={index} className="h-full">
              <div className="group relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out border border-slate-100 overflow-visible mt-8 mb-4 mx-2">
                
                {/* Book Image with Floating Effect */}
                <div className="relative -mt-12 mx-auto w-48 h-72 shadow-lg rounded-lg overflow-hidden transform group-hover:-translate-y-4 transition-all duration-500 z-10">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Card Content */}
                <div className="pt-8 pb-8 px-6 text-center flex flex-col items-center">
                  <h3 className="text-xl font-serif font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-indigo-700 transition-colors">
                    {book.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">
                    {book.author}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl font-bold text-slate-900">EGP {book.price}</span>
                  </div>

                  {islogin && (
                    <div className="w-full space-y-3">
                       {role === "Customer" ? (
                        <div className="flex items-center justify-center gap-3 w-full">
                          <button 
                            onClick={() => handleAddToCart(book)}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-indigo-200"
                          >
                            <FaShoppingCart size={16} />
                            <span>Add</span>
                          </button>
                          
                          <Link to={`/details/${book.id}`} className="flex-1">
                             <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-medium transition-all duration-300">
                              <FaEye size={16} />
                              <span>Details</span>
                            </button>
                          </Link>
                        </div>
                       ) : (
                         <Link to={`/addBook/${book.id}`} className="block w-full">
                           <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-orange-200">
                             <FaBookOpen size={16} />
                             <span>Update Book</span>
                           </button>
                         </Link>
                       )}
                    </div>
                  )}
                </div>

                {/* Decorative Elements on Card */}
                <div className="absolute top-4 right-4 text-slate-200 opacity-50 group-hover:text-indigo-100 group-hover:scale-110 transition-all duration-500">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Feature;
