import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Guard clause

        const context = canvas.getContext('2d');
        if (!context) return;

        const frameCount = 40;
        const images: HTMLImageElement[] = [];
        let framesLoaded = 0;

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                framesLoaded++;
                if (framesLoaded === frameCount) {
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }

        let animationFrameId: number;
        let currentFrame = 0;
        let direction = 1;
        let lastTime = 0;

        // Configurable speeds
        const fpsForward = 15; // Increased from 12
        const fpsBackward = 9; // Increased from 6

        const render = (time: number) => {
            if (!canvas) return;

            // Handle aspect ratio (cover)
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;

                const img = images[currentFrame];
                if (img) {
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;
                    context.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
            }

            // Dynamic interval based on direction
            const currentFps = direction === 1 ? fpsForward : fpsBackward;
            const interval = 1000 / currentFps;

            if (time - lastTime > interval) {
                // Ping-pong Logic
                const nextFrame = currentFrame + direction;
                if (nextFrame >= frameCount) {
                    currentFrame = frameCount - 2;
                    direction = -1;
                } else if (nextFrame < 0) {
                    currentFrame = 1;
                    direction = 1;
                } else {
                    currentFrame = nextFrame;
                }
                lastTime = time;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        if (imagesLoaded) {
            requestAnimationFrame(render);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [imagesLoaded]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#051a14] pt-32">

            {/* Canvas Background */}
            <div className="absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#051a14]/80 via-transparent to-[#051a14] z-10" />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center pt-16 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mb-8"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        The Future of Protection
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white pb-4 drop-shadow-xl leading-tight">
                        Designed by Nature.<br />
                        <span className="text-green-400">Engineered for Life.</span>
                    </h1>
                </motion.div>

                <p className="text-xl md:text-2xl text-green-100/60 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
                    The world's first fully biodegradable premium case. Military-grade drop protection, MagSafe compatible, and zero waste.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/products"
                        className="px-10 py-5 rounded-full bg-white text-[#051a14] font-bold text-lg hover:bg-green-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                    >
                        Shop Collection
                    </Link>
                    <button className="px-10 py-5 rounded-full bg-green-900/30 border border-green-500/20 text-white font-medium hover:bg-green-500/20 transition-all flex items-center gap-2 group backdrop-blur-sm">
                        <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        Watch The Film
                    </button>
                </div>
            </div>
        </section>
    )
}

const BentoGrid = () => {
    return (
        <section className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">The Ecosystem.</h2>
                    <p className="text-green-100/60 text-base md:text-lg">Every detail refined. Every impact considered.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[800px]">
                    {/* Card 1: Large Feature */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-2 md:row-span-2 rounded-[2rem] md:rounded-[2.5rem] bg-[#0a2018]/60 border border-green-500/10 backdrop-blur-sm overflow-hidden relative group min-h-[400px] md:min-h-0"
                    >
                        <img
                            src="/case-forest.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-700 scale-110 group-hover:scale-100"
                            loading="lazy"
                            alt="Forest Green Case"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051a14] via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-white">Zero Waste.</h3>
                            <p className="text-green-200/70 font-mono text-xs md:text-sm max-w-[200px] leading-relaxed">COMPLETE DECOMPOSITION IN 6 MONTHS UNDER COMPOST CONDITIONS.</p>
                        </div>
                        <ArrowUpRight className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 md:w-10 md:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    {/* Card 2: Drop Test */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="col-span-1 border border-green-500/10 rounded-[2rem] md:rounded-[2.5rem] bg-[#0a2018]/40 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-green-500/30 transition-colors min-h-[200px]"
                    >
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Shield className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
                        </div>
                        <span className="font-mono text-[10px] md:text-xs text-green-400 uppercase tracking-widest">Resistance</span>
                        <div>
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2">10ft</div>
                            <p className="text-green-100/50 text-xs md:text-sm">MILITARY GRADE<br />DROP PROTECTION</p>
                        </div>
                    </motion.div>

                    {/* Card 3: Magsafe */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="col-span-1 bg-green-500 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative min-h-[200px]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none" />
                        <span className="font-mono text-[10px] md:text-xs text-[#051a14]/60 uppercase tracking-widest relative z-10">Connectivity</span>
                        <div className="relative z-10">
                            <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#051a14] mb-4" />
                            <h3 className="text-xl md:text-2xl font-bold text-[#051a14] leading-none mb-2">MagSafe<br />Ready</h3>
                            <p className="text-[#051a14]/70 text-xs md:text-sm">SNAP ON. CHARGE UP.</p>
                        </div>
                    </motion.div>

                    {/* Card 4: Ocean Stats (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-900/40 to-[#051a14]/40 border border-green-500/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex items-center justify-between overflow-hidden relative min-h-[180px]"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-2">Ocean Reborn</h3>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-green-200/60">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                                LIVE IMPACT TRACKER
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <div className="text-4xl md:text-7xl font-mono font-bold text-white tracking-tighter">14,392</div>
                            <div className="text-[10px] md:text-xs font-mono text-green-500 uppercase tracking-widest mt-2">Lbs Plastic Removed</div>
                        </div>

                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const Reviews = () => {
    const reviews = [
        {
            publication: "VOGUE",
            quote: "The chicest sustainable accessory of the year. Finally, protection that feels as good as it looks.",
        },
        {
            publication: "WIRED",
            quote: "A biodegradable case that actually survives the drop test. ReLeaf is the real deal.",
        },
        {
            publication: "GQ",
            quote: "The essential upgrade for the modern minimalist. Zero waste, zero compromise.",
        },
        {
            publication: "The Verge",
            quote: "ReLeaf proves you don't need plastic to protect your phone. A triumph of material engineering.",
        }
    ];

    return (
        <section className="py-32 border-y border-green-500/5 bg-[#051a14]/30 backdrop-blur-sm relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <h3 className="text-2xl font-bold font-display text-white/40 tracking-tight">{review.publication}</h3>
                            <p className="text-lg text-green-100/80 leading-relaxed font-medium">"{review.quote}"</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default function Home() {
    return (
        <>
            <SEO />
            <Hero />
            <BentoGrid />
            <Reviews />
        </>
    );
}
