import { ToastContainer } from "react-toastify"
import Silde from "./part1"
import Category from "./part2"
import New from "./part3"
import Feature from "./part4"
import Offer from "./part5"
import Subscribe from "./part6"
import Latest from "./part7"

const home = () => {

    



    return(
        <>
        <ToastContainer/>
        <div>
        <Silde/>
        <Category/>
        <New/>
        <Feature/>
        <Offer/>
        <Subscribe/>
        <Latest/>
        </div>
        </>
    )


}

export default home