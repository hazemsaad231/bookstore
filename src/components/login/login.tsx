import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogoStencil } from "react-icons/io5";
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { Login_API } from '../Api/api';



export default function Login() {

  const navigate = useNavigate()


const [loading, setLoading] = useState(false);

// {react hook form}
const {register,handleSubmit,formState:{errors}}=useForm<{email:string,password:string}>() 



// {تسجيل الدخول}
const onSubmit=async(data:any)=>{
try{
  const response = await axios.post(Login_API,data)
  toast("login successfully")
  localStorage.setItem("token",response.data.data.accessToken)
  localStorage.setItem("role",response.data.data.profile.role)
  localStorage.setItem("data",window.JSON.stringify(response.data.data.profile))
  setLoading(true)
  setTimeout(() => {
    navigate("/home")
  }, 2000);

}catch(error:any){
  console.error("Error:", error);
  if(Array.isArray(error.response.data.message)){
    toast.error(error.response.data.message[0]);
}else{
  toast.error(error.response.data.message);
}
}
}



  return (
    <>
    <ToastContainer limit={1}/>

    <div className='flex h-screen  w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center'>
      <div> 
         
           <div>
     <div className='py-8'> <IoLogoStencil className='w-32 h-24 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-xl text-start'>Welcome back!</h3>
            <h1 className='font-bold text-2xl mb-4'>Login to your account</h1>
        </div>



        <Box
    onSubmit={handleSubmit(onSubmit)}
    component="form"
    sx={{
      '& > :not(style)': { m: 2, width: '25ch' , display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' },
    }}
      noValidate
      autoComplete="off"
    >




        <div>
          <Tooltip title={errors.email?.message} open={!!errors.email} arrow>
        <TextField
        id="email-basic"
        label="email"
        type="email"
        variant="outlined"
        {...register("email",{
          required:"email is required",
           pattern:{
            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message:'email is valid'
          }
        })}
        error={!!errors.email}
        fullWidth
      />
      </Tooltip>

       <Tooltip title={errors.password?.message} open={!!errors.password} arrow>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          fullWidth
        />
      </Tooltip>
      
      </div>
      </Box>

      <div className='flex gap-10 text-sm mt-4'>

<div className='flex'>
 <input type="checkbox"  className='mt-1'/>
 <span className='ml-2 text-indigo-800'>Remember me</span>
</div>

<div className='text-right text-indigo-800 cursor-pointer'onClick={()=>navigate("/Forgot")}>Forgot Password?</div>
</div>

<div className='flex flex-col gap-2'>
<button type="submit" className='bg-indigo-700 text-white p-3 rounded-lg mt-4' onClick={handleSubmit(onSubmit)}>{loading ? "Loading..." : "Login"}</button>

<button className='border border-indigo-700 p-3 rounded-lg  mt-4 text-indigo-700 hover:bg-indigo-100' onClick={()=>navigate("/register")}>Register</button>
</div>
     

</div>


      
      </div> 
   

          
      
    </>
  );
}

