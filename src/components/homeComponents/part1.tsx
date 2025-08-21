import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import data1 from "./data";

function BookSlide() {
  return (
    <div className="flex justify-center bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF] py-28 sm:py-24 md:py-20 lg:py-12 xl:py-12">
      <div className="slider-container w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true}}
          loop={true}
          speed={500}
          slidesPerView={1}
        >
          {data1?.map((book: any, index: any) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center space-x-0 sm:space-x-20 md:space-x-16 lg:space-x-40 xl:space-x-80">
                <div className="hidden sm:hidden md:block lg:block xl:block">
                  <div className="flex flex-col gap-3 justify-center">
                    <h1 className="text-5xl font-semibold text-indigo-900 text-center">
                      {book.name}
                    </h1>
                    <p className="text-indigo-800 w-[400px] p-6">
                      {book.description}
                    </p>
                    <button className="border border-indigo-700 px-4 py-2 rounded-lg w-max m-auto text-indigo-500 hover:bg-indigo-500 hover:text-white transition duration-300">
                      Read more
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl transform hover:scale-105 transition duration-300 m-6 group">
                  <img
                    src={book.image}
                    alt="book"
                    className="rounded-lg h-96 w-72 m-auto object-center"
                    loading="eager"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
    
        </Swiper>
      </div>
    </div>
  );
}

export default BookSlide ;
