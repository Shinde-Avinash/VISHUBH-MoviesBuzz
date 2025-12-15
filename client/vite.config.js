import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vishubh-moviesbuzz-production.up.railway.app',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://vishubh-moviesbuzz-production.up.railway.app',
        changeOrigin: true,
      },
    },
  },
})
