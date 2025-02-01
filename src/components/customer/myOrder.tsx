import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { db } from "./firebase";
import Loading from "../orders/loading";

interface Order {
  id: string;
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



const MyOrders = () => {


  const fetchOrders = async (userId: string) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      return [];
    }
  
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  };





  const { id: userId } = useParams();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", userId], // مفتاح التخزين المؤقت
    queryFn: () => fetchOrders(userId!), // الدالة التي تجلب البيانات
    enabled: !!userId, // تأكد من عدم تنفيذ الجلب إلا إذا كان هناك userId
  });

  return (
    <>
{isLoading && <Loading />}
    <div className="bg-gradient-to-l from-red-100 to-white py-40 h-full p-4">
      <div>
        <div className="p-4 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[60%] m-auto bg-white shadow-2xl rounded-xl">
          <h1 className="text-lg text-center mb-8 tracking-[0.2em]">
            My Orders
          </h1>
          <div className="space-y-6">
            {orders.length === 0 && !isLoading && (
              <p className="text-center text-gray-500">No orders found for this user.</p>
            )}

            {orders.map((order: any) => {
              const totalPrice = order.cartItems.reduce(
                (acc: number, item: any) => acc + item.quantity * item.price,
                0
              );

              return (
                <div
                  key={order.id}
                  className="shadow-lg overflow-x-auto rounded-lg p-3 bg-white"
                >
                  <table className="w-full border-collapse text-sm sm:text-base md:text-md lg:text-md xl:text-md">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {order.cartItems.map((item: any, index: number) => (
                        <tr key={`${order.id}-${index}`}>
                          {index === 0 && (
                            <td
                              rowSpan={order.cartItems.length}
                              className="align-middle"
                            >
                              {order.id}
                            </td>
                          )}
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          {index === 0 && (
                            <td
                              rowSpan={order.cartItems.length}
                              className="align-middle"
                            >
                              ${totalPrice}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyOrders;
