// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Login_api, Register_api, Forgot_api, Reset_api } from '../Api/api';
import { success, Error as toastError } from '../ui/toasts';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // دالة مساعدة للتعامل مع الأخطاء (DRY Principle)
  const handleError = (error: any) => {
    console.error("Auth Error:", error);
    const message = Array.isArray(error.response?.data?.message)
      ? error.response.data.message[0]
      : error.response?.data?.message;
    toastError(message || "حدث خطأ ما، حاول مرة أخرى");
  };

  // 1. تسجيل الدخول
  const login = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(Login_api, data);
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("role", response.data.data.profile.role);
      localStorage.setItem("data", JSON.stringify(response.data.data.profile));
      success("تم تسجيل الدخول بنجاح");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. إنشاء حساب جديد
  const Register = async (data: any) => {
    setLoading(true);
    try {
      await axios.post(Register_api, data);
      success("تم إنشاء الحساب بنجاح");
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
      await axios.post(Forgot_api, { email });
      success("تم إرسال رابط استعادة كلمة المرور لبريدك الإلكتروني");
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
      await axios.post(Reset_api, data);
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