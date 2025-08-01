import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Configure Vite to handle .json files properly
  assetsInclude: ['**/*.json'],
  // Polyfills for Node.js modules that are used by some Solana libraries
  define: {
    'process.env': {},
  },
})