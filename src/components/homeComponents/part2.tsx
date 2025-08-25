import { GoArrowLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { data } from "./data";

function Category() {
  return (
    <div className="py-4">

      
      <div className="m-4">
        <div className="flex gap-2">
          <GoArrowLeft size={25} color="#ff6347" />
          <h1 className="text-primary font-bold text-2xl">Categories</h1>
        </div>
        <div>
          <h1 className="text-[1.6rem] sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-indigo-900">
            Explore our Top Categories
          </h1>
        </div>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        spaceBetween={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
       
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col p-4 m-auto">
              <img
                src={item.img}
                alt={item.title}
                className="h-64 w-64 rounded-xl m-auto"
                loading="lazy"
              />
              <h1 className="text-center text-indigo-600">{item.title}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Category;
