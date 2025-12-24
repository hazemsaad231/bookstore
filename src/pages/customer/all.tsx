import Cart from "../../pages/customer/myCart"
import Payment from "../../pages/customer/payment"

const All = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <Cart />
            </div>
            <div className="order-1 lg:order-2">
              <Payment />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default All
