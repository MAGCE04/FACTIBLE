import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'process': 'process/browser',
      'stream': 'stream-browserify',
      'zlib': 'browserify-zlib',
      'util': 'util',
    },
  },
  // Configure Vite to handle .json files properly
  assetsInclude: ['**/*.json'],
  // Polyfills for Node.js modules that are used by some Solana libraries
  define: {
    'process.env': {},
    'global': {},
  },
  // Ensure the server is accessible from all network interfaces
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
  },
  // Ensure the build is compatible with older browsers
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
})