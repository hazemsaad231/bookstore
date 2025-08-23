import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogoStencil } from "react-icons/io5";
import { RESET_API } from '../Api/api';
import { Box, Tooltip } from '@mui/material';




export default function Reset() {


  const navigate = useNavigate()


const {register,handleSubmit,formState:{errors}}=useForm()


const onSubmit=async(data:any)=>{
try{
  const response = await axios.post(RESET_API,data)
  console.log(response)
  toast("password reset successfully")
  setTimeout(() => {
    navigate("/login")
  }, 2000);
 


}catch(error:any){
  console.log(error)
  toast.error(error.response.data.message || `Failed to reset password. Please try again` );
}
  
}
  return (
    <>
    <ToastContainer limit={1}/>


    <div className='flex h-screen  w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center p-4'>
      <div> 
         
           <div>
            <div className='p-8'> <IoLogoStencil className='w-20 h-20 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-lg text-start'>Welcome back!</h3>
            <h1 className='font-bold text-3xl mb-4'>Reset your Password Now!</h1>
        </div>
       <Box
    onSubmit={handleSubmit(onSubmit)}
    component="form"
    sx={{
      '& > :not(style)': { m: 2 , display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' },
    }}
      noValidate
      autoComplete="off"
    >

        <div className='flex flex-col gap-4'>
       <Tooltip title={typeof errors.email?.message === "string" ? errors.email.message : ""} open={!!errors.email} arrow>
              <TextField
              id="email-basic"
              label="email"
              type="email"
              variant="outlined"
              {...register("email",{
                required:"email is required",
                 pattern:{
                  value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message:'email is not valid'
                }
              })}
              error={!!errors.email}
              fullWidth
            />
            </Tooltip>
         <Tooltip title={typeof errors.otp?.message === "string" ? errors.otp.message : ""} open={!!errors.otp} arrow>
       <TextField
        id="outlined-basic"
        label="OTP"
        variant="outlined"
        {...register("otp",{
          required:"otp is required",
        })}
       error={!!errors.otp}
         fullWidth
         />
      </Tooltip>

      <Tooltip title={typeof errors.password?.message === "string" ? errors.password.message : ""} open={!!errors.password} arrow>
        <TextField
        id="outlined-basic"
        label="New Password"
        type="password"
        variant="outlined"
        {...register("password",{
          required:"password is required",
        })}
        error={!!errors.password}
        fullWidth
      />
      </Tooltip>

      </div>
    </Box>
    <div className='flex flex-col gap-2 mt-4'>
    <button type="submit" className='bg-indigo-700 text-white p-3 rounded-lg mt-4'
     onClick={handleSubmit(onSubmit)}>send</button>
      <button type="submit" className='border border-indigo-700 text-indigo-700 p-3 rounded-lg hover:bg-indigo-100'
     onClick={() => navigate('/login')}>Back to <span className='text-indigo-700'>Login</span></button>
   </div>

    </div>
    </div>
   

          
      
    </>
  );
}
