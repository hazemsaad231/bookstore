import { ToastContainer } from "react-toastify"
import Cart from "./cart"
import Payment from "./payment"


const All = () => {
  
  return(
    <div className="flex flex-col gap-6 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center px-10 py-20 ">
    <ToastContainer/>
    <Cart/>
    <Payment/>
    </div>
  )
}

export default All