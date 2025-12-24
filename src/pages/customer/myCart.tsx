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
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-14">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

      {cart.cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add some books to get started!</p>
        </div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-4">
            {cart.cartItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt="Book" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-primary font-bold">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="w-8 h-8 bg-primary text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-8 h-8 bg-primary text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${item.price * item.quantity}</p>
                    <button
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-4 text-left">Book</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <img src={item.image} alt="Book" className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                    <td className="p-4 text-center text-primary font-bold">${item.price}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="w-8 h-8 bg-primary text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="w-8 h-8 bg-primary text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold text-primary">${item.price * item.quantity}</td>
                    <td className="p-4 text-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
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

          {/* Summary */}
          <div className="mt-6 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Books:</span>
                <span className="font-bold text-primary">{cart.cartAmount}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-primary">${cart.cartTotal}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
