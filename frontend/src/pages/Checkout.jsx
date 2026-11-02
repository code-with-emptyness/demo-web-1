import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  MapPin, 
  User, 
  ShoppingBag, 
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNow = location.state?.buyNow;

  const checkoutItems = buyNow
    ? [
        {
          product: buyNow.product,
          quantity: buyNow.quantity,
          size: buyNow.size,
        },
      ]
    : items;

  const checkoutSubtotal = checkoutItems.reduce(
    (sum, it) => sum + (it.product?.price || 0) * it.quantity,
    0
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: checkoutItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
        })),
        totalAmount: checkoutSubtotal * 1.08,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      await api.post('/api/orders', orderData);
      if (!buyNow) {
        clearCart();
      }
      navigate('/orders?success=true');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.msg || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  // Brutalist Input Style: Sharp edges, high contrast, mono-accent
  const inputBase = "w-full bg-transparent border-b border-zinc-800 px-0 py-4 text-white placeholder-zinc-600 focus:border-white focus:ring-0 transition-colors duration-300 outline-none rounded-none";
  const labelBase = "text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1 block";
  const sectionHeader = "text-3xl font-bold tracking-tighter text-white mb-8 flex items-baseline gap-4";
  const sectionNumber = "font-mono text-zinc-600 text-xl opacity-50";

  // --- EMPTY STATE ---
  if (!buyNow && items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center relative z-10"
        >
          <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 mx-auto mb-8 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Cart Void</h2>
          <p className="text-zinc-500 font-mono text-sm mb-10">
            // SYSTEM_STATUS: NO_ITEMS_DETECTED
          </p>
          <button
            onClick={() => navigate('/products')}
            className="group bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-3 mx-auto"
          >
            Initialize Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans pb-24">
      
      {/* Top Bar */}
      <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Secure Checkout_v2.0</span>
          </div>
          <Lock className="w-4 h-4 text-zinc-500" />
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* --- LEFT COLUMN: FORMS --- */}
          <div className="lg:col-span-7 space-y-20">
            <form id="checkout-form" onSubmit={handleSubmit}>
              
              {/* 01. CONTACT */}
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <h2 className={sectionHeader}>
                  <span className={sectionNumber}>01.</span>
                  IDENTITY
                </h2>
                <div className="grid gap-8">
                  <div className="relative group">
                    <label className={labelBase}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputBase}
                      placeholder="user@example.com"
                      required
                    />
                    <div className="absolute right-0 bottom-4 text-zinc-600 group-focus-within:text-white transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* 02. SHIPPING */}
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mt-16"
              >
                <h2 className={sectionHeader}>
                  <span className={sectionNumber}>02.</span>
                  LOGISTICS
                </h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                       <label className={labelBase}>First Name</label>
                       <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={inputBase}
                        required
                      />
                    </div>
                    <div>
                       <label className={labelBase}>Last Name</label>
                       <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={inputBase}
                        required
                      />
                    </div>
                  </div>

                  <div>
                     <label className={labelBase}>Destination Address</label>
                     <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={inputBase}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8">
                    <div className="sm:col-span-2">
                      <label className={labelBase}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={inputBase}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelBase}>State / Prov</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={inputBase}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelBase}>Postal Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={inputBase}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className={labelBase}>Region</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`${inputBase} appearance-none cursor-pointer uppercase`}
                    >
                      <option className="bg-zinc-900" value="United States">United States</option>
                      <option className="bg-zinc-900" value="United Kingdom">United Kingdom</option>
                      <option className="bg-zinc-900" value="Canada">Canada</option>
                      <option className="bg-zinc-900" value="India">India</option>
                    </select>
                    <MapPin className="absolute right-0 bottom-4 w-4 h-4 text-zinc-600 pointer-events-none" />
                  </div>
                </div>
              </motion.section>

              {/* 03. PAYMENT */}
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mt-16"
              >
                <h2 className={sectionHeader}>
                  <span className={sectionNumber}>03.</span>
                  TRANSACTION
                </h2>

                <div className="p-1 border border-zinc-800 bg-zinc-900/20 mb-8">
                  <div className="bg-black p-6 sm:p-8 border border-zinc-800/50">
                    <div className="flex justify-between mb-8">
                      <CreditCard className="w-6 h-6 text-white" />
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-zinc-800 rounded-sm"></div>
                        <div className="w-8 h-5 bg-zinc-800/50 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={labelBase}>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="0000 0000 0000 0000"
                          className={`${inputBase} font-mono tracking-wider`}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className={labelBase}>Exp. Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`${inputBase} font-mono`}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelBase}>CVC</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={`${inputBase} font-mono`}
                              required
                            />
                            <Lock className="absolute right-0 bottom-4 w-3 h-3 text-zinc-600" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className={labelBase}>Cardholder Name</label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className={`${inputBase} uppercase`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </form>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white text-black p-6 sm:p-8 relative"
              >
                {/* Receipt jagged edge visual - using CSS clip-path or SVG */}
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-200"></div>

                <div className="flex justify-between items-start mb-8 pb-8 border-b border-black/10 border-dashed">
                  <div>
                    <h3 className="font-black text-2xl uppercase tracking-tighter mb-1">Invoice</h3>
                    <p className="font-mono text-xs text-zinc-500">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-zinc-500">{new Date().toLocaleDateString("en-IN")}</p>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                  {checkoutItems.map((item) => (
                    <div key={`${item.product._id}-${item.size}`} className="flex justify-between items-start group">
                      <div className="flex gap-3">
                        <span className="font-mono text-xs text-zinc-400 pt-1">x{item.quantity}</span>
                        <div>
                          <p className="font-bold text-sm uppercase leading-tight">{item.product.name}</p>
                          <p className="text-xs text-zinc-500 font-mono mt-1">SIZE: {item.size}</p>
                        </div>
                      </div>
                      <p className="font-mono text-sm font-medium">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-black/10 border-dashed pt-6 space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">SUBTOTAL</span>
                    <span>₹{checkoutSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">SHIPPING</span>
                    <span className="uppercase">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TAX (8%)</span>
                    <span>₹{(checkoutSubtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t-2 border-black mt-6 pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-black text-xl uppercase tracking-tighter">Total Due</span>
                    <span className="font-mono text-3xl font-bold">
                      ₹{(checkoutSubtotal * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  form="checkout-form"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black cursor-pointer text-white py-5 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirm Payment <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center gap-3 justify-center text-zinc-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">Encrypted Transaction</span>
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;