import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import data1 from "./data";
import { Link } from "react-router-dom";

function BookSlide() {

  const islogin = localStorage.getItem("token");
  return (
    <div className="flex justify-center bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF] py-28 md:py-12">
      <div className="slider-container w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true}}
          loop
          slidesPerView={1}

        >
          {data1?.map((book: any) => (
            <SwiperSlide key={book.id}>
              <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-12 lg:gap-24 px-6">
                {/* Text Section */}
                <div className="hidden md:flex flex-col gap-4 justify-center items-center md:items-start text-center md:text-left max-w-lg">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo-900">
                    {book.name}
                  </h2>
                  <p className="text-indigo-800 w-80 sm:w-96 md:w-3/5 text-sm sm:text-base">
                    {book.description}
                  </p>
                  {islogin && (
                  <button className="bg-indigo-700 text-white px-2 py-2 rounded-lg w-max  transition-colors hover:scale-105 duration-700">
                    <Link to={`/book`}>
                     view more
                    </Link>
                  </button>
                  )}
                </div>

 {/* Image Section */}
                <div className="relative rounded-xl transform transition-transform duration-300 md:hover:scale-105 group w-72
                p-3 bg-white shadow-lg">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="rounded-lg h-auto w-full object-contain"
                    loading="eager"
                  />

                  {/* Mobile Text Section */}
                  <div className="md:hidden flex flex-col gap-3 justify-center items-center text-center mt-4">
                    <h2 className="text-[1.375rem] sm:text-2xl font-semibold text-indigo-900">
                      {book.name}
                    </h2>
                    <p className="text-indigo-800 text-sm sm:text-base">
                      {book.description}
                    </p>
                   {islogin && (
                  <button className="bg-indigo-700 text-white px-2 py-2 rounded-lg w-max  transition-colors hover:scale-105 duration-700">
                    <Link to={`/book`}>
                     view more
                    </Link>
                  </button>
                  )}
                </div>
                </div>


              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BookSlide;
