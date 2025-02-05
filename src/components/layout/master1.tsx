import { Outlet } from "react-router-dom"
import Navbar from "../navbar/navbar"
import Footer from "../footer/footer"

const Master1 = () => {
    return (
        <div>
            <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
    )
}

export default Master1