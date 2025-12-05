// import { GoArrowLeft } from "react-icons/go";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import { data } from "./data";

// function Category() {
//   return (
//     <div className="py-4">

      
//       <div className="m-4">
//         <div className="flex gap-2">
//           <GoArrowLeft size={25} color="#ff6347" />
//           <h1 className="text-primary font-bold text-2xl">Categories</h1>
//         </div>
//         <div>
//           <h1 className="text-[1.6rem] sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-indigo-900">
//             Explore our Top Categories
//           </h1>
//         </div>
//       </div>

//       <Swiper
//         modules={[Pagination]}
//         pagination={{ clickable: true }}
//         loop
//         spaceBetween={2}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//           },
//           768: {
//             slidesPerView: 3,
//           },
//           1024: {
//             slidesPerView: 4,
//           },
//         }}
       
//       >
//         {data.map((item, index) => (
//           <SwiperSlide key={index}>
//             <div className="flex flex-col p-4 m-auto">
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="h-64 w-64 rounded-xl m-auto"
//                 loading="lazy"
//               />
//               <h1 className="text-center text-indigo-600">{item.title}</h1>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default Category;

// export default Category;
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { data } from "./data";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="py-8 md:py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-transparent via-indigo-50/50 to-transparent pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-indigo-600 font-medium uppercase tracking-wider text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Discover</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-indigo-900 leading-tight"
            >
              Explore Top Categories
            </motion.h1>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <Link to="/book">View All Categories</Link>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            480: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="!pb-16"
        >
          {data.map((item : any, index : number) => (
            <SwiperSlide key={index} className="h-auto">
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-indigo-300 text-xs font-medium uppercase tracking-wider mb-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {item.count}
                  </span>
                  <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="h-1 w-12 bg-indigo-500 rounded-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 delay-100" />
                </div>
                
                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Category;
