import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { IoLogoStencil } from "react-icons/io5";
import { Tooltip } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';



const Forgot = () => {


const {register,handleSubmit,formState:{errors}}=useForm();

const {forgotPassword,loading}=useAuth();
const onSubmit=async(data:any)=>{

  forgotPassword(data.email);
}




    return (
        <>
       <div className="flex flex-col justify-center items-center h-screen text-center w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div className='p-8'> <IoLogoStencil className='w-32 h-24 text-indigo-700 m-auto'/></div>

        <h4 className="text-gray-500">Welcome back</h4>
        <h1 className="font-semibold text-3xl">Forgot Password !!</h1>
      
        <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '22ch' },
      }}
      noValidate
      autoComplete="off"
    >   <Tooltip title={typeof errors.email?.message === "string" ? errors.email.message : ""} open={!!errors.email} arrow>
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
    </Box>
    <button type="submit" 
    className="border-2 border-indigo-700 p-2 rounded-xl text-indigo-700 mt-4 px-8 text-center hover:bg-indigo-700 hover:text-white">
      {loading ? "Loading..." : "send"}</button>
    </form>
       
     </div>
        
       
   
    </>
    )
}


export default Forgot

