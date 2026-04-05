import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoLogoStencil } from "react-icons/io5";
import { Autocomplete, Tooltip, InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const options = ["Customer", "Admin"];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { first_name: "", last_name: "", email: "", password: "", role: "Customer" }
  });

  const { Register, loading } = useAuth();
  
  const onSubmit = async (data: any) => {
    Register(data);
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 4px 20px -5px rgba(99, 102, 241, 0.15)',
      }
    },
  };

  return (
    <div className="min-h-screen w-full md:w-1/2 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="w-full max-w-[440px] bg-white backdrop-blur-xl border border-white p-10 rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.4)] relative z-10 transition-all duration-300">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
            <IoLogoStencil className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
            Register
          </h1>
          <p className="text-gray-500 mt-2 text-center text-sm font-medium">
            Create a new account to get started.
          </p>
        </div>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          <div className="flex gap-3">
            <Tooltip title={errors.first_name?.message} open={!!errors.first_name} arrow placement="top">
              <TextField
                id="first_name"
                label="First Name"
                type="text"
                variant="outlined"
                fullWidth
                {...register("first_name", {
                  required: "First name is required",
                })}
                error={!!errors.first_name}
                sx={inputStyles}
              />
            </Tooltip>

            <Tooltip title={errors.last_name?.message} open={!!errors.last_name} arrow placement="top">
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                {...register("last_name", {
                  required: "Last name is required",
                })}
                error={!!errors.last_name}
                sx={inputStyles}
              />
            </Tooltip>
          </div>

          <Tooltip title={errors.email?.message} open={!!errors.email} arrow placement="top">
            <TextField
              id="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email"
                }
              })}
              error={!!errors.email}
              sx={inputStyles}
            />
          </Tooltip>

          <Tooltip title={errors.password?.message} open={!!errors.password} arrow placement="top">
            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              sx={inputStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      sx={{ color: 'gray' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>

          <Autocomplete
            id="role-select"
            options={options}
            defaultValue={options[0]}
            fullWidth
            renderInput={(params) => (
              <TextField 
                {...params}
                label="Role" 
                variant="outlined"
                {...register("role", {
                  required: 'Role is required',
                })}
                error={!!errors.role}
                sx={inputStyles}
              />
            )}
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-xl font-bold text-base transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(79,70,229,0.6)] active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Register"}
            </span>
            <div className="absolute inset-0 h-full w-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="mt-1 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors decoration-2 hover:underline underline-offset-4"
              >
                Login
              </button>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}
