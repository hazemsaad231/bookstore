import { Outlet } from "react-router-dom"
import Image from "../../pages/Auth/image"


const Master = () => {
    return (
        <div className="flex">
        <Image/>
        <Outlet/>
        </div>
    )
}

export default Master
