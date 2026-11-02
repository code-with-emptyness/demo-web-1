import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  motion, 
  useScroll, 
  useTransform 
} from "framer-motion";
import {
  ArrowRightIcon,
  StarIcon,
  GlobeAmericasIcon,
  ShieldCheckIcon,
  ArrowDownIcon
} from "@heroicons/react/24/outline";
import ProductGrid from "../components/products/ProductGrid";
import api from "../config/axios";

// --- 1. GRAIN TEXTURE (Adds "Film" feel) ---
const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.8" 
          numOctaves="3" 
          stitchTiles="stitch" 
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- 2. MARQUEE COMPONENT ---
const Marquee = ({ text, reverse = false }) => {
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-black py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4 text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
            {text} <span className="text-white mx-2">•</span>
          </span>
        ))}
      </motion.div>
      {/* Gradient Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
    </div>
  );
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get("/api/products?limit=4");
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black text-white selection:bg-white selection:text-black font-sans">
      <GrainOverlay />
      
      {/* --- HERO SECTION: Brutalist / Cinematic --- */}
      <section className="relative h-screen w-full overflow-hidden border-b border-white/10">
        {/* Video Background - Desaturated & Darkened */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale opacity-60 scale-105" 
            src="/hero.mp4" 
          />
        </motion.div>

        {/* Hero Content - Bottom Aligned, Editorial Style */}
        <motion.div 
          style={{ opacity: opacityHero }}
          className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 py-12 max-w-[1800px] mx-auto"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-start border-b border-white/20 pb-6">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Collection</span>
              <span className="font-bold text-white uppercase tracking-wider">Spring / Summer '25</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Coordinates</span>
              <span className="font-bold text-white uppercase tracking-wider">Pune, IN — 18.5°N</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-12">
            <div className="flex flex-col">
              <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-difference">
                FUTURE
              </h1>
              <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-transparent stroke-text ml-10 md:ml-32">
                ARCHIVE
              </h1>
              <style>{`.stroke-text { -webkit-text-stroke: 2px white; }`}</style>
            </div>

            {/* CTA Block */}
            <div className="md:mb-8 flex flex-col items-start gap-6 max-w-sm">
              <p className="text-zinc-300 text-sm leading-relaxed font-mono border-l border-white/30 pl-4">
                / 01 — DEFINING THE NEW STANDARD. <br/>
                HEAVYWEIGHT COTTON. BOX FIT. <br/>
                ENGINEERED FOR LONGEVITY.
              </p>
              <Link
                to="/products"
                className="group flex items-center gap-4 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all"
              >
                Shop Drop
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <ArrowDownIcon className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* --- MARQUEE DIVIDER --- */}
      <Marquee text="PREMIUM FABRICS • GLOBAL SHIPPING • LIMITED STOCK • SECURE CHECKOUT" />

      {/* --- MANIFESTO GRID (Replaces Features) --- */}
      <section className="border-b border-white/10 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Feature 1 */}
          <div className="group relative p-12 flex flex-col justify-between min-h-[300px] hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start">
              <GlobeAmericasIcon className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
              <span className="font-mono text-xs text-zinc-600">01</span>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Worldwide</h3>
              <p className="text-zinc-500 text-sm max-w-xs">Tracked shipping to 150+ countries via DHL Express.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative p-12 flex flex-col justify-between min-h-[300px] hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start">
              <ShieldCheckIcon className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
              <span className="font-mono text-xs text-zinc-600">02</span>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Guarantee</h3>
              <p className="text-zinc-500 text-sm max-w-xs">30-day returns on all unwashed, unworn items. No questions.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative p-12 flex flex-col justify-between min-h-[300px] hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start">
              <StarIcon className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
              <span className="font-mono text-xs text-zinc-600">03</span>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Quality</h3>
              <p className="text-zinc-500 text-sm max-w-xs">400GSM Heavyweight French Terry Cotton. Built to last.</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SHOP SECTION (Horizontal Scroll vibe) --- */}
      <section className="py-24 bg-black relative">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-900 pb-8">
             <div>
                <span className="font-mono text-xs text-purple-500 uppercase tracking-widest block mb-2">/// New Arrivals</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
                   Latest<br/>Drops
                </h2>
             </div>
             <Link to="/products" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors">
                View All <ArrowRightIcon className="w-4 h-4" />
             </Link>
          </div>

          {/* Product Grid with stricter spacing and no shadows for cleaner look */}
          <div className="min-h-[400px]">
             <ProductGrid products={featuredProducts} loading={loading} />
          </div>

          <div className="mt-12 md:hidden text-center">
             <Link to="/products" className="inline-block border border-white px-8 py-3 text-sm font-bold uppercase tracking-widest">
                View All Products
             </Link>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER (Brutalist) --- */}
      <section className="border-t border-white/10 bg-zinc-950">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text Side */}
          <div className="p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              Join the<br/><span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Club.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Get early access to limited drops and exclusive archive sales. No spam, just gear.
            </p>
          </div>

          {/* Form Side */}
          <div className="p-12 md:p-24 flex flex-col justify-center bg-black">
             <form className="w-full max-w-md mx-auto space-y-6">
                <div className="group relative">
                   <input 
                      type="email" 
                      placeholder="ENTER EMAIL"
                      className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl font-bold text-white placeholder-zinc-700 focus:border-white focus:outline-none uppercase transition-colors"
                   />
                </div>
                <button className="w-full bg-white text-black py-5 font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                   Subscribe
                </button>
                <p className="text-center text-zinc-600 text-xs font-mono">
                   BY SUBSCRIBING YOU AGREE TO OUR T&CS.
                </p>
             </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;