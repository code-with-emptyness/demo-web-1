import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  // Reusable styles
  const inputClasses = "w-full p-4 bg-black rounded-lg border border-zinc-800 text-white placeholder-zinc-600 focus:ring-1 focus:ring-white focus:border-white outline-none transition-all duration-300";
  const labelClasses = "text-xs font-bold text-zinc-400 ml-1 mb-2 block uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* --- Hero Section --- */}
      <div className="relative py-20 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
              GET IN TOUCH
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Questions about your order, collaborations, or just want to say hi? We're here.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Contact Information
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Our support team is available Monday through Friday, 9am to 6pm IST. 
                We aim to respond to all inquiries within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-white transition-colors">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Headquarters</h3>
                    <p className="text-zinc-500 text-sm mt-1">Demo Store HQ, Pune, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-white transition-colors">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Phone</h3>
                    <p className="text-zinc-500 text-sm mt-1">+91 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-white transition-colors">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Email</h3>
                    <p className="text-zinc-500 text-sm mt-1">pratap.vijay.singh.in@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 h-64 relative group">
              <div className="absolute inset-0 bg-zinc-900/20 pointer-events-none z-10 group-hover:bg-transparent transition-colors" />
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.780883414631!2d73.856743!3d18.520430!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06b9b44d1ff%3A0x33df98f9df3e95d0!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full transition-all duration-500 invert-[.1]"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Vijay Pratap singh"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="vijaypratapsingh@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;