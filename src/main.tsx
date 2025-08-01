import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';

// Simple test component to verify React is working
const TestApp = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">React is working!</h1>
      <p className="mb-4">This is a test component to verify that React is rendering correctly.</p>
      <p>If you see this, your React setup is working fine.</p>
    </div>
  );
};

// Render the test component first
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
    <Toaster position="bottom-right" />
  </React.StrictMode>,
);