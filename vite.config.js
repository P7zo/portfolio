import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During dev, proxy API + uploaded images to the Express server (port 3001).
const API_TARGET = 'http://localhost:3001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    proxy: {
      '/api': API_TARGET,
      '/uploads': API_TARGET,
    },
  },
})
