import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 1. Remove Console Logs and Debuggers in Production
  esbuild: {
    drop: ['console', 'debugger'],
  },

  // 2. Prevent Source Maps from being generated
  build: {
    sourcemap: false, 
  }
})