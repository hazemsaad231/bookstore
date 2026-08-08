import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BOOKS_API } from '../../Api/api';
import { FaShoppingCart, FaEye, FaBookOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/counter';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

function Feature() {

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(BOOKS_API, { signal: controller.signal });
        const Book = response.data.filter((book: any) => String(book.featured) === "true");
        setBooks(Book);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    getData();
    return () => controller.abort();
  }, []);

  const islogin = localStorage.getItem("token");

  return (
    <div className="relative w-full py-8 sm:py-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-96 sm:h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Header Section */}
        <div className="flex items-center justify-center mb-8 gap-3 sm:gap-6">
          <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-transparent to-orange-500 rounded-full opacity-70"></div>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-2">
              Featured <span className="text-indigo-600">Books</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-wide text-xs sm:text-sm uppercase">Curated Selection</p>
          </div>
          <div className="hidden md:block w-16 h-1 bg-gradient-to-l from-transparent to-orange-500 rounded-full opacity-70"></div>
        </div>

        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 animate-pulse">
                <div className="mx-auto w-[60%] max-w-[11rem] aspect-[2/3] bg-slate-200 rounded-lg"></div>
                <div className="h-4 bg-slate-200 rounded mt-6 mx-auto w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded mt-3 mx-auto w-1/2"></div>
                <div className="h-6 bg-slate-200 rounded mt-4 mx-auto w-1/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-slate-500 py-12">
            Something went wrong while loading the books. Please refresh the page.
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            No featured books available right now.
          </p>
        ) : (
          /* Swiper Section */
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-indigo-600 !w-8 !rounded-full transition-all duration-300'
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={books.length > 4}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-16 !pt-12 !px-2 sm:!px-6"
          >
            {books.map((book: any, index: number) => (
              <SwiperSlide key={book.id ?? index} className="h-auto">
                <div className="group relative h-full flex flex-col bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out border border-slate-100 mt-8 mb-4">

                  {/* Book Image with Floating Effect */}
                  <div className="relative -mt-10 sm:-mt-12 mx-auto w-[60%] max-w-[11rem] aspect-[2/3] shadow-lg rounded-lg overflow-hidden transform group-hover:-translate-y-3 transition-all duration-500 z-10 bg-slate-100">
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
                  <div className="pt-6 pb-6 px-4 sm:px-5 text-center flex flex-col items-center flex-grow">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-indigo-700 transition-colors" title={book.name}>
                      {book.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider line-clamp-1" title={book.author}>
                      {book.author}
                    </p>

                    <div className="flex items-center gap-2 mb-6 mt-auto">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">EGP {book.price}</span>
                    </div>

                    {islogin && (
                      <div className="w-full">
                        {role === "Customer" ? (
                          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 w-full">
                            <button
                              onClick={() => handleAddToCart(book)}
                              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-indigo-200"
                            >
                              <FaShoppingCart size={14} />
                              <span>Add</span>
                            </button>

                            <Link
                              to={`/details/${book.id}`}
                              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300"
                            >
                              <FaEye size={14} />
                              <span>Details</span>
                            </Link>
                          </div>
                        ) : (
                          <Link
                            to={`/addBook/${book.id}`}
                            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-orange-200"
                          >
                            <FaBookOpen size={14} />
                            <span>Update Book</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements on Card */}
                  <div className="absolute top-4 right-4 text-slate-200 opacity-50 group-hover:text-indigo-100 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="sm:w-[60px] sm:h-[60px]">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Feature;
