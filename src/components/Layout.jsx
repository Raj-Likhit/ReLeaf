import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Leaf, Instagram, Twitter, Facebook, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// ... Navbar and Footer components remain unchanged ...

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none">
                <nav className={cn(
                    "pointer-events-auto transition-all duration-500 ease-spring",
                    scrolled
                        ? "mt-4 mx-4 w-full max-w-4xl bg-[#051a14]/80 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-2xl shadow-black/20"
                        : "mt-0 w-full bg-transparent py-6 px-6 md:px-8 border-transparent"
                )}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group relative z-50" onClick={handleLinkClick}>
                            <div className="p-1.5 bg-green-500 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                                <Leaf className="w-5 h-5 text-black fill-current" />
                            </div>
                            <span className={cn(
                                "text-xl font-bold tracking-tight text-white transition-all duration-300",
                                scrolled ? "opacity-100 md:opacity-100" : "opacity-100"
                            )}>
                                ReLeaf
                            </span>
                        </Link>

                        {/* Desktop Nav - Centered in Floating Mode */}
                        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
                            {[
                                { name: 'Products', path: '/products' },
                                { name: 'Impact', path: '/impact' },
                                { name: 'Technology', path: '/technology' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={cn(
                                        "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                                        location.pathname === item.path
                                            ? "text-[#051a14] bg-white shadow-lg"
                                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/cart"
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group z-50 relative",
                                    scrolled
                                        ? "bg-green-500 text-[#051a14] hover:bg-green-400"
                                        : "bg-green-900/20 border border-green-500/20 text-white hover:bg-green-500/20"
                                )}
                                onClick={handleLinkClick}
                            >
                                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" />
                                <span className="text-sm font-bold ml-0.5">{cartCount}</span>
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden z-50 relative p-2 text-white hover:text-green-400 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, pointerEvents: 'none' }}
                        animate={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
                        exit={{ opacity: 0, y: -20, pointerEvents: 'none' }}
                        className="fixed inset-0 z-40 bg-[#051a14]/98 backdrop-blur-xl pt-32 px-6 md:hidden flex flex-col items-center gap-8"
                    >
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Shop Products', path: '/products' },
                            { name: 'Our Impact', path: '/impact' },
                            { name: 'Technology', path: '/technology' },
                            { name: 'Cart', path: '/cart' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={handleLinkClick}
                                className="text-3xl font-bold text-white hover:text-green-400 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <button onClick={handleLinkClick} className="mt-8 text-neutral-500 text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Close Menu
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Footer = () => {
    return (
        <footer className="bg-black/40 backdrop-blur-lg pt-20 pb-10 border-t border-green-500/10">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-green-500" /> ReLeaf
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Designed by nature. Engineered for the future. The world's first fully circular tech accessory ecosystem.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 text-green-400">Shop</h4>
                        <ul className="space-y-3 text-neutral-400 text-sm">
                            <li><Link to="/products" className="hover:text-green-400 cursor-pointer transition-colors">All Collections</Link></li>
                            <li><Link to="/products" className="hover:text-green-400 cursor-pointer transition-colors">New Arrivals</Link></li>
                            <li><Link to="/cart" className="hover:text-green-400 cursor-pointer transition-colors">Access Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 text-green-400">Company</h4>
                        <ul className="space-y-3 text-neutral-400 text-sm">
                            <li><Link to="/impact" className="hover:text-green-400 cursor-pointer transition-colors">Our Mission</Link></li>
                            <li><Link to="/technology" className="hover:text-green-400 cursor-pointer transition-colors">Technology</Link></li>
                            <li><Link to="/impact" className="hover:text-green-400 cursor-pointer transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 text-green-400">Connect</h4>
                        <div className="flex gap-4 text-neutral-400">
                            <Instagram className="w-5 h-5 hover:text-green-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" />
                            <Twitter className="w-5 h-5 hover:text-green-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" />
                            <Facebook className="w-5 h-5 hover:text-green-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-green-900/30 text-neutral-600 text-sm">
                    <p>&copy; 2026 ReLeaf Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-green-500 cursor-pointer transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-green-500 cursor-pointer transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-nature-gradient bg-nature-pattern text-white font-sans selection:bg-green-500/30 selection:text-green-100 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
