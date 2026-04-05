import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoLogoStencil } from "react-icons/io5";
import { Autocomplete, Tooltip, InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const options = ["Customer", "Admin"]
export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()


const {register,handleSubmit,formState:{errors}}=useForm(
  { defaultValues: {first_name:"" , last_name:"", email: "", password: "" , role:"Customer"} }
)

const {Register , loading }=useAuth();
const onSubmit=async(data:any)=>{
    Register(data);
}



  return (
    <>
  


    <div className='flex h-full w-[100%] sm:w-[100%] md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center'>
      <div className='flex justify-center items-center h-screen flex-col'> 
         
           <div>
            <div className='py-2'> <IoLogoStencil className='w-32 h-24 text-indigo-700 m-auto'/></div>
           
            <h3 className='text-gray-500 text-xl text-center'>Create new account</h3>
            <h1 className='font-bold text-4xl text-center mb-2'>Register</h1>
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
        <div className='flex flex-col gap-3 '>
            
         <div className='flex gap-x-3'>
          <Tooltip title={errors.first_name?.message} open={!!errors.first_name} arrow>
      <TextField
        id="outlined-basic"
        label="firstName"
        type='text'
        variant="outlined"
        {...register("first_name",{
          required:'first name is required',
          
        })}
        error={!!errors.first_name}
      />
      </Tooltip>
<Tooltip title={errors.last_name?.message} open={!!errors.last_name} arrow>
      <TextField
        id="outlined-basic"
        label="lastName"
        variant="outlined"
        {...register("last_name",{
          required:'last name is required',
        })}
        error={!!errors.last_name}
      />
      </Tooltip>
      </div>


<Tooltip title={errors.password?.message} open={!!errors.password} arrow>
      <TextField
        id="outlined-basic"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        {...register("password",{
          required:'password is required',
        })}
        error={!!errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      </Tooltip>
      
     <Tooltip title={errors.email?.message} open={!!errors.email} arrow>
       
     <TextField
        id="outlined-basic"
        label="email"
        type='email'
        variant="outlined"
        {...register("email",{
          required:"email is required",
           pattern:{
            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message:'email is valid'
          }
        })}
        error={!!errors.email}
      />
      </Tooltip>

<Autocomplete
        id="controllable-states-demo"
        options={options}
        defaultValue={options[0]}
        sx={{
         m: 2, width: '35ch' ,margin:"0 auto",
        }}
        renderInput={(params) =>
        <TextField {...params}
         label="role" 
         variant="outlined"
        {...register("role",{
          required:'role is required',
        })}
        />
       }

      />

    </div>
    

      

    <div className='flex flex-col gap-2'> <button type="submit"
     className='bg-indigo-700 text-white p-2.5 rounded-lg px-20 mt-2'>{loading ? "Loading..." : "Register"}</button>
    <button className='border border-indigo-700 p-2.5 rounded-lg px-20 mt-1 text-indigo-700 hover:bg-indigo-100'
     onClick={()=>navigate("/login")}>Login</button></div>
    </Box>
    
    </div>
      </div>
   

          
      
    </>
  );
}
