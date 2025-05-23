
const Subscribe = () => {

return(

    <>
    <div className="bg-[rgb(250, 245, 239)] my-10 w-full flex justify-center">

        <div className="bg-[rgb(237,85,59)] flex flex-col gap-3 justify-center items-center w-[80%] m-auto p-20 mx-10 mb-20">

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">Subscibe to Our Newsletter</h1>
            <p className="text-white">Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet, consectetur. Elit adipiscing enim pharetra hac.</p>
            
            <div className="p-4 shadow-xl rounded-xl  bg-white flex relative top-28 ">
            <input type="text" placeholder="Enter your email" className="shadow appearance-none border rounded-l-xl w-36 p-2 text-gray-700 " />
            <button className="bg-[rgb(237,85,59)] px-1 py-2 text-white rounded-r-xl">SUBSCRIBE</button></div>
        </div>
       
    </div>
    
    
    </>
)

}

export default Subscribe