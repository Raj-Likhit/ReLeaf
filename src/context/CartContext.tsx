import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number | string) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('releaf_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('releaf_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item =>
                item.name === product.name &&
                item.model === product.model &&
                item.color === product.color
            );

            if (existing) {
                return prev.map(item =>
                    item === existing
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            // Use date as unique ID if not present, ensuring typing
            const newItem: CartItem = {
                ...product,
                quantity: 1,
                id: product.id || Date.now()
            };
            return [...prev, newItem];
        });
    };

    const removeFromCart = (id: number | string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
