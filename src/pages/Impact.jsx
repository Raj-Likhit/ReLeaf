import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';

export default function Impact() {
    return (
        <div className="pt-24 pb-20 bg-nature-gradient bg-nature-pattern min-h-screen">
            <SEO
                title="Impact | ReLeaf"
                description="50 million tons of e-waste annually. We're here to change that. 100% Carbon Neutral."
                url="https://releaf.com/impact"
            />
            <div className="container mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        We don't just protect phones.<br />
                        <span className="text-green-500">We protect the planet.</span>
                    </h1>
                    <p className="text-xl text-neutral-400">
                        The tech industry generates 50 million tons of e-waste annually.
                        We're here to change that, one case at a time.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {[
                        { number: '50k+', label: 'Trees Planted' },
                        { number: '10k', label: 'Lbs Plastic Removed' },
                        { number: '100%', label: 'Carbon Neutral' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-3xl bg-green-900/10 border border-green-500/20 text-center hover:bg-green-500/10 transition-colors duration-300"
                        >
                            <div className="text-6xl font-bold text-green-400 mb-2 font-serif">{stat.number}</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">The Cycle of Life</h2>
                            <p className="text-neutral-400 leading-relaxed mb-8">
                                Our cases are made from Flaxostic™, a proprietary blend of flax shive and plant-based biopolymers.
                                Unlike traditional plastic functionality that lasts forever in landfills, ReLeaf cases are designed
                                to break down completely in industrial composting environments within 6 months.
                            </p>
                            <ul className="space-y-4">
                                {['Plant Based Materials', 'Non-Toxic Dyes', 'Plastic-Free Packaging'].map((item, i) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="flex items-center gap-3 text-white"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-square rounded-2xl bg-neutral-800 border border-white/5 relative overflow-hidden group">
                            <img src="/case-forest.png" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-transparent to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
