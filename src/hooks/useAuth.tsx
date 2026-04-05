// // src/hooks/useAuth.ts
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Login_api, Register_api, Forgot_api, Reset_api } from '../Api/api';
// import { success, Error as toastError } from '../ui/toasts';

// export const useAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // دالة مساعدة للتعامل مع الأخطاء (DRY Principle)
//   const handleError = (error: any) => {
//     console.error("Auth Error:", error);
//     const message = Array.isArray(error.response?.data?.message)
//       ? error.response.data.message[0]
//       : error.response?.data?.message;
//     toastError(message || "حدث خطأ ما، حاول مرة أخرى");
//   };

//   // 1. تسجيل الدخول
//   const login = async (data: any) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(Login_api, data);
//       localStorage.setItem("token", response.data.data.accessToken);
//       localStorage.setItem("role", response.data.data.profile.role);
//       localStorage.setItem("data", JSON.stringify(response.data.data.profile));
//       success("تم تسجيل الدخول بنجاح");
//       setTimeout(() => navigate("/home"), 2000);
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. إنشاء حساب جديد
//   const Register = async (data: any) => {
//     setLoading(true);
//     try {
//       await axios.post(Register_api, data);
//       success("تم إنشاء الحساب بنجاح");
//       navigate("/login");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. نسيان كلمة المرور
//   const forgotPassword = async (email: string) => {
//     setLoading(true);
//     try {
//       await axios.post(Forgot_api, { email });
//       success("تم إرسال رابط استعادة كلمة المرور");
//       navigate("/login/reset");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 4. تعيين كلمة مرور جديدة
//   const resetPassword = async (data: any) => {
//     setLoading(true);
//     try {
//       await axios.post(Reset_api, data);
//       success("تم تغيير كلمة المرور بنجاح");
//       navigate("/login");
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     login,
//     Register,
//     forgotPassword,
//     resetPassword,
//     loading
//   };
// };


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // تأكد من مسار ملف الإعداد
import { success, Error as toastError } from '../ui/toasts';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // دالة مساعدة للتعامل مع الأخطاء
  const handleError = (error: any) => {
    console.error("Auth Error:", error);
    toastError(error.message || "حدث خطأ ما، حاول مرة أخرى");
  };

  // 1. تسجيل الدخول
  const login = async (data: any) => {
    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // تخزين البيانات زي ما كنت بتعمل بالظبط
      const session = authData.session;
      const user = authData.user;

      localStorage.setItem("token", session.access_token);
      localStorage.setItem("role", user.user_metadata.role || "Customer");
      localStorage.setItem("data", JSON.stringify(user.user_metadata));
      localStorage.setItem("id", user.id);

      success("تم تسجيل الدخول بنجاح");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. إنشاء حساب جديد
  const Register = async (formData: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // تخزين الاسم والـ role في الـ metadata عشان ترجع لك في الـ login
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            role: formData.role,
          },
        },
      });

      if (error) throw error;

      success("تم إنشاء الحساب بنجاح");
      // ملحوظة: لو مفعل الـ Email Confirmation في سوبابيز، المستخدم لازم يفعل إيميله الأول
      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // 3. نسيان كلمة المرور
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login/reset`,
      });
      if (error) throw error;

      success("تم إرسال رابط استعادة كلمة المرور");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // 4. تعيين كلمة مرور جديدة
  const resetPassword = async (data: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;

      success("تم تغيير كلمة المرور بنجاح");
      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    Register,
    forgotPassword,
    resetPassword,
    loading
  };
};