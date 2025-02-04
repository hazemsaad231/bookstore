import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { db } from "./firebase";
import Load from "../load/load";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

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


const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setSelectedDelete(id);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedDelete) {
      return;
    }
    try {
      await deleteDoc(doc(db, "orders", selectedDelete));
      toast.success("Order deleted successfully.", { autoClose: 2000 });
      console.log("Order deleted successfully.");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };


  const { id: userId } = useParams();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", userId], // مفتاح التخزين المؤقت
    queryFn: () => fetchOrders(userId!), // الدالة التي تجلب البيانات
    enabled: !!userId, // تأكد من عدم تنفيذ الجلب إلا إذا كان هناك userId
    refetchInterval: 500
  });

  return (
    <>
    <ToastContainer/>
{isLoading ? (<Load />) : (
  

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
<th><button className="my-2"><FaDeleteLeft size={20} onClick={() => handleClickOpen(order.id)}/></button></th>
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
)}
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            boxShadow: "20px", // لإزالة الظل من المربع
            backgroundColor: "white", // تغيير لون خلفية الحوار
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0)", // تغيير لون خلفية التعتيم للشفافية
          },
        }}
       >
        <DialogTitle>{"Are you sure you want to delete this order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={() =>{ handleDelete();
            handleClose()
          }}>Delete</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default MyOrders;
