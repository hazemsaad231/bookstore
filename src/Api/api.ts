// ملاحظة: المصادقة كلها عبر Supabase الآن — راجع src/hooks/useAuth.tsx
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const BOOKS_API = `${API_BASE}/books`;
export const Orders_API = `${API_BASE}/orders`;
