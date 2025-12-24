import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"

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