// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // 1. لازم تستورد المكتبة دي

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // 2. الـ alias لازم يكون جوه resolve
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})