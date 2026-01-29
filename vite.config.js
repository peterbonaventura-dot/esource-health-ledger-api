import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PHASE 1: Removed @base44/vite-plugin
// Base44 plugin has been removed from the build

export default defineConfig({
  logLevel: 'error',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
