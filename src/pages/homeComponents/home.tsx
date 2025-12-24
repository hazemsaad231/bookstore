import HeroSilde from "@/pages/homeComponents/hero"
import Category from "@/pages/homeComponents/categories"
import New from "@/pages/homeComponents/new"
import Feature from "@/pages/homeComponents/Featured"
import Offer from "@/pages/homeComponents/timer"
import Subscribe from "@/pages/homeComponents/email"
import Latest from "@/pages/homeComponents/articles"

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