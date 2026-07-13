import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base URL pour GitHub Pages (https://abakardev.github.io/)
  // Racine du domaine → base: '/'
  base: '/',

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@data': resolve(__dirname, './src/data'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },

  build: {
    // Dossier de sortie
    outDir: 'dist',
    // Optimisation des assets
    assetsDir: 'assets',
    // Génère des source maps pour le débogage en prod
    sourcemap: false,
    // Minification
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Code splitting pour de meilleures performances
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});
