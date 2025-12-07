import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "../../redux/counter";
import React from "react";
import { FaShoppingCart, FaEye, FaBookOpen } from "react-icons/fa";

interface BookCardProps {
  currentBooks: any[];
  handleClickOpen: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ currentBooks, handleClickOpen }) => {

  const favoriteItems = useSelector((state: any) => state.counter.favoriteItems);

  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  const handleAddMyFavorite = (book: any) => {
    dispatch(addToFavorite(book));
  };

 const isFavorite = (book: any) => {
    return favoriteItems.some((item: any) => item.id === book.id);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-2 w-full ">
              {currentBooks?.map((book: any) => (
                                  <div key={book.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out border border-slate-100 overflow-hidden h-96 flex flex-col">
                                  
                                 {/* Image Container */}
                                 <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
                                     <img
                                      src={book.image}
                                      alt={book.name}
                                      className="w-full h-full object-center transition-transform duration-700 group-hover:scale-110"
                                      loading="lazy"
                                    />
                                    
                                    {/* Badge */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-indigo-900 shadow-sm z-10">
                                      <MdFavoriteBorder
                                        size={16}
                                        color={isFavorite(book) ? "red" : "gray"}
                                        onClick={() => handleAddMyFavorite(book)}
                                      />
                                    </div>
                
                                    {/* Quick Actions Overlay (Login) */}
                                 
                                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                                        {role === "Customer" ? (
                                          <>
                                            <button 
                                              onClick={() => handleAddToCart(book)}
                                              className="w-full bg-white text-slate-900 hover:bg-indigo-50 font-semibold py-2.5 px-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                              <FaShoppingCart size={16}
                                              onClick={(id: any)=>{handleClickOpen(id)}} />
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
                                  </div>
                
                                  {/* Content Info */}
                                  <div className="p-4 flex flex-col flex-grow">
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
                                      
                                    </div>
                                  </div>
                                </div>
              ))}

            </div>

    </>
  );
};

export default React.memo(BookCard);
