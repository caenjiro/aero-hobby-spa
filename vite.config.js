import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
    test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup.js'],
    globals: true
  },
  resolve: {
    alias: [
      {
        // Expresión regular que atrapa importaciones de imágenes
        find: /.+\.(jpg|jpeg|png|gif|webp|svg)$/,
        replacement: '/src/tests/fileMock.js'
      }
    ]
  }  
});
