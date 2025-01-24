import { collection, getDocs } from "firebase/firestore"; 
import { db } from  "../customer/firebase";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { updateOrder } from "../../redux/counter";
import { Link } from "react-router-dom";
import Loading from "./loading";

interface Order {
  email: string;
  id: string;
  cartItems: {
    reduce(arg0: (total: number, item: { price: string; quantity: number; }) => number, arg1: number): unknown;
    map(arg0: (item: any) => any): ReactNode;
    id: number;
    image: string;
    name: string;
    quantity: number;
    price: number};
    delivery_address: {
      name: string;
    };
    name: string;
   timestamp: any;

}
const Orders = () => {

  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  
const[loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const query = await getDocs(collection(db, "orders"));
      const OrderList = query.docs.map((doc) =>({
        id: doc.id,
        email: doc.data().email,
        cartItems: doc.data().cartItems,
        delivery_address: doc.data().delivery_address,
        name: doc.data().name,
        timestamp: doc.data().timestamp,
        ...doc.data(),
      }));
      console.log(OrderList);
      setOrders(OrderList);
      setLoading(false);

      // إرسال بيانات الطلبات إلى الـ Redux Store
      dispatch(updateOrder(OrderList));
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-r from-red-100 to-white pb-40 pt-20 ">
      {loading ?<Loading/>:
      <div className="m-4">
      <div className="overflow-x-auto mt-12 rounded-xl shadow-xl bg-white m-auto p-4 w-full sm:w-full md:w-5/6 lg:w-2/3 xl:w-2/3 ">
        <h1 className="text-xl font-semibold text-center mb-8 tracking-[0.2em]">Orders list</h1>
        <table className="w-full  border-collapse">
          <thead>
            <tr>
              <th>email</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {orders.map((order, index: number) => {
              // حساب المجموع الكلي للطلب
              const totalPrice: number = order.cartItems.reduce((total: number, item: { price: string; quantity: number; }) => {
                const itemPrice = parseFloat(item.price); // تحويل السعر إلى عدد
                return total + (itemPrice * item.quantity); // جمع السعر الكلي لكل عنصر
              }, 0)as number;

              return (
                <tr key={index}>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.cartItems.map((item) => item.id)}</td>
                  <td className="p-3">{order.delivery_address.name}</td>
                  <td className="p-3">{order.timestamp.toDate().toLocaleDateString()}</td>
                  <td className="p-3">{totalPrice.toFixed(2)}$</td>
                  <td className="p-3">
                    <button className="bg-red-700 px-2 py-1 text-white rounded-full">
                      <Link to={`/home/orderDetails/${order.id}`}>view</Link>
                   
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>}
    </div>
  );
};

export default Orders;
