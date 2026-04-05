import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoLogoStencil } from "react-icons/io5";
import { Tooltip, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{email:string,password:string}>() 
  const { login, loading } = useAuth();
  
  const onSubmit = (data: any) => {
    login(data);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full md:w-1/2 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      

      <div className="w-full max-w-[440px] bg-white backdrop-blur-xl border border-white p-10 rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.4)] relative z-10 transition-all duration-300">
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <IoLogoStencil className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
            Welcome back!
          </h1>
          <p className="text-gray-500 mt-2 text-center text-sm font-medium">
            Please enter your details to login to your account.
          </p>
        </div>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
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
              sx={{
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
              }}
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
              sx={{
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
              }}
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

          <div className="flex items-center justify-between -mt-1 mb-2">
            <FormControlLabel 
              control={<Checkbox size="small" sx={{ color: 'gray', '&.Mui-checked': { color: '#4f46e5' } }} />} 
              label={<span className="text-sm text-gray-600 font-medium tracking-tight">Remember me</span>} 
            />
            <button 
              type="button" 
              onClick={() => navigate("forgot")}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold tracking-tight transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-xl font-bold text-base transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(79,70,229,0.6)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : "Login"}
            </span>
            <div className="absolute inset-0 h-full w-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="mt-2 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={() => navigate("register")}
                className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors decoration-2 hover:underline underline-offset-4"
              >
                Register
              </button>
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
}
