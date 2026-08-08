import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { success, Error, info } from '../ui/toasts';
import { cartService } from '../services/cartService';

export interface CartState {
  cartTotal: number;
  cartAmount: number;
  cartItems: any[];
  userData: any | null;
  items: any[]; // للأوامر (Orders)
  favoriteItems: any[];
}

const initialState: CartState = {
  cartItems: [],
  cartTotal: 0,
  cartAmount: 0,
  userData: null,
  items: [],
  favoriteItems: [],
};

// دالة مساعدة داخلية (Helper) لتحديث الملخص
const syncSummary = (state: CartState) => {
  state.cartAmount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  state.cartTotal = state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. إعداد بيانات المستخدم عند تحميل التطبيق
    setUserData: (state) => {
      const user = cartService.getUserFromStorage();
      if (user) {
        state.userData = user;
        state.cartItems = cartService.loadFromStorage(user._id, 'cartItems');
        state.favoriteItems = cartService.loadFromStorage(user._id, 'favoriteItems');
        syncSummary(state);
      }
    },

    // 2. إضافة للسلة
    addToCart: (state, action: PayloadAction<any>) => {
      // لا نُرجع قيمة من الـ reducer: في Immer القيمة المُرجَعة تحل محل الـ state بالكامل
      if (!state.userData) {
        Error("Please log in first");
        return;
      }

      const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.cartItems[index].quantity += 1;
        info(`${action.payload.name} increased`);
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        success(`Added to cart`);
      }

      syncSummary(state);
      cartService.saveToStorage(state.userData._id, 'cartItems', state.cartItems);
    },

    // 3. إضافة للمفضلات (تطبيق التحسين الذي طلبته)
    addToFavorite: (state, action: PayloadAction<any>) => {
      if (!state.userData) {
        Error("Log in to add favorites");
        return;
      }

      const isExist = state.favoriteItems.some(item => item.id === action.payload.id);
      if (isExist) {
        info("Already in favorites");
      } else {
        state.favoriteItems.push(action.payload);
        success("Added to favorites");
        cartService.saveToStorage(state.userData._id, 'favoriteItems', state.favoriteItems);
      }
    },

    // 4. حذف من المفضلات
    deleteFromFavorite: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.userData) return;
      state.favoriteItems = state.favoriteItems.filter(item => item.id !== action.payload.id);
      cartService.saveToStorage(state.userData._id, 'favoriteItems', state.favoriteItems);
      Error("Removed from favorites");
    },

    // 5. التحكم في الكميات (زيادة ونقصان)
    updateQuantity: (state, action: PayloadAction<{ id: number, type: 'increase' | 'decrease' }>) => {
      if (!state.userData) return;
      const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      
      if (index >= 0) {
        if (action.payload.type === 'increase') {
          state.cartItems[index].quantity += 1;
        } else if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
        }
        syncSummary(state);
        cartService.saveToStorage(state.userData._id, 'cartItems', state.cartItems);
      }
    },

    // 6. حذف نهائي من السلة
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.userData) return;
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      syncSummary(state);
      cartService.saveToStorage(state.userData._id, 'cartItems', state.cartItems);
      Error("Item removed");
    },

    // 7. إعادة تعيين
    resetCart: (state) => {
      if (state.userData) {
        cartService.clearStorage(state.userData._id);
      }
      return initialState; // يرجع الـ state للحالة الصفرية
    },
    // جديد: إجراء تسجيل الخروج بدون حذف السلة من localStorage
    logout: (state) => {
      state.userData = null;
    },
    updateOrder: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload; // تحديث قائمة الطلبات
    },
  },
});

export const { 
  addToCart, 
  addToFavorite, 
  deleteFromFavorite, 
  removeFromCart, 
  setUserData, 
  resetCart, 
  logout,
  updateQuantity ,
  updateOrder
} = cartSlice.actions;

export default cartSlice.reducer;