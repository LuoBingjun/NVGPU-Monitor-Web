import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 字符串简写写法
      '/api': {
          target: "http://127.0.0.1:8080",
          changeOrigin: true,
        },
    }
  }
})
