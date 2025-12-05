// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination} from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import data1 from "./data";
// import { Link } from "react-router-dom";

// function BookSlide() {

//   const islogin = localStorage.getItem("token");


//   return (
//     <div className="flex justify-center bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF] py-20 md:py-12">
//       <div className="slider-container w-full">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           pagination={{ clickable: true}}
//           loop
//           slidesPerView={1}

//         >
//           {data1?.map((book: any) => (
//             <SwiperSlide key={book.id}>
//               <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-12 lg:gap-24 px-6">
//                 {/* Text Section */}
//                 <div className="hidden md:flex flex-col gap-4 justify-center items-center md:items-start text-center md:text-left max-w-lg">
//                   <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo-900">
//                     {book.name}
//                   </h2>
//                   <p className="text-indigo-800 w-80 sm:w-96 md:w-3/5 text-sm sm:text-base">
//                     {book.description}
//                   </p>
//                   {islogin && (
//                   <button className="bg-indigo-700 text-white px-2 py-2 rounded-lg w-max  transition-colors hover:scale-105 duration-700">
//                     <Link to={`/book`}>
//                      view more
//                     </Link>
//                   </button>
//                   )}
//                 </div>

//  {/* Image Section */}
//                 <div className="relative transform transition-transform duration-300 md:hover:scale-105 group w-72
//                 p-2 pt-4 bg-white shadow-xl rounded-xl hover:transform hover:translate-y-5">
//      {/* Mobile Text Section */}
//                   <div className="md:hidden flex flex-col gap-3 justify-center items-center text-center">
//                     <h2 className="text-2xl sm:text-2xl font-semibold text-indigo-900 pb-2">
//                       {book.name}
//                     </h2>
//                 </div>


//                   <img
//                     src={book.image}
//                     alt={book.name}
//                     className="rounded-xl h-auto w-full object-contain"
//                     loading="eager"
//                   />

             
//                 </div>


//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default BookSlide;
// export default BookSlide;
 import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import data from "./data";
// import { Link } from "wouter";
import { Link } from "react-router-dom";

import { ArrowRight, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";

function BookSlide() {
  // Mock login state for demonstration
  const islogin = true; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] overflow-hidden relative">
      {/* Artistic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-200/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-pink-200/20 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-12">
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            navigation={{
              nextEl: ".custom-next-btn",
              prevEl: ".custom-prev-btn",
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-indigo-300 !w-3 !h-3 !opacity-50',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-indigo-600 !w-8 !rounded-full !opacity-100 transition-all duration-300'
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full !overflow-visible"
          >
            {data?.map((book : any) => (
              <SwiperSlide key={book.id}>
                <div className=" p-8 md:p-12 lg:p-16 overflow-hidden relative">
                  
                  {/* Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Text Content - Left Side */}
                    <div className="md:col-span-7 flex flex-col gap-6 md:pr-8 order-2 md:order-1 text-center md:text-left">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 font-medium tracking-wider text-sm uppercase">
                          <span className="bg-indigo-100 px-3 py-1 rounded-full">Bestseller</span>
                          <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-indigo-600" /> 4.9</span>
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-indigo-900 leading-[1.1]">
                          {book.name}
                        </h2>
                        
                        <p className="text-lg text-slate-600 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                          {book.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                          {islogin && (
                            <Link to={`/book`}>
                              <button className="group bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30 hover:-translate-y-1 cursor-pointer">
                                View More
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                          )}
                          <span className="text-2xl font-serif font-bold text-indigo-600 ml-4">{book.price}</span>
                        </div>
                      </motion.div>
                      
                      <div className="pt-8 border-t border-slate-200/60 flex justify-center md:justify-start gap-8 text-slate-500 text-sm">
                         <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Hardcover</span>
                         </div>
                      </div>
                    </div>

                    {/* Image Content - Right Side */}
                    <div className="md:col-span-5 flex justify-center order-1 md:order-2 relative">
                       <div className="relative w-64 md:w-80 lg:w-96 aspect-[2/3] perspective-1000">
                          {/* 3D Book Effect */}
                          <motion.div 
                            whileHover={{ rotateY: -10, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-full h-full rounded-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-y-6"
                          >
                             <img
                              src={book.image}
                              alt={book.name}
                              className="w-full h-full object-cover"
                              loading="eager"
                            />
                            {/* Spine highlight */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-[2px] w-[2px] h-full bg-white/30 z-10" />
                          </motion.div>
                       </div>
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Buttons */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-20 gap-4 hidden md:flex">
              <button className="custom-prev-btn w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-pointer shadow-lg">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="custom-next-btn w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-pointer shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BookSlide;