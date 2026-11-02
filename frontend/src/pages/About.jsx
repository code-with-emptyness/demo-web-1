import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shirt, Leaf, Heart, Truck, ArrowRight, Star } from "lucide-react";

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      
      {/* --- Hero Section --- */}
      <div className="relative py-24 lg:py-32 border-b border-zinc-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
              Est. 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              DEFINING THE <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">CULTURE.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              More than just fabric. We engineer premium streetwear for those who value timeless design, sustainable sourcing, and uncompromising quality.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Our Story --- */}
      <section className="py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl -z-10 transform -rotate-2"></div>
              <div className="rounded-xl overflow-hidden border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">The Origin Story</h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  <span className="text-white font-bold">Demo Store</span> wasn't built in a boardroom. It started in a garage with a single screen printing press and an obsession with finding the perfect weight of cotton.
                </p>
                <p>
                  We were tired of "disposable fashion"—shirts that lost their shape after one wash. We wanted to create the essential tee: heavy enough to drape perfectly, soft enough to live in, and durable enough to last years.
                </p>
                <p>
                  Today, we are a team of designers and creators, but our mission remains unchanged: To provide the canvas for your personal style through premium, minimalist apparel.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-900 pt-8">
                <div>
                  <h3 className="text-3xl font-black text-white">10k+</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">50+</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Designs</p>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">100%</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Quality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Values Grid --- */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We Exist</h2>
            <p className="text-zinc-500">The four pillars that define our craftsmanship.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                icon: Shirt, 
                title: "Premium Fabric", 
                desc: "Double-spun combed cotton blends for unmatched softness and longevity." 
              },
              { 
                icon: Leaf, 
                title: "Sustainable", 
                desc: "Ethically sourced materials and eco-friendly packaging practices." 
              },
              { 
                icon: Heart, 
                title: "Customer First", 
                desc: "We don't just sell shirts; we build relationships. Satisfaction guaranteed." 
              },
              { 
                icon: Truck, 
                title: "Global Shipping", 
                desc: "Fast, tracked shipping to get your gear to you, wherever you are." 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="bg-black border border-zinc-900 p-8 rounded-2xl hover:border-zinc-700 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 relative overflow-hidden border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Star className="w-12 h-12 text-zinc-800 mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            READY TO UPGRADE YOUR FIT?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of others who have switched to the Demo Store standard. Experience the difference today.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-transform duration-300 hover:scale-105"
          >
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

    </div>
  );
};

export default About;