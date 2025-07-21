import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogoStencil } from "react-icons/io5";





export default function Reset() {


  const navigate = useNavigate()


const {register,handleSubmit,formState:{errors}}=useForm()


const onSubmit=async(data:any)=>{
try{
  const response = await axios.post("https://upskilling-egypt.com:3007/api/auth/reset-password",data)
  console.log(response)
  toast("password reset successfully")
  setTimeout(() => {
    navigate("/login")
  }, 2000);
 


}catch(error){
  console.log(error)
  toast.error(`Error: "Failed to reset password. Please try again."}`);
}
  
}
  return (
    <>
    <ToastContainer limit={1}/>


    <div className='flex h-screen  w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center'>
      <div> 
         
           <div>
            <div className='p-8'> <IoLogoStencil className='w-20 h-20 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-lg text-start'>Welcome back!</h3>
            <h1 className='font-bold text-2xl mb-4'>Reset your Password Now!</h1>
        </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
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
            message:'email is valid'
          }
        })}
        className='bg-slate-100'
      />
      {errors.email && <span className='text-red-400 text-start text-sm'>email is required</span>}
      <div className='mt-4'> <TextField
        id="outlined-basic"
        label="OTP"
        variant="outlined"
        {...register("otp",{
          required:true,
        })}
        className='bg-slate-100'
      />
      {errors.otp && <span className='text-red-400 text-start text-sm'>otp is required</span>}</div>
      <div className='mt-6'>
        <TextField
        id="outlined-basic"
        label="New Password"
        type="password"
        variant="outlined"
        {...register("password",{
          required:true,
         
          
        })}
        className='bg-slate-100'
      />
      {errors.password && <span className='text-red-400 text-start text-sm '>password is required</span>}</div>


      </div>

      </Box>

      <div className='flex gap-12 text-sm mt-4'>

    <div className='flex'>
        <input type="checkbox"  className='mt-1'/>
        <span className='ml-2 text-indigo-800'>Remember me</span>
      </div>
      </div>

 
    <div className='flex flex-col gap-2 mt-8'>
    <button type="submit" className='bg-indigo-700 text-white p-3 rounded-lg px-20 mt-4'>send</button>
         <button type="submit" className='border border-indigo-700 text-indigo-700 p-3 rounded-lg px-20 hover:bg-indigo-100'
         onClick={() => navigate('/login')}>Back to <span className='text-indigo-700'>Login</span></button>
   </div>
   


    </form></div>
      </div>
   

          
      
    </>
  );
}
