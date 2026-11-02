import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, BookOpen, Send } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const samplePosts = [
  {
    id: 1,
    category: "Materials",
    title: "On Fabrics: Why Weight Matters",
    date: "Dec 01, 2025",
    readTime: "4 min read",
    excerpt: "A short exploration into GSM, drape, and why heavier tees tend to age with more character than their lightweight counterparts.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Design Process",
    title: "The Art of Invisible Branding",
    date: "Nov 14, 2025",
    readTime: "6 min read",
    excerpt: "Why we choose typographic marks over loud logos. A deep dive into placement, subtlety, and the quiet confidence of minimal design.",
    image: "https://i.pinimg.com/736x/3c/16/8a/3c168a34b8895695699cc3a486da91d5.jpg"
  },
  {
    id: 3,
    category: "Studio Life",
    title: "Analog Rituals in a Digital World",
    date: "Oct 28, 2025",
    readTime: "3 min read",
    excerpt: "A visual diary from our screen-printing bench. The smell of ink, the sound of the squeegee, and the imperfections that make it human.",
    image: "https://i.pinimg.com/1200x/78/14/d4/7814d4cfc3ee0ee42613a56dfef70f85.jpg"
  },
];

const Journal = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Texture & Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-24 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-3xl">
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 text-zinc-500">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">The Journal</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6">
                NOTES ON <br/> 
                <span className="text-zinc-500">CRAFT & CULTURE</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                A collection of essays, studio notes, and visual stories about fabric, thoughtful design, and the process behind the product.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {samplePosts.map((post) => (
              <motion.article 
                key={post.id} 
                variants={itemVariants} 
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md mb-8 bg-zinc-900">
                  <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                  />
                  
                  {/* Floating Category Pill */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="w-px h-3 bg-zinc-800" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight group-hover:text-zinc-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Journal;