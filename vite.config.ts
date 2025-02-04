// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression()],
  build: {
    minify: 'esbuild', // استخدام minifier سريع
    chunkSizeWarningLimit: 1000, // تجنب تحذيرات الملفات الضخمة
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor' // فصل المكتبات في ملف مستقل
          }
        }
      }
    }
  },
  server: {
    host: true, // يسمح بالوصول من أجهزة أخرى (مفيد للاختبار)
    open: true, // يفتح المتصفح تلقائيًا عند تشغيل dev server
  }
})
