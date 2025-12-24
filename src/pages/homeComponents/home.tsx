import HeroSilde from "./hero"
import Category from "./categories"
import New from "./new"
import Feature from "./Featured"
import Offer from "./timer"
import Subscribe from "./email"
import Latest from "./articles"

const home = () => {

    



    return(
        <>
        <div>
        <HeroSilde/>
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