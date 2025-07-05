import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Load from '../load/load';
import axios from 'axios';
import { Orders_API } from '../Api/api';



const OrderDetails = () => {
  const { id } = useParams();

  const fetchOrderDetails = async (id: string) => {
 
    return await axios.get(`${Orders_API}/${id}`);
  };
  
  const { data: data , isLoading } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => fetchOrderDetails(id!),
    enabled: !!id, // فقط اجلب البيانات عندما يكون هناك id
  });

  console.log(data?.data);

  const Details = data?.data;

  if (isLoading) return <Load />;

  return (
    <>
    <div className="pb-40 pt-20">
    <h1 className="text-2xl font-semibold text-center mb-8 tracking-[0.2em]">Order Details</h1>

      <div className="border-t-[40px] border-[rgb(237,85,59)] w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th className='px-2'>Product</th>
              <th className='px-2'>Product Name</th>
              <th className='px-2'>Quantity</th>
              <th className='px-2'>Price</th>
              <th className='px-2'>Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center p-4">
            {Details?.cartItems.map((item: any, index: number) => (
              <tr key={index}>
                <td className="p-4"><img src={item.image} alt="" className="w-16 h-8 m-auto object-center" /></td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{item.price}$</td>
                <td className="p-4">{item.price * item.quantity}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[40%] m-auto border-x-[32px] border-[rgb(237,85,59)] bg-white shadow-xl rounded-xl h-full mt-10">
        <table className="w-full m-auto">
          <thead>
            <tr>
              <th>Total Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{Details?.cartItems.reduce((total: number, item: any) => total + item.quantity, 0)}</td>
              <td>{Details?.cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}$</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t-[40px] border-[rgb(237,85,59)] w-[90%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
        <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">Customer Details</h1>
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th className='px-2'>Name</th>
              <th className='px-2'>Phone Number</th>
              <th className='px-2'>Country</th>
              <th className='px-2'>City</th>
              <th className='px-2'>Address</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {Details && (
              <tr>
                <td className="p-5">{Details.delivery_address.name}</td>
                <td className="p-5">{Details.delivery_address.mobile}</td>
                <td className="p-5">{Details.delivery_address.country}</td>
                <td className="p-5">{Details.delivery_address.city}</td>
                <td className="p-5">{Details.delivery_address.street}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default OrderDetails;
