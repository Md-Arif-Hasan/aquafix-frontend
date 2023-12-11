

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server: {
    proxy: {
      // '/api': 'http://192.168.1.92:3000',
      '/api': "https://blogstation.onrender.com/"
    },
  },
  plugins: [react()],
})