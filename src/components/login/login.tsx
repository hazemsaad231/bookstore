import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogoStencil } from "react-icons/io5";


export default function Login() {


  let navigate = useNavigate()


const {register,handleSubmit,formState:{errors}}=useForm()


const onSubmit=async(data:any)=>{
try{
  let response = await axios.post("https://upskilling-egypt.com:3007/api/auth/login",data)
  console.log(response)
  toast("login successfully")
  localStorage.setItem("token",response.data.data.accessToken)
  localStorage.setItem("role",response.data.data.profile.role)
  console.log(response.data.data.accessToken)
  localStorage.setItem("data",window.JSON.stringify(response.data.data.profile))
  console.log(response.data.data.profile)
  setTimeout(() => {
    navigate("/home")
  }, 2000);
 


}catch(error){
  console.error("Error:", error);
  toast.error("Failed to login. Please try again.");
}
}
  return (
    <>
    <ToastContainer/>


    <div className='flex h-screen  w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center'>
      <div> 
         
           <div>
            <div className='p-8'> <IoLogoStencil className='w-20 h-20 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-lg text-start'>Welcome back!</h3>
            <h1 className='font-bold text-2xl mb-4'>Login to your account</h1>
        </div>

    <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '24ch' },
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
      <div className='mt-4'><TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        {...register("password",{
          required:true,
         
          
        })}
        className='bg-slate-100'
      />
      {errors.password && <span className='text-red-400 text-start text-sm '>password is required</span>} </div>
      </div>

      </Box>



      <div className='flex gap-12 text-sm mt-4'>

    <div className='flex'>
        <input type="checkbox"  className='mt-1'/>
        <span className='ml-2 text-indigo-800'>Remember me</span>
      </div>

      <div className='text-right text-indigo-800 cursor-pointer'
      
      onClick={()=>navigate("/Forgot")}>Forgot Password?</div>
      </div>

    
      
 
    <div className='flex flex-col gap-2'> <button type="submit" className='bg-indigo-700 text-white p-3 rounded-lg mt-4'>Login</button>
    <button className='border border-indigo-700 p-3 rounded-lg  mt-4 text-indigo-700 hover:bg-indigo-100' onClick={()=>navigate("/register")}>Register</button></div>
    </form>
    </div>
   
      </div>
   

          
      
    </>
  );
}
