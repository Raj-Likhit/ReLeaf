import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('releaf_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('releaf_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
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
            return [...prev, { ...product, id: Date.now(), quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
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
