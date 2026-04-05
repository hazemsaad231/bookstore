

export const cartService = {
  // جلب بيانات المستخدم
  getUserFromStorage: () => {
    const data = localStorage.getItem('data');
    const id = localStorage.getItem('id'); // جلب ال id اللي حفظناه في useAuth
    if (data && id) {
      const parsedData = JSON.parse(data);
      return { ...parsedData, _id: id }; // دمج الـ _id مع بيانات المستخدم
    }
    return null;
  },

  // حفظ العناصر (سواء سلة أو مفضلات)
  saveToStorage: (userId: string, key: string, items: any[]) => {
    localStorage.setItem(`${key}_${userId}`, JSON.stringify(items));
  },

  // جلب العناصر
  loadFromStorage: (userId: string, key: string): any[] => {
    const data = localStorage.getItem(`${key}_${userId}`);
    return data ? JSON.parse(data) : [];
  },

  // مسح السلة
  clearStorage: (userId: string) => {
    localStorage.removeItem(`cartItems_${userId}`);
  }
};