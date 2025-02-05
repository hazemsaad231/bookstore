import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { decreaseCart, increaseCart, removeFromCart } from "../../redux/counter";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch();

  const handleDelete = (item: any) => {
    dispatch(removeFromCart({ id: item.id }))
  }

  const handleDecrease = (item: any) => {
    dispatch(decreaseCart({ id: item.id }))
  }

  const handleIncrease = (item: any) => {
    dispatch(increaseCart({ id: item.id }))
  }







  return (
    <div className=" w-[90%] sm:w-[80%] md:w-[55%] lg:w-[70%] xl:w-[70%] m-auto">
      {/* عرض رسالة في حالة العربة فارغة */}
      {cart.cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600 shadow-xl rounded-xl p-8 mt-8">
          Your cart is empty. Please add some books to your cart.
        </div>
      ) : (
        <>
          {/* عرض العربة */}
<div className="overflow-x-auto mt-12 rounded-xl shadow-xl">
  <table className="w-full border-collapse bg-gray-100">
    <thead className="mb-4 rounded-full">
      <tr className=" bg-[rgb(237,85,59)] text-white">
        <th className="p-4 text-center">Book</th>
        <th className="p-4 text-center">Name</th>
        <th className="p-4 text-center">Price</th>
        <th className="p-4 text-center">Quantity</th>
        <th className="p-4 text-center">Total Price</th>
        <th className="p-4 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {cart.cartItems.map((item) => (
        <tr key={item.id} className="">
          <td className="p-4 text-center">
            <img src={item.image} alt="Book" className="w-16 m-auto" />
          </td>
          <td className="p-4 text-center">{item.name}</td>
          <td className="p-4 text-center">${item.price}</td>
          <td className="p-12 text-center flex justify-center items-center  gap-4">
            <h5
              onClick={() => handleDecrease(item)}
              className="cursor-pointer bg-[rgb(237,85,59)] text-white text-xl hover:bg-[rgb(207,35,59)] rounded-full p-2"
            >
              -
            </h5>
            <span >{item.quantity}</span>
            <h5
              onClick={() => handleIncrease(item)}
              className="cursor-pointer bg-[rgb(237,85,59)] text-white text-xl hover:bg-[rgb(207,35,59)] rounded-full p-2"
            >
              +
            </h5>
          </td>
          <td className="p-4 text-center">${item.price * item.quantity}</td>
          <td className="p-4 text-center">
            <button
              className="bg-[rgb(237,85,59)] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(item)}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



          {/* عرض إجمالي الكتب والسعر */}
          <div className="mt-4 shadow-xl rounded-xl text-center bg-gray-100">
          <table className="w-full rounded-xl">
  <thead>
    <tr>
      <th className="p-4 text-center w-full"colSpan={2}>
        summary
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="p-4 text-center">Total books</td>
      <td className="p-4 text-center font-bold text-red-600">{cart.cartAmount}</td>
    </tr>
    <tr>
      <td className="p-2 text-center">Total price</td>
      <td className="p-4 text-center font-bold text-red-600">${cart.cartTotal}</td>
    </tr>
  </tbody>
</table>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
