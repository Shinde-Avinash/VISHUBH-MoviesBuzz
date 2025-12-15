import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'vishubh-moviesbuzz-production.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path, // keep path as-is
        logLevel: 'debug',
      },
      '/uploads': {
        target: 'vishubh-moviesbuzz-production.up.railway.app',
        changeOrigin: true,
      },
    },
  },
})
