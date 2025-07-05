import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import Load from "../load/load";
import { BOOKS_API } from "../Api/api";



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
      })
      
    }

    const {data, isLoading} = useQuery("product", getProductDetails, {
      refetchInterval: 8000
    })
    console.log(data?.data)
    const product = data?.data;



  return (
<>
<ToastContainer/>

{isLoading ?(<div><Load/></div>):(
    <div className="h-full p-20">

<h1 className="text-4xl font-bold text-center text-indigo-600 pb-6 tracking-[5px]">Book Details</h1>

        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center gap-20 items-center py-12 ">


        <img src={product?.image} alt=""  className="h-96 w-96 object-center rounded-xl transform hover:scale-105 transition duration-500"/>


 

      <div className="flex flex-col gap-3 items-center justify-center">


      {product &&
            <div className="flex flex-col gap-2 justify-center items-center">

      <h1 className="text-2xl font-semibold">{product?.name}</h1>
      <h2 className="text-xl text-gray-600">by {product?.author}</h2>
      <h2 className=" font-bold text-xl">{product?.price}$</h2>
      <h2 className="text-sm w-80 text-gray-600">{product?.description}</h2>
   {role !== "Admin" ?
    <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white active:animate-spin"
    onClick={() => handleAddToCart(product)}>Add to Cart</button>:null
  }
    </div>

}

  </div>

  </div>

  </div>
)}

  </>
  );
}

export default Details;


