import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogoStencil } from "react-icons/io5";
import { Autocomplete } from '@mui/material';




const options = ["Customer", "Admin"]
export default function Register() {


  let navigate = useNavigate()


const {register,handleSubmit,formState:{errors}}=useForm({ defaultValues: {first_name:"" , last_name:"", email: "", password: "" , role:"Customer"} })


const onSubmit=async(data:any)=>{


try{
  let response = await axios.post("https://upskilling-egypt.com:3007/api/auth/register",data)
  console.log(response)
  toast("register successfully")
  setTimeout(() => {
    navigate("/login")
  }, 2000);
}catch(error){
    console.error("Error:", error);
    toast.error("Failed to register. Please try again.");
  
}
  

}



  return (
    <>
    <ToastContainer/>


    <div className='flex h-screen  w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center'>
      <div> 
         
           <div>
            <div className='py-8'> <IoLogoStencil className='w-20 h-20 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-lg text-center'>Create new account</h3>
            <h1 className='font-bold text-2xl text-center mb-4'>Register</h1>
        </div>
 
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& > :not(style)': { m: 2, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='flex gap-3 '>
            
         <div>
      <TextField
        id="outlined-basic"
        label="firstName"
        variant="outlined"
        {...register("first_name",{
          required:true,
          
        })}
        className='bg-slate-100'
      />
      {errors.first_name && <span className='text-red-400 text-start text-sm'>firstname is required</span>}
      </div>

      <div>
      <TextField
        id="outlined-basic"
        label="lastName"
        variant="outlined"
        {...register("last_name",{
          required:true,
        })}
        className='bg-slate-100'
      />
      {errors.last_name && <span className='text-red-400 text-start text-sm'>lastname is required</span>}
      </div>

      </div>


      <div className='flex flex-col'><TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        {...register("password",{
          required:true,
        })}
        className='bg-slate-100'
      />
      {errors.password && <span className='text-red-400 text-start text-sm '>password is required</span>} 
      </div>
       
     <div className='flex flex-col'><TextField
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
      </div>
        
<div>
<Autocomplete
        id="controllable-states-demo"
        options={options}
        sx={{
         m: 2, width: '35ch' ,margin:"0 auto",
        }}
        renderInput={(params) =>
        <TextField {...params}
         label="role" 
         variant="outlined"
        {...register("role",{
          required:true,
        })}></TextField> }
        className='bg-slate-100'
      />
      {errors.role && <span className='text-red-400 text-start text-sm'>role is required</span>}
</div>
    
    

      

    <div className='flex flex-col gap-2'> <button type="submit" className='bg-indigo-700 text-white p-3 rounded-lg px-20 mt-4'>Register</button>
    <button className='border border-indigo-700 p-3 rounded-lg px-20 mt-4 text-indigo-700 hover:bg-indigo-100' onClick={()=>navigate("/login")}>Login</button></div>
    </Box>
    
    </div>
      </div>
   

          
      
    </>
  );
}
