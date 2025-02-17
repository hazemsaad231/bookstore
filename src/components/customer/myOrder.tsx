import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Load from "../load/load";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";


const MyOrders = () => {

  const {id} = useParams();

  console.log(id)


  const getOrderDetails = async () => {
    return await axios.get(`https://backend-production-65d5.up.railway.app/orders`)
  }

 
  const {data, isLoading} = useQuery(["orders", id], getOrderDetails, {
    refetchInterval: 1000
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
    await axios.delete(`https://backend-production-65d5.up.railway.app/orders/${selectedDelete}`);
    toast.success("Order deleted successfully.", { autoClose: 2000 });
    console.log("Order deleted successfully.");
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};




  return (
    <>
    <ToastContainer/>
{isLoading ? (<Load />) : (
  

    <div className="py-44 h-full p-4" style={{ backgroundColor: "rgb(250, 245, 239)" }}>
      <div>
        <div className="p-4 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[60%] m-auto bg-white shadow-2xl rounded-xl">
          <h1 className="text-lg text-center mb-8 tracking-[0.2em]">
            My Orders
          </h1>
          <div className="space-y-6">
            {orders?.length === 0 && !isLoading && (
              <p className="text-center text-gray-500">No orders found for this user.</p>
            )}

            {orders?.map((order: any) => {
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
                        <th className="px-4">Order ID</th>
                        <th className="px-3">Product Name</th>
                        <th className="px-3">Quantity</th>
                        <th className="px-3">Price</th>
                        <th className="px-3">Total Price</th>
<th><button className="m-2"><FaDeleteLeft size={20} onClick={() => handleClickOpen(order.id)}/></button></th>
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
                          <td className="p-3">{item.name}</td>
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
        <DialogTitle sx={{ fontSize: "1rem"}}>{"Are you sure you want to delete this order?"}</DialogTitle>
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

export default MyOrders
