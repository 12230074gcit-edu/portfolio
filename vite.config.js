import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  build: {
    // Enable minification and treeshaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Group heavy animation libraries
          'gsap': ['gsap'],
          // Group 3D rendering libraries
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Group React and routing
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'react-router-dom']
  }
})
