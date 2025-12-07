// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/counter";
// import { ToastContainer } from "react-toastify";
// import { useQuery } from "react-query";
// import Load from "../load/load";
// import { BOOKS_API } from "../Api/api";



// function Details() {

//   const { id } = useParams();
// const role = localStorage.getItem("role");

//   const dispatch = useDispatch();
//   const handleAddToCart = (book: any) => {
//     console.log(book)
//     dispatch(addToCart(book));

//   }




//   const getProductDetails = async () => {
    
//       return await axios.get(`${BOOKS_API}/${id}`,{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}` // استبدل yourToken بالـ Token الصحيح
//       }
//       })
      
//     }

//     const {data, isLoading} = useQuery("product", getProductDetails, {
//       refetchInterval: 8000
//     })
//     console.log(data?.data)
//     const book = data?.data;



//   return (
// <>
// <ToastContainer/>

// {isLoading ?(<div><Load/></div>):(
//     <div className="h-full py-40">


//         <div className="flex flex-col lg:flex-row justify-center m-auto gap-10 p-4 items-center w-[90%] lg:w-[65%] rounded-xl shadow-xl border-t-[40px] border-primary ">


//         <img src={book?.image} alt="" className="h-96 w-full object-center rounded-xl transform hover:scale-105 transition duration-500"/>

//       {book &&
//             <div className="flex flex-col gap-2 justify-center items-center w-[90%]">

//       <h1 className="text-4xl font-bold">{book?.name}</h1>
//       <h2 className="text-xl text-gray-600">by {book?.author}</h2>
//       <h2 className=" font-bold text-2xl">price {book?.price} EGP</h2>
//       <hr className="w-full h-2 bg-slate-600"/>
//       <h2 className="text-md w-full text-gray-600">{book?.description}</h2>
//    {role !== "Admin" ?
//     <button className="bg-indigo-600 px-4 py-2 w-full rounded-lg text-white active:animate-pulse hover:bg-indigo-800"
//     onClick={() => handleAddToCart(book)}>Add to Cart</button>:null
//   }
//     </div>

// }

//   </div>



//   </div>
// )}

//   </>
//   );
// }

// export default Details;



import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import Load from "../load/load";
import { BOOKS_API } from "../Api/api";
import { ShoppingBag, Star } from "lucide-react";



function Details() {

  const { id } = useParams();
const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  const handleAddToCart = (book: any) => {
    console.log(book)
    dispatch(addToCart(book));

  }






  const getProductDetails = async () => {
    
      return await axios.get(`${BOOKS_API}/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // استبدل yourToken بالـ Token الصحيح
      }

      }
    )
      

    }


    const {data , isLoading} = useQuery("product", getProductDetails, {
      refetchInterval: 8000
    })
    console.log(data?.data)
    const book = data?.data;

const discount = 0.60 * book?.price 

console.log(discount)


  return (
        <>
              <ToastContainer position="bottom-right" />

        {isLoading ? <Load /> : (
           <div className="min-h-screen bg-[#f8f9fa] py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          
   
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 place-content-start place-items-center">

                {/* Right Column: Details */}
            <div className="lg:col-span-5 space-y-8">
              <div 
            
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Hardcover</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-slate-700 font-bold text-sm">4.9</span>
                      <span className="text-slate-400 text-sm">(128 reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
                    {book?.name}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-lg text-slate-600">
                    <span>By</span>
                    <a href="#" className="text-indigo-600 font-medium border-b border-indigo-200 hover:border-indigo-600 transition-colors">
                      {book?.author}
                    </a>
                  </div>
                </div>

                <div className="flex items-baseline gap-4 pb-6 border-b border-slate-200">
                  <span className="text-4xl font-bold text-slate-900">{discount}</span>
                  <span className="text-lg text-slate-400 line-through">{book?.price}</span>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">-40%</span>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {book?.description}
                  </p>
                </div>

                {/* Cart Actions */}
                {book && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Quantity */}
                   
                      {role !== "Admin" && (
                        <button 
                          onClick={() => handleAddToCart(book)}
                          className="flex-1 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/80 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-slate-900/20 active:scale-[0.98] cursor-pointer"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                    
                    <p className="text-center text-xs text-slate-400">
                      30-Day Money-Back Guarantee • Secure Checkout
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Left Column: Images */}
            <div className="lg:col-span-7 space-y-8">
              <div 
              >
                
                <div className="relative z-10 flex justify-center items-center perspective-1000">
                  <img 
                    src={book?.image} 
                    alt={book?.name} 
                    className="max-h-[500px] w-auto md:w-96 object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>

            </div>

        
          </div>
        </div>
      </div>
        )
      
     
    
              }</>

  );
}

export default Details;