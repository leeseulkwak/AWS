import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { registerServiceWorker } from './utils/notifications';

registerServiceWorker().catch((err) => {
  console.error('SW registration failed at startup:', err);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
