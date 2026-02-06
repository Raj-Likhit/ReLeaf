
import { motion } from 'framer-motion';
import { CloudRain, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    actionLabel?: string;
}

export default function ErrorState({
    title = "A fallen leaf...",
    message = "We encountered a small snag in the ecosystem. Don't worry, nature bounces back.",
    onRetry,
    actionLabel = "Regrow Connection"
}: ErrorStateProps) {
    return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full p-8 rounded-[2.5rem] bg-[#0a2018]/60 border border-green-500/10 backdrop-blur-md relative overflow-hidden"
            >
                {/* Ambient Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />

                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 10 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/10"
                >
                    <CloudRain className="w-10 h-10 text-green-400/50" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-green-100/50 mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-400 text-[#051a14] font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            {actionLabel}
                        </button>
                    )}

                    <Link
                        to="/"
                        className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" /> Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
