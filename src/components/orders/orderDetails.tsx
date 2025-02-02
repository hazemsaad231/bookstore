import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../customer/firebase';
import Load from '../load/load';


interface Details {
  cartItems: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  delivery_address: {
    name: string;
    address: string;
    mobile: string;
    country: string;
    street: string;
    city: string;
  };
}

const fetchOrderDetails = async (id: string): Promise<Details | null> => {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as Details) : null;
};

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: Details, isLoading } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => fetchOrderDetails(id!),
    enabled: !!id, // فقط اجلب البيانات عندما يكون هناك id
  });

  if (isLoading) return <Load />;

  return (
    <div className="bg-gradient-to-r from-red-100 to-white pb-40 pt-20">
      <div className="w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
        <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">Order Details</h1>
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center p-3">
            {Details?.cartItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2"><img src={item.image} alt="" className="w-12 h-6 m-auto" /></td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.price}$</td>
                <td className="p-2">{item.price * item.quantity}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[40%] m-auto bg-white shadow-xl rounded-xl h-full mt-10">
        <table className="w-full m-auto">
          <thead>
            <tr>
              <th>Total Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{Details?.cartItems.reduce((total, item) => total + item.quantity, 0)}</td>
              <td>{Details?.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}$</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-[90%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[60%] m-auto overflow-x-auto bg-white shadow-xl rounded-xl h-full mt-10">
        <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">Customer Details</h1>
        <table className="w-full border-collapse m-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>City</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {Details && (
              <tr>
                <td className="p-4">{Details.delivery_address.name}</td>
                <td className="p-4">{Details.delivery_address.mobile}</td>
                <td className="p-4">{Details.delivery_address.country}</td>
                <td className="p-4">{Details.delivery_address.city}</td>
                <td className="p-4">{Details.delivery_address.street}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
