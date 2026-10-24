import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // `npm run dev` (Vite) + `npm run dev` in server/ → /api reaches the Express server
  server: { proxy: { '/api': 'http://localhost:8080' } },
})
