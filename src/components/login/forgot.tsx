
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoLogoStencil } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Forgot = () => {

const navigate = useNavigate()

const {register,handleSubmit,formState:{errors}}=useForm();


const onSubmit=async(data:any)=>{
try{
    const response = await axios.post("https://upskilling-egypt.com:3007/api/auth/forgot-password",data)
    console.log(response)
    toast("email sent successfully")
    setTimeout(() => {
        navigate("/Reset")
    }, 2000);
    



}catch(error){
    console.error("Error:", error);
    toast.error("Failed to send email. Please try again.")
}
    
   
}

    return (
        <>
       <ToastContainer/>
       <div className="flex flex-col justify-center items-center text-center w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div className='p-8'> <IoLogoStencil className='w-20 h-20 text-indigo-700 m-auto'/></div>

        <h4 className="text-gray-500">Welcome back</h4>
        <h1 className="font-semibold text-xl">Forgot Password !!</h1>
      
        <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '22ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
        <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        {...register("email",{
          required:true,
           pattern:{
            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message:'invalid email'
          }
        })}
        className='bg-slate-100'
      />
      {errors.email && <span className='text-red-400 text-start text-sm'>email is required</span>}
      </div>
    </Box>
    <button type="submit" className="border-2 border-indigo-700 p-2 rounded-xl text-indigo-700 mt-4 px-8 text-center hover:bg-indigo-700 hover:text-white"
    >send</button>
    </form>
       
       </div>
        
       
   
    </>
    )
}


export default Forgot

