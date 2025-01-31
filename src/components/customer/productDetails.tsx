import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/counter";
import { ToastContainer } from "react-toastify";



function Details() {
  const { id } = useParams();

  console.log(id);

  const [product, setProduct] = useState<any>(null);
 

  const dispatch = useDispatch();
  const handleAddToCart = (book: any) => {
    console.log(book)
    dispatch(addToCart(book));

  }




  const getProductDetails = async () => {
    try {
      const response = await axios.get(`https://backend-production-65d5.up.railway.app/books/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // استبدل yourToken بالـ Token الصحيح
      }}
      );
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!product) return <div className="flex justify-center items-center h-screen">
    <Rings
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>;

  return (

    <div className="bg-gradient-to-t from-red-100 to-white-100 h-full p-6" style={{fontFamily: "serif"}}>
      <ToastContainer/>
        <div className="flex justify-center flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row  md:space-x-60 lg:space-x-60 xl:space-x-80 p-16 ">

    <div className="flex justify-center items-center my-4">
      <img src={product.image} alt=""  className="h-80 w-60"/>
    </div>

    <div className="flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-indigo-600">Book Details</h1>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <h2 className="text-xl text-gray-600">by {product.author}</h2>
      <h2 className=" font-bold text-xl">{product.price}$</h2>
      <h2 className="text-sm w-80 text-gray-600">{product.description}</h2>
   
    <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white active:animate-spin"
    onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  
  </div></div>
  
  );
}

export default Details;


