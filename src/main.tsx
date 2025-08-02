import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletContextProvider } from './contexts/WalletContextProvider.tsx';
import { Toaster } from 'react-hot-toast';

// Add this to fix the "process is not defined" error
window.global = window;
// Use 'as any' to bypass TypeScript checking for the process object
(window as any).process = { env: {} };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
      <Toaster position="bottom-right" />
    </WalletContextProvider>
  </React.StrictMode>,
);