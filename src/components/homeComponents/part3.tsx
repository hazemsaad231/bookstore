// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/counter";
// import { ToastContainer } from "react-toastify";
// import { BOOKS_API } from "../Api/api";
// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// function New() {

//   const [books, setBooks] = useState<any>([]);
//   const dispatch = useDispatch();

//   const handleAddToCart = (book: any) => {
//     dispatch(addToCart(book));
//   };

//   const role = localStorage.getItem("role");

//   const getData = async () => {
//     try {
//       const response = await axios.get(BOOKS_API);
//       const Book = response.data.filter((book: any) => book.new === "true");
//       setBooks(Book);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const islogin = localStorage.getItem("token");

//   return (
//     <div className="py-12 bg-secondary">
//       <ToastContainer />
//       <div className="slider flex flex-col gap-4 justify-center items-center">
//         <div className="text-center">
//           <h2 className="text-lg text-gray-500 font-bold tracking-wider">
//             SOME QUALITY ITEMS
//           </h2>
//           <div className="flex items-center gap-2">
//             <hr
//               style={{ width: "200px", border: "1px solid #ff6347" }}
//               className="hidden sm:hidden md:block lg:block xl:block"
//             />
//             <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-indigo-900 m-4">
//               New Release Books
//             </h1>
//             <hr
//               style={{ width: "200px", border: "1px solid #ff6347" }}
//               className="hidden sm:hidden md:block lg:block xl:block"
//             />
//           </div>
//         </div>

//         {/* Swiper بدل Slider */}
//         <div className="w-full">
//           <Swiper
//             modules={[Pagination]}
//             pagination={{ clickable: true }}
//             spaceBetween={20}
//             loop
//             breakpoints={{
//               1536: { slidesPerView: 5 },
//               1024: { slidesPerView: 4 },
//               768: { slidesPerView: 3 },
//               480: { slidesPerView: 1 },
//             }}
//           >
//             {books.map((book: any, index: number) => (
//               <SwiperSlide key={index}>
//                 <div className="text-center">
//                   <div className="relative rounded-xl w-60 m-auto transform hover:scale-105 transition duration-300 group">
//                     <img
//                       src={book.image}
//                       alt="img"
//                       className="h-80 w-full m-auto object-center rounded-xl"
//                       loading="lazy"
//                     />
//                     {/* زرارين يظهران عند hover */}
//                     {islogin&&(
                      
                    
//                     <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       {role === "Customer" ? (
//                         <div className="flex flex-col gap-2 justify-center items-center w-full">
//                           <button className="bg-primary text-white w-full py-3">
//                             <Link
//                               to={`/details/${book.id}`}
//                               className="text-white"
//                             >
//                               View Details
//                             </Link>
//                           </button>
//                           <button className="bg-indigo-800 text-white w-full py-3">
//                             <FaShoppingCart
//                               size={25}
//                               onClick={() => handleAddToCart(book)}
//                               className="m-auto"
//                             />
//                           </button>
//                         </div>
//                       ) : (
//                         <button className="bg-primary text-white w-full py-2">
//                           <Link
//                             to={`/addBook/${book.id}`}
//                             className="text-white"
//                           >
//                             Update
//                           </Link>
//                         </button>
//                       )}
//                     </div>
//                     )}
//                   </div>
//                   <h1 className="mt-4 text-lg font-semibold">{book.name}</h1>
//                   <h1 className="text-gray-500">{book.author}</h1>
//                   <h1 className="text-indigo-800 font-bold mb-4">
//                     EGP {book.price}
//                   </h1>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default New;
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";
import { BOOKS_API } from "../Api/api";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaShoppingCart, FaStar, FaEye, FaBookOpen } from "react-icons/fa";


function New() {

  const [books, setBooks] = useState<any>([]);
  const dispatch = useDispatch();

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  const role = localStorage.getItem("role");

  const getData = async () => {
    try {
      const response = await axios.get(BOOKS_API);
      const Book = response.data.filter((book: any) => book.new === "true");
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
    <div className="py-8 relative overflow-hidden" style={{ backgroundColor: 'rgb(250, 245, 239)' }}>
      <ToastContainer />
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-2 justify-center items-center mb-6 text-center">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-orange-500 uppercase bg-orange-50 px-4 py-1 rounded-full border border-orange-100 mb-2">
            Fresh From The Press
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            New Release <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Books</span>
          </h1>
          <p className="text-slate-500 max-w-lg mt-4 text-sm md:text-base leading-relaxed">
            Discover the latest additions to our collection. From gripping thrillers to heartwarming memoirs, find your next great read here.
          </p>
        </div>

        {/* Swiper Container */}
        <div className="w-full relative px-4 md:px-12">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              bulletActiveClass: '!bg-indigo-600'
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 5, spaceBetween: 28 },
            }}
            className="!pb-16"
          >
            {books.map((book: any, index: number) => (
              <SwiperSlide key={index} className="pt-4 pb-4">
                <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out border border-slate-100 overflow-hidden h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-indigo-900 shadow-sm z-10">
                      NEW
                    </div>

                    {/* Quick Actions Overlay (Login) */}
                    {islogin && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                        {role === "Customer" ? (
                          <>
                            <button 
                              onClick={() => handleAddToCart(book)}
                              className="w-full bg-white text-slate-900 hover:bg-indigo-50 font-semibold py-2.5 px-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <FaShoppingCart size={16} />
                              <span>Add to Cart</span>
                            </button>
                            <Link to={`/details/${book.id}`} className="w-full">
                              <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2.5 px-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                <FaEye size={16} />
                                <span>Details</span>
                              </button>
                            </Link>
                          </>
                        ) : (
                          <Link to={`/addBook/${book.id}`} className="w-full">
                            <button className="w-full bg-orange-500 text-white hover:bg-orange-600 font-semibold py-3 px-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                              <FaBookOpen size={18} />
                              <span>Update Book</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-xs ${i < Math.floor(book.rating || 4.5) ? 'text-yellow-400' : 'text-slate-200'}`} />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">({book.rating || 4.5})</span>
                    </div>
                    
                    <h3 className="text-base font-serif font-bold text-slate-800 leading-tight mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={book.name}>
                      {book.name}
                    </h3>
                    
                    <p className="text-sm text-slate-500 mb-3 line-clamp-1" title={book.author}>
                      by {book.author}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium uppercase">Price</span>
                        <span className="text-lg font-bold text-indigo-900">EGP {book.price}</span>
                      </div>
                      
                      {!islogin && (
                        <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors">
                          <FaShoppingCart size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons (Hidden on mobile) */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-slate-700 hover:text-indigo-600 hover:scale-110 cursor-pointer transition-all border border-slate-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg text-slate-700 hover:text-indigo-600 hover:scale-110 cursor-pointer transition-all border border-slate-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

      </div>
    </div>
  );
}

export default New;