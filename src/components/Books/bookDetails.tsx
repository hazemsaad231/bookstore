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
    const book = data?.data;



  return (
<>
<ToastContainer/>

{isLoading ?(<div><Load/></div>):(
    <div className="h-full py-40">


        <div className="flex flex-col lg:flex-row justify-center m-auto gap-10 p-4 items-center w-[90%] lg:w-[65%] rounded-xl shadow-xl border-t-[40px] border-primary ">


        <img src={book?.image} alt="" className="h-96 w-full object-center rounded-xl transform hover:scale-105 transition duration-500"/>

      {book &&
            <div className="flex flex-col gap-2 justify-center items-center w-[90%]">

      <h1 className="text-4xl font-bold">{book?.name}</h1>
      <h2 className="text-xl text-gray-600">by {book?.author}</h2>
      <h2 className=" font-bold text-2xl">price {book?.price}$</h2>
      <hr className="w-full h-2 bg-slate-600"/>
      <h2 className="text-md w-full text-gray-600">{book?.description}</h2>
   {role !== "Admin" ?
    <button className="bg-indigo-600 px-4 py-2 w-full rounded-lg text-white active:animate-spin hover:bg-indigo-800"
    onClick={() => handleAddToCart(book)}>Add to Cart</button>:null
  }
    </div>

}

  </div>



  </div>
)}

  </>
  );
}

export default Details;


