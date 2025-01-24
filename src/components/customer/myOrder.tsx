import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id: userId } = useParams(); // userId يتم استلامه من الرابط
  const [orders, setOrders] = useState<Order[]>([]);
 const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) {
      console.error("Invalid userId");
     
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Order[];
          setOrders(fetchedOrders);
        } else {
          console.log("No orders found for this user!");
        
          
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
       
      } finally {
        setLoading(false);
        
      }
    };

   
    fetchOrders();
  }, [userId]);


  return (
    <div className="bg-gradient-to-l from-red-100 to-white py-40 h-full">
      {loading && <Loading />}
<div >
  
  <div className="w-[100%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[60%]  m-auto bg-white shadow-xl rounded-xl">
    <h1 className="text-lg font-semibold text-center mb-8 tracking-[0.2em]">
      My Orders
    </h1>
    <div className="space-y-6">

    {orders.length === 0 && !loading && (
              <p className="text-center text-gray-500">
                No orders found for this user.
              </p>
            )}



     
      {orders.map((order) => {
      
       
        const totalPrice = order.cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

        return (
          <div
            key={order.id}
            className="shadow-lg overflow-x-auto rounded-lg p-3 bg-white"
          >
            <table className="w-full border-collapse text-sm sm:text-base md:text-md lg:text-lg xl:text-lg">
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
                {order.cartItems.map((item: any, index) => (
                  <tr key={`${order.id}-${index}`}>
                    {/* عرض order.id فقط في الصف الأول بامتداد عدد الصفوف */}
                    {index === 0 && (
                      <td
                        rowSpan={order.cartItems.length}
                        className="align-middle font-semibold"
                      >
                        {item.id}
                      </td>
                    )}
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    {/* عرض totalPrice فقط في الصف الأول بامتداد عدد الصفوف */}
                    {index === 0 && (
                      <td
                        rowSpan={order.cartItems.length}
                        className="align-middle font-semibold"
                      >
                        ${totalPrice}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

   
       })}
    </div>
  </div>
    
</div>

</div>







  );
};

export default MyOrders;
