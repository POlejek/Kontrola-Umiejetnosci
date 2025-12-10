import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Wersja dla serwera - base path: '/' (root)
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
