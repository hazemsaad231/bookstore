import img from '../../assets/img/img.jpeg'
const Image = () => {
    

    return(
        <>
        
            <img src={img} alt="" className=' hidden sm:hidden md:block lg:block xl:block h-screen w-1/2' />
            </>
    )
}

export default Image