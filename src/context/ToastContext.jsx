import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className="pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl bg-[#051a14]/90 backdrop-blur-md border border-green-500/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] min-w-[300px]"
                        >
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                            {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}

                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">{toast.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
