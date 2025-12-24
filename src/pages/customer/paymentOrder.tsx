import { GrCompliance } from "react-icons/gr";
import { useLocation } from "react-router-dom";

const Order = () => {

  const location =  useLocation();

    const {orderNumber} = location.state;
    
    console.log("data:", orderNumber);


    return (
        <div className="flex flex-col justify-center gap-5 items-center">

            <div className="shadow-xl bg-slate-100 rounded-xl mb-10 mt-20 p-20 mx-20 m-auto">
                <div className="flex justify-center mb-4"><GrCompliance size={100} color="indigo"/></div>
                <h1 className="text-5xl font-semibold text-center text-indigo-800">order successful</h1>
                <p className="text-sm font-semibold text-center mt-2 text-gray-600">your order is on the way</p>
                <h2 className="text-xl font-semibold mt-10 text-center text-gray-600">order number :{orderNumber} </h2>
            </div>
            
        </div>
    )
}

export default Order