import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";
import { BOOKS_API } from "../Api/api";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <div className="py-16" style={{ backgroundColor: "rgb(250, 245, 239)" }}>
      <ToastContainer />
      <div className="slider flex flex-col gap-4 justify-center items-center">
        <div className="text-center">
          <h2 className="text-lg text-gray-500 font-bold tracking-wider">
            SOME QUALITY ITEMS
          </h2>
          <div className="flex items-center gap-2">
            <hr
              style={{ width: "200px", border: "1px solid #ff6347" }}
              className="hidden sm:hidden md:block lg:block xl:block"
            />
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-indigo-900 m-4">
              New Release Books
            </h1>
            <hr
              style={{ width: "200px", border: "1px solid #ff6347" }}
              className="hidden sm:hidden md:block lg:block xl:block"
            />
          </div>
        </div>

        {/* Swiper بدل Slider */}
        <div className="w-full">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              1536: { slidesPerView: 5 },
              1024: { slidesPerView: 4 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {books.map((book: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <div className="relative rounded-xl w-60 m-auto transform hover:scale-105 transition duration-300 group">
                    <img
                      src={book.image}
                      alt="img"
                      className="h-80 w-full m-auto object-center rounded-xl"
                      loading="lazy"
                    />
                    {/* زرارين يظهران عند hover */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {role === "Customer" ? (
                        <div className="flex flex-col gap-2 justify-center items-center w-full">
                          <button className="bg-primary text-white w-full py-3">
                            <Link
                              to={`/home/details/${book.id}`}
                              className="text-white"
                            >
                              View Details
                            </Link>
                          </button>
                          <button className="bg-indigo-800 text-white w-full py-3">
                            <FaShoppingCart
                              size={25}
                              onClick={() => handleAddToCart(book)}
                              className="m-auto"
                            />
                          </button>
                        </div>
                      ) : (
                        <button className="bg-primary text-white w-full py-2">
                          <Link
                            to={`/home/addBook/${book.id}`}
                            className="text-white"
                          >
                            Update
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                  <h1 className="mt-4 text-lg font-semibold">{book.name}</h1>
                  <h1 className="text-gray-500">{book.author}</h1>
                  <h1 className="text-indigo-800 font-bold mb-4">
                    ${book.price}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="cursor-pointer text-right p-1 rounded-lg mt-12 text-primary text-xl font-semibold hover:bg-gray-100 w-max transition duration-300 ease-in-out">
          <Link to="/home/book">View All Books</Link>
        </div>
      </div>
    </div>
  );
}

export default New;
