import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Ldata } from "./data";
import {For} from 'million/react';



const Latest = () => {




    return(
        <>
        
            <div className="flex flex-col gap-4 justify-center items-center py-8">
                <p className="text-gray-400">READ OUR ARTICLES</p>
              
                    <h1 className="text-5xl font-semibold text-center text-indigo-800">Latest Articles</h1>
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-12 p-4 my-5">

                  <For each={Ldata}>
                {(late,index)=>
                    
                    <div key={index} className="flex flex-col gap-2">
                        
                    <img src={late.img} alt="" className="w-full h-60 rounded-xl"/>
                    <p className="text-gray-500">{late.date}</p>
                    <h1 className="text-indigo-900 text-2xl w-60">{late.description} </h1>
                    <hr />
                    <div className="flex gap-5">
                        <CiFacebook className="text-lg text-indigo-600"/>
                        <FaInstagram className="text-lg text-indigo-600"/>
                        <FaTwitter className="text-lg text-indigo-600"/>
                    </div>
                    
                    </div>
                }
                </For>
                </div>
            </div>




        
        
        </>
    )
}

export default Latest; 