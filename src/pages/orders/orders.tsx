import { useDispatch } from "react-redux";
import { updateOrder } from "@/redux/counter";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Load from "@/ui/load";
import { FaEnvelope, FaUser, FaCalendarAlt, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { Orders_API } from "@/Api/api";
import ConfirmDialog from "@/ui/ConfirmDialog";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Typography } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { success } from '@/ui/toasts';  


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
      success("Order deleted successfully.");
      console.log("Order deleted successfully.");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      {isLoading ? 
        <Load />
       : 
        <div className="py-20">
        <div className="m-4">
          <div className="border-t-[40px] border-primary bg-white overflow-x-auto mt-12 rounded-xl shadow-xl m-auto p-4 w-full sm:w-full md:w-5/6 lg:w-2/3 xl:w-2/3" >
            <h1 className="text-xl font-semibold text-center mb-8 tracking-[0.2em]">Orders list</h1>
              {orders.length === 0 ?
              <Box
  sx={{
    textAlign: "center",
    py: 2,
    color: "gray",
  }}
>
  <InboxIcon sx={{ fontSize: 60, color: "gray" }} />
  <Typography variant="h6" sx={{ mt: 2 , fontSize: 15 }}>
    No Orders Found
  </Typography>
</Box>

 :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order: Order, index: number) => {
                const totalPrice: number = order.cartItems.reduce((total, item) => {
                  return total + parseFloat(item.price) * item.quantity;
                }, 0);

                return (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-primary">
                        Order #{order.orderNumber}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-gray-500" />
                        <p className="text-sm text-gray-700">
                          <strong>Email:</strong> {order.email}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-gray-500" />
                        <p className="text-sm text-gray-700">
                          <strong>Customer:</strong> {order.delivery_address.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <p className="text-sm text-gray-700">
                          <strong>Date:</strong> {order.timestamp.slice(0, 10)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-green-500" />
                        <p className="text-sm text-gray-700">
                          <strong>Total:</strong> EGP{totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaShoppingCart className="text-blue-500" />
                        <p className="text-sm text-gray-700">
                          <strong>Items:</strong> {order.cartItems.length}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white transition-all duration-200 transform hover:scale-105">
                          <Link to={`/orderDetails/${order.id}`}>View Details</Link>
                        </Button>
                        <button
                          onClick={() => handleClickOpen(order.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                          title="Delete Order"
                        >
                          <FaDeleteLeft size={18} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            }
          </div>
        </div>
      </div>}
      <ConfirmDialog
  open={open}
  title="Are you sure delete this order?"
  onClose={handleClose}
  onConfirm={() => {
    handleDelete();
      handleClose()}}
  confirmText="Delete"
  cancelText="Close"
  sx={{
    "& .MuiDialog-paper": {
      boxShadow: "0px 8px 24px rgba(0,0,0,0.3)", // custom shadow
      borderRadius: "12px", // ممكن تزود كمان لو عايز corners ناعمة
    },
  }}
/>

    </>
  );
};

export default Orders;
