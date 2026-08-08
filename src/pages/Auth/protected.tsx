import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactNode;
  /** اتركه فارغًا ليكفي تسجيل الدخول، أو مرّر دورًا لقصر الصفحة عليه */
  role?: 'Admin' | 'Customer';
};

/**
 * حارس مسارات على مستوى الواجهة فقط.
 * ملاحظة أمنية: الدور مقروء من localStorage ويمكن للمستخدم تعديله،
 * فهذا يمنع الوصول العرضي لا أكثر. الحماية الحقيقية لازم تكون
 * على السيرفر (Supabase RLS / صلاحيات الـ API).
 */
function PrivateRoute({ children, role }: PrivateRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
