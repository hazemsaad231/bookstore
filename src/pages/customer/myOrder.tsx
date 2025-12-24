import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Load from "../../ui/load";
import { useState } from "react";
import { FaDeleteLeft, FaBook} from "react-icons/fa6";
import axios from "axios";
import { Orders_API } from "../../Api/api";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { FaShoppingCart } from "react-icons/fa";
import { success} from '../../ui/toasts';  


const MyOrders = () => {

  const {id} = useParams();

  console.log(id)


  const getOrderDetails = async () => {
    return await axios.get(`${Orders_API}`)
  }

 
  const {data, isLoading} = useQuery(["orders", id], getOrderDetails, {
    refetchInterval: 2000
  })
console.log(data?.data.map((order: any) => order.userId))
  
const orders = data?.data?.filter((order: any) => order.userId === id);

  console.log("Filtered Orders:", orders);
  
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
{isLoading ? (<Load />) : (
  

    <div className="py-44 h-full p-4" >
      <div>
        <div className="p-6 w-[100%] sm:w-[90%] md:w-[70%] lg:w-[70%] xl:w-[70%] m-auto shadow-2xl border-t-[50px] border-primary rounded-2xl bg-gradient-to-br from-white to-gray-50">
          <h1 className="text-lg text-center mb-8 tracking-[0.2em]">
            My Orders
          </h1>
          <div className="space-y-6">
            {orders?.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <FaShoppingCart className="mx-auto text-gray-400 text-6xl mb-4" />
                <p className="text-xl text-gray-500 font-medium">No orders found for this user.</p>
                <p className="text-gray-400 mt-2">Start shopping to see your orders here!</p>
              </div>
            )}

            {orders?.map((order: any) => {
              const totalPrice = order.cartItems.reduce(
                (acc: number, item: any) => acc + item.quantity * item.price,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FaShoppingCart className="text-primary text-2xl" />
                      <h2 className="text-xl font-semibold text-gray-800">
                        Order #{order.orderNumber}
                      </h2>
                    </div>
                    <button
                      onClick={() => handleClickOpen(order.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                    >
                      <FaDeleteLeft size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {order.cartItems.map((item: any, index: number) => (
                      <div
                        key={`${order.id}-${index}`}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FaBook className="text-primary text-lg" />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">EGP{item.price}</p>
                          <p className="text-sm text-gray-600">Subtotal: EGP{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Price:</span>
                      <span className="text-xl font-bold text-primary">EGP{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
)}
 <ConfirmDialog
  open={open}
  title="Are you sure delete this order?"
  onClose={handleClose}
  onConfirm={()=>{handleDelete();handleClose()}}
  confirmText="Delete"
  cancelText="Close"
/>
    </>
  );
};

export default MyOrders

