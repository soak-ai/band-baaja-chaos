import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // expose on the local network so the user can open it on their phone
    port: 5174,
    strictPort: true,
  },
})
