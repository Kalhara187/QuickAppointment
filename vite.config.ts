import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@types': path.resolve(__dirname, './src/types/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
