import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "../../redux/counter";
import React from "react";

interface BookCardProps {
  currentBooks: any[];
  handleClickOpen: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ currentBooks,handleClickOpen }) => {

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
                <div key={book.id} className="text-center relative group">
                  <div className="shadow-xl rounded-xl p-4 bg-slate-50 ">
                  <div className="transform hover:scale-105 transition duration-300">
                   
                    <img
                      src={book.image || 'default_image_url'} // إضافة صورة افتراضية إذا لم توجد صورة
                      alt={book.name}
                      className="w-full h-60 mb-4 m-auto rounded-xl shadow-lg object-center"
                      loading="lazy"
                    />

<div className="absolute inset-0 flex flex-col justify-end mb-8 items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
           
              
           { role === 'Customer' ?
           <button className=" bg-primary text-white w-full py-2">
             <Link to={`/details/${book.id}`} className="text-white">View Details</Link> </button>:
             <button className=" bg-indigo-600 text-white w-full py-2">
             <Link to={`/details/${book.id}`} className="text-white">View Details</Link> </button>
             }
             { role === 'Admin' ?
              <button className="bg-primary text-white w-full py-2">
             <Link to={`/addBook/${book.id}`} className="text-white">Update</Link></button>:null
             }

           { role === 'Customer' ?
           <button className="bg-indigo-600 text-white w-full py-2">
           <FaShoppingCart size={30} onClick={() => handleAddToCart(book)} className="m-auto" /></button>:
           <button className="bg-indigo-600 text-white w-full py-2"
           onClick={() => handleClickOpen(book.id)

           }
           >
            delete
           </button>
           
          }
        </div>




       </div>
                     <div className="mt-2 cursor-pointer">
                 { role === 'Customer' ?
                         <MdFavoriteBorder 
                         size={24} 
                         color={isFavorite(book) ? 'red' : 'gray'}
                         onClick={() => {handleAddMyFavorite(book)}}
                         
                         className="cursor-pointer"
                       />
                          :
                        <div></div>
                         }
                 </div>
                     <div className="flex justify-between text-gray-600 font-semibold text-sm">
                      <h3>Name</h3>
                     <h3>{book.name}</h3>
                     </div>
                   <div className="flex justify-between text-gray-600 text-sm">
                    <h4>Author</h4>
                   <p>{book.author}</p>
                   </div>
                   <div className="flex justify-between text-gray-600 text-sm">
                    <h4>Price</h4>
                   <p>${book.price}</p>
                   </div>
               
                  
                 
                   </div>


                </div>
                
              ))}

            </div>
    </>
  );
};

export default React.memo(BookCard);
