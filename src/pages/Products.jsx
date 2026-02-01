import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Loader, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';
import { api } from '../services/api';
import ErrorState from '../components/ErrorState';

export default function Products() {
    const [activeColor, setActiveColor] = useState('forest');
    const [activeModel, setActiveModel] = useState('iPhone 17 Pro Max');
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [addingToCart, setAddingToCart] = useState(false);

    // Data States
    const [products, setProducts] = useState(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [coreData, limitedData] = await Promise.all([
                api.getCoreProducts(),
                api.getLimitedEditions()
            ]);
            setProducts(coreData);
            setNewArrivals(limitedData);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load catalog", error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddToCart = () => {
        if (!products) return;
        setAddingToCart(true);
        // Simulate network delay for effect
        setTimeout(() => {
            addToCart({
                id: products[activeColor].id,
                name: products[activeColor].name,
                color: activeColor,
                model: activeModel,
                price: products[activeColor].price,
                image: products[activeColor].image
            });
            addToast(`Added ${products[activeColor].name} to cart`);
            setAddingToCart(false);
        }, 500);
    };

    const handleQuickAdd = (item) => {
        addToCart({
            id: item.id,
            name: item.title,
            color: item.colorName,
            model: 'iPhone 17 Pro Max',
            price: item.price,
            image: item.image
        });
        addToast(`Added ${item.title} to cart`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#051a14] flex items-center justify-center">
                <Loader className="w-8 h-8 text-green-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-32 min-h-screen bg-nature-gradient bg-nature-pattern flex items-center justify-center">
                <SEO
                    title="Error | ReLeaf"
                    description="Something went wrong."
                />
                <ErrorState
                    onRetry={loadData}
                    message="We couldn't retrieve the latest collection from our eco-servers. It's probably just a temporary glitch."
                />
            </div>
        );
    }

    if (!products) return null;

    return (
        <div className="pt-32 min-h-screen bg-nature-gradient bg-nature-pattern">
            <SEO
                title="Shop ReLeaf | Sustainable iPhone Cases"
                description="Browse our collection of 100% biodegradable cases for iPhone 17. Military-grade protection, zero waste."
                url="https://releaf.com/products"
            />
            <div className="container mx-auto px-6 md:px-8">

                <div className="mb-16 relative text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Pre-Order Now Available
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tight">The Next Gen.</h1>
                    <p className="text-green-100/60 text-lg max-w-xl mx-auto">
                        Engineered exclusively for the all-new iPhone 17 Series. Thinner, lighter, and stronger than ever before.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-24 border-b border-green-500/10 mb-20">

                    {/* Preview */}
                    <div className="lg:sticky lg:top-32 h-[500px] md:h-[700px] rounded-[3rem] bg-[#0a2018]/40 border border-green-500/10 backdrop-blur-sm relative overflow-hidden flex items-center justify-center p-8">
                        <motion.div
                            className="absolute inset-0 transition-colors duration-700 opacity-20"
                            style={{ backgroundColor: products[activeColor].bg }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />

                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={activeColor}
                                src={products[activeColor].image}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "backOut" }}
                                className="relative z-10 w-[60%] lg:w-[70%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Configuration */}
                    <div className="space-y-12">
                        <div className="pb-8 border-b border-green-500/10">
                            <h2 className="text-4xl font-bold mb-2 text-white">{products[activeColor].name}</h2>
                            <div className="flex items-end gap-3">
                                <p className="text-3xl font-mono text-green-400">${products[activeColor].price.toFixed(2)}</p>
                                <span className="text-sm font-bold text-green-500/60 mb-1.5">+ Limited Launch Edition</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-green-100/40 uppercase tracking-widest block mb-6">Select Color</label>
                            <div className="grid grid-cols-3 gap-4">
                                {Object.entries(products).map(([key, product]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveColor(key)}
                                        className={`
                            h-24 rounded-3xl border transition-all duration-300 relative overflow-hidden group
                            ${activeColor === key ? 'border-green-500 scale-[1.02] shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-green-500/10 hover:border-green-500/30'}
                          `}
                                    >
                                        <div className="absolute inset-0 opacity-80" style={{ backgroundColor: product.bg }} />
                                        <span className={`relative z-10 text-xs font-bold ${product.darkText ? 'text-black' : 'text-white'}`}>
                                            {product.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-green-100/40 uppercase tracking-widest block mb-6">Model</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 16 Pro Max', 'iPhone 16 Pro'].map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => setActiveModel(model)}
                                        className={`
                            py-4 px-6 rounded-2xl border transition-all text-sm font-bold text-left
                            ${activeModel === model
                                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                                : 'bg-[#0a2018]/40 border-green-500/10 text-green-100/60 hover:bg-green-500/10 hover:text-white'}
                          `}
                                    >
                                        {model}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 space-y-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart}
                                className={`w-full py-6 rounded-full font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.2)]
                        ${addingToCart ? 'bg-green-400 text-[#051a14]' : 'bg-green-500 hover:bg-green-400 text-[#051a14]'}
                    `}
                            >
                                {addingToCart ? <Loader className="w-5 h-5 animate-spin" /> : <>Add to Cart <ShoppingBag className="w-5 h-5" /></>}
                            </button>
                            <p className="text-center text-green-100/40 text-sm flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> In stock · Free Carbon-Neutral Shipping
                            </p>
                        </div>
                    </div>
                </div>

                {/* New Arrivals Section */}
                <div className="pb-32">
                    <h2 className="text-4xl font-bold text-white mb-12">Limited Editions</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {newArrivals.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative rounded-[2.5rem] bg-[#0a2018]/40 border border-green-500/10 overflow-hidden hover:border-green-500/30 transition-colors"
                            >
                                <div className={`h-80 ${item.bg} relative overflow-hidden`}>
                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-bold text-white border border-white/10 shadow-lg">{item.tag || 'New'}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-green-100/50">iPhone 17 Series</p>
                                        </div>
                                        <span className="font-mono text-lg text-green-400">${item.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleQuickAdd(item)}
                                        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-green-500 hover:text-[#051a14] hover:border-green-500 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Quick Add
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
