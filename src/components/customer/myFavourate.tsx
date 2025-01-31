import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdDelete } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { DeleteFromFavorite } from "../../redux/counter";


const MyFavourate = () => {

  const favourateBooks = useSelector((state: RootState) => state.counter.favoriteItems);

const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(DeleteFromFavorite({ id }));
  }
    

    return (

      
      <div className="bg-gradient-to-r from-red-100 to-white py-40">
        
        <ToastContainer/>
        <div className="shadow-2xl rounded-xl bg-white w-[80%] sm:w-[80%] m-auto md:w-[70%] lg:w-[60%] xl:w-[60%] tracking-[1px] ">
        <h1 className="text-xl font-serif text-center mb-4 ">My Favourate Books</h1>
        {favourateBooks.length === 0 ? (
          <p className="text-center text-gray-600">No books in your favorite list.</p>
        ) : (
          <p className="text-center text-gray-600">You have {favourateBooks.length} books in your favorite list.</p>
        )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 place-items-center p-4">
      {favourateBooks.map((book: any) => (
        <div key={book.id} className="text-center relative group">
          <div className="shadow-xl mx-16 sm:mx-16 md:mx-12 lg:mx-8 xl:mx-2 p-4 rounded-xl bg-slate-50 transform hover:scale-105 transition duration-300">
          <div className="transform hover:scale-105 transition duration-300">
            <img
              src={book.image || 'default_image_url'} 
              alt={book.name}
              className=" h-60 w-64 mb-4 m-auto rounded-xl shadow-lg"
            />
<div className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-orange-700 w-full py-1 rounded"><MdDelete size={30} color="white" className="cursor-pointer m-auto" onClick={() => handleDelete(book.id)} /></div>   
               </div>
               </div>
              
             <div className="flex justify-between text-gray-600 font-thin text-sm">
              <h3 className="">Name</h3>
             <h3 className="">{book.name}</h3>
             </div>
           <div className="flex justify-between text-gray-600 font-thin text-sm">
            <h4>Author</h4>
           <p className="text-gray-600">{book.author}</p>
           </div>
           <div className="flex justify-between text-gray-600 font-thin text-sm">
            <h4>Price</h4>
           <p className="">${book.price}</p>
           </div>
           </div>
          </div> 
      ))}

      </div>
      
     
      </div>
      </div>
           
    
     
    );
  };
  
        


export default MyFavourate