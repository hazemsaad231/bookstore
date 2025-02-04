import { Outlet } from "react-router-dom"
import { lazy, Suspense } from 'react';
import BookSkeleton from '../load/loaded';

const Footer = lazy(() => import("../footer/footer"))
const Navbar = lazy(() => import("../navbar/navbar"))
const Master1 = () => {
    return (
        <div>
            <Suspense fallback={<div><BookSkeleton/></div>}>
            <Navbar/>
          <Outlet/>
          <Footer/>
          </Suspense>
        </div>
    )
}

export default Master1