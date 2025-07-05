import { useDispatch } from "react-redux";
import { updateOrder } from "../../redux/counter";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Load from "../load/load";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import { Orders_API } from "../Api/api";

interface Order {
  email: string;
  id: string;
  orderNumber: number;
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




const Orders = () => {

  const dispatch = useDispatch();

  const fetchOrders = async () => {
    return await axios.get(Orders_API);
  };
  const { data , isLoading } = useQuery( "orders", fetchOrders,{
    refetchInterval: 500,
  });

  const orders = data?.data;

  console.log(orders)
  // إرسال الطلبات إلى Redux عند تحميل البيانات
  if (!isLoading) dispatch(updateOrder(orders));

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
      await axios.delete(`${Orders_API}/${selectedDelete}`);
      toast.success("Order deleted successfully.", { autoClose: 2000 });
      console.log("Order deleted successfully.");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
   <ToastContainer/>
      {isLoading ? 
        <Load />
       : 
        <div className="pb-44 pt-24">
        <div className="m-4">
          <div className="border-t-[40px] border-[rgb(237,85,59)] bg-white overflow-x-auto mt-12 rounded-xl shadow-xl m-auto p-4 w-full sm:w-full md:w-5/6 lg:w-2/3 xl:w-2/3" >
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
                {orders.map((order: Order, index: number) => {
                  const totalPrice: number = order.cartItems.reduce((total, item) => {
                    return total + parseFloat(item.price) * item.quantity;
                  }, 0);

                  return (
                    <tr key={index}>
                      <td className="p-4">{order.email}</td>
                      <td className="p-6">{order.orderNumber}</td>
                      <td className="p-6">{order.delivery_address.name}</td>
                      <td className="p-4">{order.timestamp.slice(0, 10)}</td>
                      <td className="p-4">{totalPrice.toFixed(2)}$</td>
                      <td className="p-4">
                        <button className="bg-[rgb(237,85,59)] px-2 py-1 text-white rounded-full">
                          <Link to={`/home/orderDetails/${order.id}`}>View</Link>
                        </button>
                      </td>
                      <td className="p-4"><button className="py-1" onClick={() => handleClickOpen(order.id)}><FaDeleteLeft size={20} className="text-[rgb(237,85,59)]"/></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
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
        <DialogTitle sx={{fontSize:"1rem" }}>{"Are you sure you want to delete this order?"}</DialogTitle>
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

export default Orders;
