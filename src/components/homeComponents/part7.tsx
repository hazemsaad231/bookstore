import latest1 from "../../assets/img/latest1.jpg"
import latest2 from "../../assets/img/latest2.jpg"
import latest3 from "../../assets/img/latest3.jpg"
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import React from "react";




const Latest = () => {




    return(
        <>
        <div>
            <div className="flex flex-col gap-4 justify-center items-center py-12">
                <p className="text-gray-400">READ OUR ARTICLES</p>
              
                    <h1 className="text-5xl font-semibold text-center text-indigo-800">Latest Articles</h1>
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-12 p-4 my-5">
                    <div className="flex flex-col gap-2">
                    <img src={latest1} alt="" className="w-full h-60 rounded-xl" loading="lazy"/>
                    <p className="text-gray-500"> 2 Aug,2022</p>
                    <h1 className="text-indigo-900 text-2xl w-60">Reading Books Always Makes The Moments Happy </h1>
                    <hr />
                    <div className="flex gap-5">
                        <CiFacebook className="text-lg text-indigo-600"/>
                        <FaInstagram className="text-lg text-indigo-600"/>
                        <FaTwitter className="text-lg text-indigo-600"/>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                    <img src={latest2} alt="" className="w-full h-60 rounded-xl"  loading="lazy"/>
                    <p className="text-gray-500"> 2 Aug,2022</p>
                    <h1 className="text-indigo-900 text-2xl w-60"> Reading Books Always Makes The Moments Happy</h1>
                    <hr />
                    <div className="flex gap-5">
                        <CiFacebook className="text-lg text-indigo-600"/>
                        <FaInstagram className="text-lg text-indigo-600"/>
                        <FaTwitter className="text-lg text-indigo-600"/>
                    </div>
                    </div>

                    <div className="flex flex-col gap-2">
                    <img src={latest3} alt="" className="w-full h-60 rounded-xl"  loading="lazy"/>
                    <p className="text-gray-500 "> 2 Aug,2022</p>
                    <h1 className="text-indigo-900 text-2xl w-60"> Reading Books Always Makes The Moments Happy</h1>
                    <hr />
                    <div className="flex gap-5">
                        <CiFacebook className="text-lg text-indigo-600"/>
                        <FaInstagram className="text-lg text-indigo-600"/>
                        <FaTwitter className="text-lg text-indigo-600"/>
                    </div>
                    </div>

                </div>
            </div>




        </div>
        
        </>
    )
}

export default React.memo(Latest); 