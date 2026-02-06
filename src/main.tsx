import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <CartProvider>
            <ToastProvider>
                <App />
            </ToastProvider>
        </CartProvider>
    </HelmetProvider>,
)
