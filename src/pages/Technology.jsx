import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Droplets, Zap, Cpu, Scan, Recycle, Star } from 'lucide-react';
import SEO from '../components/SEO';

export default function Technology() {
    return (
        <div className="pt-32 pb-20 bg-nature-gradient bg-nature-pattern min-h-screen">
            <SEO
                title="Technology | ReLeaf"
                description="Bio-polymer matrix engineering. Military-grade protection without the plastic waste."
                url="https://releaf.com/technology"
            />
            <div className="container mx-auto px-6 md:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 font-mono text-sm mb-6"
                    >
                        BIO-POLYMER MATRIX V2.0
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                        Atomic Level<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Engineering.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        We didn't just pick a biodegradable plastic. We engineered a new material from the ground up to meet military-grade drop standards without the waste.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Layers,
                            color: "text-blue-400",
                            bg: "bg-blue-500/10",
                            border: "group-hover:border-blue-500/50",
                            title: "Shock Dispersion",
                            desc: "Micro-air pockets integrated into the inner lining disperse impact energy away from the device upon collision, reducing force transfer by 45%."
                        },
                        {
                            icon: Droplets,
                            color: "text-cyan-400",
                            bg: "bg-cyan-500/10",
                            border: "group-hover:border-cyan-500/50",
                            title: "Hydrophobic Shield",
                            desc: "A plant-based wax coating provides molecular resistance to water and stains without relying on toxic PFAS chemicals or synthetic sealants."
                        },
                        {
                            icon: Zap,
                            color: "text-yellow-400",
                            bg: "bg-yellow-500/10",
                            border: "group-hover:border-yellow-500/50",
                            title: "Conductive Array",
                            desc: "Embedded recycled copper filaments ensure perfect MagSafe alignment and charging efficiency, maintaining 15W wireless charging speeds."
                        },
                        {
                            icon: Cpu,
                            color: "text-purple-400",
                            bg: "bg-purple-500/10",
                            border: "group-hover:border-purple-500/50",
                            title: "Precision Molding",
                            desc: "Injection molded at 0.1mm tolerance for a perfect snap-fit that never loosens over time, mimicking the rigidity of polycarbonate."
                        },
                        {
                            icon: Scan,
                            color: "text-red-400",
                            bg: "bg-red-500/10",
                            border: "group-hover:border-red-500/50",
                            title: "Acoustic Channels",
                            desc: "Precision carved channels redirect bottom-firing speaker audio towards the user for a perceptible 2dB volume increase/clarity boost."
                        },
                        {
                            icon: Recycle,
                            color: "text-green-400",
                            bg: "bg-green-500/10",
                            border: "group-hover:border-green-500/50",
                            title: "Circular Design",
                            desc: "Made from 65% flax shive and 35% plant-based biopolymers. 100% compostable. 0% landfill contribution."
                        }
                    ].map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className={`group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.1)] ${tech.border}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${tech.bg} flex items-center justify-center border border-white/5 mb-6`}>
                                <tech.icon className={`w-7 h-7 ${tech.color}`} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">{tech.title}</h3>
                                <p className="text-neutral-400 leading-relaxed text-sm">{tech.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
