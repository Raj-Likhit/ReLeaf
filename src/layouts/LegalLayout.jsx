import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function LegalLayout({ title, lastUpdated, children, seoTitle, seoDesc, seoUrl }) {
    return (
        <div className="min-h-screen bg-[#051a14] text-green-100/80 font-sans selection:bg-green-500/30">
            <SEO
                title={seoTitle || `${title} | ReLeaf`}
                description={seoDesc || `Legal documentation for ReLeaf: ${title}`}
                url={seoUrl}
            />

            <div className="container mx-auto px-6 md:px-8 py-12 max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-12 font-bold text-sm uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h1>
                    <p className="text-sm text-green-100/40 mb-12 font-mono">Last Updated: {lastUpdated}</p>

                    <div className="prose prose-invert prose-green max-w-none prose-headings:text-white prose-a:text-green-400 prose-strong:text-white">
                        {children}
                    </div>
                </motion.div>

                <div className="mt-24 pt-12 border-t border-green-500/10 text-center text-sm text-green-100/30">
                    &copy; {new Date().getFullYear()} ReLeaf Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
}
