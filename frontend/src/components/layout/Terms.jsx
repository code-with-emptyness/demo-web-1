import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  CreditCard, 
  RefreshCcw, 
  Gavel, 
  ScrollText, 
  AlertCircle, 
  Copyright,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const Terms = () => {
  // Organized data for the cards
  const termsData = [
    {
      icon: ScrollText,
      title: "Acceptance of Terms",
      summary: "The Basics",
      content: "By accessing our website and purchasing products, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services."
    },
    {
      icon: CreditCard,
      title: "Orders & Payments",
      summary: "Billing",
      content: "All orders are subject to availability. We reserve the right to refuse service. Prices for our products are subject to change without notice. We use secure third-party processors for all transactions."
    },
    {
      icon: RefreshCcw,
      title: "Returns & Refunds",
      summary: "Policy",
      content: "Items can be returned within 30 days of delivery. Products must be unworn and in original packaging. Refunds are processed to the original payment method after inspection."
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      summary: "Ownership",
      content: "All content included on this site (text, graphics, logos, images) is the property of Demo Store and is protected by international copyright laws."
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      summary: "Disclaimer",
      content: "Demo Store shall not be liable for any indirect, incidental, or punitive damages arising from your use of our service or products procured using the service."
    },
    {
      icon: Gavel,
      title: "Governing Law",
      summary: "Jurisdiction",
      content: "These Terms shall be governed by and defined following the laws of [Your State/Country]. Any disputes shall be resolved within this jurisdiction."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-zinc-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-zinc-800/20 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-xl">
              <Scale className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-zinc-700" />
              <span className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase">Legal Agreement</span>
              <span className="h-px w-8 bg-zinc-700" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
              Terms of Service
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully. They govern your use of the Demo Store website and our services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Intro Banner */}
      <section className="relative z-10 py-12 border-b border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <ShieldCheck className="w-10 h-10 text-zinc-300 flex-shrink-0" />
            <p className="text-zinc-300 text-lg leading-relaxed text-left">
              These terms constitute a legally binding agreement between you and Demo Store. By accessing the site, you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {termsData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group relative flex flex-col p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-black border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-800/50 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      {item.summary}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {item.content}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;