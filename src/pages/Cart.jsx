import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, ShieldCheck, CreditCard, Lock, RotateCcw, Truck, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';
import { processCheckout } from '../services/checkout';
import { useState } from 'react';

const TrustBadge = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-200/50">
        <Icon className="w-4 h-4" /> {text}
    </div>
);

export default function Cart() {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const { addToast } = useToast();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const tax = cartTotal * 0.1;
    const shippingThreshold = 100;
    const progress = Math.min((cartTotal / shippingThreshold) * 100, 100);
    const remainingForFree = Math.max(shippingThreshold - cartTotal, 0);
    const finalTotal = cartTotal + tax;

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setIsCheckingOut(true);
        addToast("Preparing secure checkout...");

        try {
            const result = await processCheckout(cartItems);
            if (result.success) {
                // In a real app: window.location.href = result.url;
                addToast("Redirecting to payment gateway...");
                setTimeout(() => {
                    setIsCheckingOut(false);
                    // For demo purposes only
                    alert("This would redirect to Stripe Checkout.");
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            addToast("Checkout failed. Please try again.");
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-nature-gradient bg-nature-pattern">
            <SEO
                title="Your Cart | ReLeaf"
                description="Review your sustainable collection. Free shipping on orders over $100."
                url="https://releaf.com/cart"
            />
            <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Collection</h1>
                            <p className="text-green-100/60">
                                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} reserved for you
                            </p>
                        </div>
                        <div className="hidden md:flex gap-6">
                            <TrustBadge icon={Lock} text="Secure Checkout" />
                            <TrustBadge icon={RotateCcw} text="30-Day Returns" />
                            <TrustBadge icon={Truck} text="Global Shipping" />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* LEFT COLUMN: Cart Items */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Free Shipping Progress */}
                            {cartItems.length > 0 && (
                                <div className="p-6 rounded-[2rem] bg-[#0a2018]/40 border border-green-500/10 backdrop-blur-sm mb-8">
                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-white font-bold">
                                            {remainingForFree > 0
                                                ? `Add $${remainingForFree.toFixed(2)} for Free Shipping`
                                                : "You've unlocked Free Shipping!"}
                                        </span>
                                        <span className="text-green-400 font-mono">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                        />
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, height: 0, opacity: 0 }}
                                        className="p-4 md:p-6 rounded-[2.5rem] bg-[#0a2018]/60 border border-green-500/10 backdrop-blur-md flex flex-col md:flex-row gap-6 md:items-center group hover:border-green-500/30 transition-all hover:bg-[#0a2018]/80 relative overflow-hidden"
                                    >
                                        <div className="w-full md:w-32 h-32 rounded-[1.5rem] bg-black/20 overflow-hidden relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-overlay opacity-80" />
                                            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-contain p-2" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                                    <p className="text-sm text-green-100/50 mb-3">{item.model} | {item.color}</p>
                                                </div>
                                                <p className="text-xl font-mono text-green-400 font-bold">${item.price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-4 py-1.5 border border-white/5">
                                                    <span className="text-xs text-green-100/40 uppercase tracking-wider font-bold">Qty: 1</span>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-xs font-bold text-red-400/80 hover:text-red-400 flex items-center gap-1.5 uppercase tracking-wider transition-colors px-4 py-2 hover:bg-red-500/10 rounded-full"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {cartItems.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 bg-[#0a2018]/30 rounded-[3rem] border border-dashed border-green-500/10"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                                        <Gift className="w-8 h-8 text-green-500/50" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Each case saves a tree.</h3>
                                    <p className="text-green-100/40 text-lg mb-8 max-w-md mx-auto">Your collection is empty, but your impact starts with the first add.</p>
                                    <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#051a14] font-bold hover:bg-green-50 transition-all hover:scale-105 shadow-xl shadow-white/10">
                                        Browse Products <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Summary */}
                        <div className="lg:col-span-4 sticky top-32">
                            <div className="p-8 rounded-[2.5rem] bg-[#051a14]/80 border border-green-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Order Summary</h3>

                                <div className="space-y-4 mb-8 border-b border-white/5 pb-8 relative z-10">
                                    <div className="flex justify-between text-green-100/60">
                                        <span>Subtotal</span>
                                        <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-100/60 items-center">
                                        <span>Shipping</span>
                                        {remainingForFree <= 0
                                            ? <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-1 rounded">Free</span>
                                            : <span className="font-mono text-white">$15.00</span>
                                        }
                                    </div>
                                    <div className="flex justify-between text-green-100/60">
                                        <span>Estimated Tax</span>
                                        <span className="font-mono text-white">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8 relative z-10">
                                    <span className="text-lg font-bold text-white/50">Total</span>
                                    <div className="text-right">
                                        <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                                            ${finalTotal.toFixed(2)}
                                        </span>
                                        <p className="text-xs text-green-100/30 mt-1">USD</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || cartItems.length === 0}
                                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] mb-8 relative z-10 group
                                        ${isCheckingOut ? 'bg-green-500/20 text-white cursor-wait' : 'bg-white text-[#051a14] hover:bg-green-50'}
                                    `}
                                >
                                    {isCheckingOut ? 'Processing...' : <>Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                                </button>

                                <div className="grid grid-cols-4 gap-2 opacity-30 relative z-10 grayscale">
                                    {/* Payment Icons Placeholder - using simple divs for visual representation */}
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-8 bg-white/20 rounded md:rounded-md" />
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-green-100/30 font-medium">
                                    <Lock className="w-3 h-3" /> Guaranteed Safe & Secure
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
