import { Outlet } from "react-router-dom"
import Image from "../login/image"


const Master = () => {
    return (
        <div className="flex ">
        <Image/>
          <Outlet/>
        </div>
    )
}

export default Master
