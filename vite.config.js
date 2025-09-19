import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // ← allows access from other devices
    port: 5173        // or any port you like
  },
  plugins: [react(),tailwindcss()],
})
