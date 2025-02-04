import { lazy, Suspense } from 'react';
import { ToastContainer } from "react-toastify"
import BookSkeleton from '../loaded';
const Slide = lazy(() => import("./part1"))
const Category = lazy(() => import("./part2"))
const New = lazy(() => import("./part3"))
const Feature = lazy(() => import("./part4"))
const Offer = lazy(() => import("./part5"))
const Subscribe = lazy(() => import("./part6"))
const Latest = lazy(() => import("./part7"))
const home = () => {

    



    return(
        <>
        <ToastContainer/>
        <div>
       <Suspense fallback={<div><BookSkeleton/></div>}>
        <Slide/>
        <Category/>
        <New/>
        <Feature/>
        <Offer/>
        <Subscribe/>
        <Latest/>
        </Suspense>
        </div>
        </>
    )


}

export default home