import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// انواع البيانات المستخدمة في الـ 
export interface CartState {
  cartTotal: number;
  cartAmount: number;
  cartItems: { id: number; name: string; quantity: number; price: number, image: string }[]; // إضافة السعر
  cartId: string | null;
  userData: any | null; // إضافة userData إلى الحالة
  items: any[];
  favoriteItems: any[];
}

// الحاله الاوليه

const initialState: CartState = {
  cartItems: [], // سيتم تحميلها عند تسجيل الدخول
  cartTotal: 0,
  cartAmount: 0,
  cartId: null,
  userData: null,
  items: [],
  favoriteItems: [],
};




// دالة لحساب المجموع الإجمالي وعدد العناصر
const updateCartSummary = (cartItems: { id: number; name: string; quantity: number; price: number, image: string }[]) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // إجمالي الكمية
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0); // إجمالي السعر
  return { totalAmount, totalPrice };
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCartId: (state, action: PayloadAction<string | null>) => {
      state.cartId = action.payload;
    },

    setUserData: (state) => {
      try {
        const profile = localStorage.getItem('data');
        if (profile) {
          state.userData = JSON.parse(profile);
          const userId = state.userData._id;;
          const storedCartItems = localStorage.getItem(`cartItems_${userId}`);

          console.log(storedCartItems);
        // افترض أن التوكن محفوظ في localStorage

          if (storedCartItems) {
            state.cartItems = JSON.parse(storedCartItems);
          } else {
            state.cartItems = []; // تعيين سلة فارغة إذا لم تكن موجودة
          }

          const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
          state.cartAmount = totalAmount;
          state.cartTotal = totalPrice;
        } else {
          state.cartItems = []; // تعيين سلة فارغة للمستخدمين غير المسجلين
        }
      } catch (error) {
        console.error("Error parsing the profile data from localStorage:", error);
      }
    },



    
    addToCart: (state, action: PayloadAction<{ id: number; name: string; price: number, image: string }>) => {
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to add items to the cart.");
        return;
      }

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.info(`${action.payload.name} quantity increased`, {
          position: "top-right",
        });
      } else {
        const tempItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempItem);
        toast.success(`Item added to cart`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
      

      // تحديث cartTotal و cartAmount
      const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
      state.cartAmount = totalAmount;
      state.cartTotal = totalPrice;

      // تخزين العربة باستخدام _id الخاص بالمستخدم

    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
    
    },



    addToFavorite: (state, action: PayloadAction<{ id: number; name: string; price: number, image: string }>) => {
      
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to add items to the my favourite.");
        return;
      }

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      const itemIndex = state.favoriteItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        toast.info(`this item is already added`, {
          position: "top-right",
        });
      } else {
        const tempItem = { ...action.payload};
        state.favoriteItems.push(tempItem);
        toast.success(`Item added to my favourite`, {
          position: "top-right",
          autoClose: 2000,
        });
      }

    
        localStorage.setItem(`favoriteItems_${userId}`, JSON.stringify(state.favoriteItems));
      
      
    
      

    },


  DeleteFromFavorite: (state, action: PayloadAction<{ id: number }>) => {
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to remove items from the my favorite.");
        return;
      }

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload.id
      )
      updateCartSummary(state.favoriteItems);
      localStorage.setItem(`favoriteItems_${userId}`, JSON.stringify(state.favoriteItems));

      toast.error(`Item removed from my favorite`, {
        position: "top-right",
        autoClose: 2000,
      })
      
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to remove items from the cart.");
        return;
      }

     

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      // تحديث cartTotal و cartAmount بعد الحذف
      const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
      state.cartAmount = totalAmount;
      state.cartTotal = totalPrice;

      // تحديث الـ localStorage بعد الحذف
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));

      toast.error(`Item removed from cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    },

    decreaseCart: (state, action: PayloadAction<{ id: number }>) => {
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to remove items from the cart.");
        return;
      }

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
        state.cartAmount = totalAmount;
        state.cartTotal = totalPrice;
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
      }
    },

    increaseCart: (state, action: PayloadAction<{ id: number }>) => {
      const userData = state.userData; // الحصول على بيانات المستخدم من الـ Redux state
      if (!userData) {
        toast.error("Please log in to remove items from the cart.");
        return;
      }

      const userId = userData._id; // استخدام _id من بيانات المستخدم المخزنة في الـ Redux

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
        state.cartAmount = totalAmount;
        state.cartTotal = totalPrice;
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));
      }
    },

    // إعادة تعيين السلة للمستخدم
    resetCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
      state.cartAmount = 0;
      if (state.userData) {
        localStorage.removeItem(`cartItems_${state.userData._id}`);
      }
    },

    updateOrder: (state, action) => {
      state.items = action.payload; // تحديث الـ state بالبيانات التي سيتم إرسالها
    },


    cartId: (state) => {
      const userData = state.userData;
      if (!userData) {
        return;
      }

      const userId = userData._id;
      const storedCartItems = localStorage.getItem(`cartItems_${userId}`);
      if (storedCartItems) {
        state.cartItems = JSON.parse(storedCartItems);
        const { totalAmount, totalPrice } = updateCartSummary(state.cartItems);
        state.cartAmount = totalAmount;
        state.cartTotal = totalPrice;
      }
    },
  },
});

export const { addToCart,addToFavorite,DeleteFromFavorite, removeFromCart, setCartId, setUserData, cartId, resetCart, decreaseCart, increaseCart, updateOrder } = cartSlice.actions;

export default cartSlice.reducer;