import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import Load from "../load/load";



function Details() {
  const { id } = useParams();


 

  const dispatch = useDispatch();
  const handleAddToCart = (book: any) => {
    console.log(book)
    dispatch(addToCart(book));

  }




  const getProductDetails = async () => {
    
      return await axios.get(`https://backend-production-65d5.up.railway.app/books/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // استبدل yourToken بالـ Token الصحيح
      }
      })
    }

    const {data, isLoading} = useQuery("product", getProductDetails, {
      refetchInterval: 500
    })
console.log(data?.data)
    const product = data?.data;



  return (
<>
{isLoading ?(<div><Load/></div>):(
    <div className="bg-gradient-to-t from-red-100 to-white-100 h-full p-6">
      <ToastContainer/>
        <div className="flex justify-center flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row  md:space-x-60 lg:space-x-60 xl:space-x-80 p-16 ">

    <div className="flex justify-center items-center my-4">
      <img src={product?.image} alt=""  className="h-80 w-60"/>
    </div>

    <div className="flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-indigo-600">Book Details</h1>
      <h1 className="text-2xl font-semibold">{product?.name}</h1>
      <h2 className="text-xl text-gray-600">by {product?.author}</h2>
      <h2 className=" font-bold text-xl">{product?.price}$</h2>
      <h2 className="text-sm w-80 text-gray-600">{product?.description}</h2>
   
    <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white active:animate-spin"
    onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  
  </div></div>
)}
  </>
  );
}

export default Details;


