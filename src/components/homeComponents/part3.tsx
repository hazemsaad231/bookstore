import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";


function New() {

  const [books, setBooks] = useState<any>([]);
  const dispatch = useDispatch();
  const handleAddToCart = (book: any) => {
    console.log(book)
    dispatch(addToCart(book));

  }


  const role = localStorage.getItem("role");
  console.log(role)


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };



  const getData = async () => {
    try {
      let response = await axios.get("https://backend-production-65d5.up.railway.app/books");
      const Book = response.data.filter((book: any) => book.new === "yes").slice(0, 8);
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
    <div className="py-16" style={{ backgroundColor: 'rgb(250, 245, 239)' }}>
      <ToastContainer />
      <div className="slider flex flex-col gap-4 justify-center items-center px-4">
        <div className="text-center">
          <h2 className="text-lg text-gray-500 font-bold tracking-wider">SOME QUALITY ITEMS</h2>
          <div className="flex items-center gap-6">
            <hr style={{ width: "50%", border: "1px solid #ff6347" }} />
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-indigo-900 mb-4 w-max">New Release Books</h1>
            <hr style={{ width: "50%", border: "1px solid #ff6347" }} />
          </div>
        </div>
        
        <div className="w-full">
          <Slider {...settings}>
          {books.map((book: any, index: number) => (
            <div>
              <div key={index} className="text-center relative group">
                <div className="relative rounded-xl transform hover:scale-105 transition duration-300 m-6 group">
                  <img
                    src={book.image}
                    alt="img"
                    className="h-72 w-48 sm:h-72 md:h-80 lg:h-80 xl:h-80 m-auto object-center"
                    loading="lazy"
                  />
                  {/* زرارين يظهران عند hover */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  { role === 'Customer' ?
              <button className="bg-orange-700 text-white w-1/2 py-3">
                <Link to={`/home/details/${book.id}`} className="text-white">View Details</Link> </button>:
                 <div></div>}
                    { role === 'Customer' ?
              <button className="bg-indigo-800 text-white w-1/2  py-3">
                <FaShoppingCart size={25} onClick={() => handleAddToCart(book)} className="m-auto" /></button>:
                <div></div>}
                  </div>
                </div>
                <h1 className="mt-4 text-lg font-semibold">{book.name}</h1>
                <h1 className="text-gray-500">{book.author}</h1>
                <h1 className="text-indigo-800 font-bold mb-4">${book.price}</h1>
              </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="cursor-pointer text-right p-1 rounded-lg mt-12 text-orange-600 text-xl font-semibold hover:bg-gray-100 w-max transition duration-300 ease-in-out">
          <Link to='/home/book'>View All Products</Link>
        </div>
      </div>
    </div>
  );
}

export default New;


