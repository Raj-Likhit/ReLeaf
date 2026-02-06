import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function LegalConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('releaf_cookie_consent');
        if (!consent) {
            // Small delay for better UX
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('releaf_cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-50"
                >
                    <div className="bg-[#0a2018]/90 backdrop-blur-xl border border-green-500/20 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                <Cookie className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">We respect your privacy</h3>
                                <p className="text-sm text-green-100/60 leading-relaxed">
                                    We use essential cookies to ensure the site functions properly. No tracking pixels, no data selling. Just nature.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 relative z-10">
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-3 bg-white text-[#051a14] rounded-xl font-bold text-sm hover:bg-green-50 transition-colors"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleAccept} // For now simplified, usually opens settings
                                className="px-4 py-3 bg-transparent border border-green-500/20 text-green-100/60 rounded-xl font-bold text-sm hover:text-white hover:border-green-500/40 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
