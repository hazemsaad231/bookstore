import{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../customer/firebase';
import Loading from './loading';


interface Details {
  cartItems: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  delivery_address:{
    name: string;
    address: string;
    mobile: string;
    country: string;
    street: string;
    city: string;
  }
  
}



const OrderDetails = () => {
  const { id }: any = useParams();  
  const [Details, setOrderDetails] = useState<Details | null>(null);
const [loading, setLoading] = useState(true);





  useEffect(() => {
    const fetchOrderDetails = async () => {
      
      const docRef = doc(db, "orders", id);  
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        
        setOrderDetails(docSnap.data() as Details);
        console.log(Details)
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    fetchOrderDetails();
  }, [id]);  

  return (
    <div>
      {loading && <Loading />}
       <div className="bg-gradient-to-r from-red-100 to-white pb-40 pt-20">
       <div className="w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
       <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">Order Details</h1>
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th>product</th>
              <th>product Name</th>
              <th>Quantity</th>
              <th>price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center p-3">
            
            {Details && (
              <tr >
                <td className='p-2'>{Details.cartItems.map((item: any) => <div className='flex flex-col mb-2'><img src={item.image} alt="" className='w-12 h-6 m-auto ' /></div>)}</td>
                <td  className='p-2'>{Details.cartItems.map((item: any) => <div className='flex flex-col mb-2'>{item.name}</div> )}</td>
                <td className='p-2'>{Details.cartItems.map((item: any) =><div className='flex flex-col mb-2'>{item.quantity}</div>)}</td>
                <td className='p-2'>{Details.cartItems.map((item: any) => <div className='flex flex-col mb-2'>{item.price}$</div>)}</td>
                <td className='p-2'>{Details.cartItems.map((item: any) => <div className='flex flex-col mb-2'>{item.price * item.quantity}$</div>)}</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>

<div className="w-[40%]  m-auto bg-white shadow-xl rounded-xl h-full mt-10">
  <table className='w-full  m-auto'>
    <thead>
      <tr>
        <th>total quantity</th>
        <th>total price</th>
      </tr>
    </thead>
    <tbody className='text-center'>
      <tr>
        <td>{Details && Details.cartItems.reduce((total: number, item: any) => total + item.quantity, 0)}</td>
        <td>{Details && Details.cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}$</td>
      </tr>
    </tbody>
  </table>
</div>


    <div className="w-[90%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
       <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">customer Details</h1>
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>country</th>
              <th>city</th>
              <th>address</th>

            </tr>
          </thead>
          <tbody className="text-center">
            {Details && (
              <tr>
                <td className='p-4'>{Details.delivery_address.name}</td>
                <td className='p-4'>{Details.delivery_address.mobile}</td>
                <td className='p-4'>{Details.delivery_address.country}</td>
                <td className='p-4'>{Details.delivery_address.city}</td>
                <td className='p-4'>{Details.delivery_address.street}</td>

              </tr>
            )}
          </tbody>
        </table>
    </div>








    </div>
    </div>

  );
};

export default OrderDetails;

