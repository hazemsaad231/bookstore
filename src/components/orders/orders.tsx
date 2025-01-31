import { collection, getDocs } from "firebase/firestore";
import { db } from "../customer/firebase";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../redux/counter";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "./loading";

interface Order {
  email: string;
  id: string;
  cartItems: {
    id: number;
    image: string;
    name: string;
    quantity: number;
    price: string;
  }[];
  delivery_address: {
    name: string;
  };
  name: string;
  timestamp: any;
}

const fetchOrders = async () => {
  const querySnapshot = await getDocs(collection(db, "orders"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

const Orders = () => {
  const dispatch = useDispatch();

  const { data: orders = [], isLoading } = useQuery( "orders", fetchOrders);

  // إرسال الطلبات إلى Redux عند تحميل البيانات
  if (!isLoading) dispatch(updateOrder(orders));

  return (
    <>
   
      {isLoading ? 
        <Loading />
       : 
        <div className="bg-gradient-to-r from-red-100 to-white pb-40 pt-20">
        <div className="m-4">
          <div className="overflow-x-auto mt-12 rounded-xl shadow-xl bg-white m-auto p-4 w-full sm:w-full md:w-5/6 lg:w-2/3 xl:w-2/3">
            <h1 className="text-xl font-semibold text-center mb-8 tracking-[0.2em]">Orders list</h1>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                  <th>Order Details</th>
                </tr>
              </thead>
              <tbody className="text-center text-sm">
                {orders.map((order, index: number) => {
                  const totalPrice: number = order.cartItems.reduce((total, item) => {
                    return total + parseFloat(item.price) * item.quantity;
                  }, 0);

                  return (
                    <tr key={index}>
                      <td className="p-3">{order.email}</td>
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.delivery_address.name}</td>
                      <td className="p-3">{order.timestamp.toDate().toLocaleDateString()}</td>
                      <td className="p-3">{totalPrice.toFixed(2)}$</td>
                      <td className="p-3">
                        <button className="bg-red-700 px-2 py-1 text-white rounded-full">
                          <Link to={`/home/orderDetails/${order.id}`}>View</Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
  
    </>
  );
};

export default Orders;
