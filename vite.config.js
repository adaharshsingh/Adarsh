import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, 'src/components/MacBook/components'),
      '#constants': path.resolve(__dirname, 'src/components/MacBook/constants'),
      '#store': path.resolve(__dirname, 'src/components/MacBook/store'),
    },
  },
})
