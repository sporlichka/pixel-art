import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css'; // Импортирует все стили через @import
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);