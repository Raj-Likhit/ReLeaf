import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
    seoUrl?: string; // made optional
}

export default function LegalLayout({ title, lastUpdated, children, seoUrl }: LegalLayoutProps) {
    return (
        <Layout>
            <SEO
                title={`${title} | ReLeaf`}
                description={`Read our ${title} to understand how we protect your rights and the planet.`}
                url={seoUrl || `https://releaf.com/${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="pt-32 pb-24 min-h-screen">
                <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
                        <p className="text-green-100/60">Last Updated: {lastUpdated}</p>
                    </motion.div>

                    <div className="prose prose-xl prose-invert prose-green max-w-none 
                        prose-headings:text-white prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-green-100/80 prose-p:leading-relaxed prose-p:text-lg
                        prose-strong:text-white prose-strong:font-bold
                        prose-li:text-green-100/80 prose-li:marker:text-green-500
                        prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300 hover:prose-a:underline transition-all">
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
