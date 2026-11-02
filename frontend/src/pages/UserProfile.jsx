  import { useState, useEffect } from 'react';
  import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Save, 
    Loader2,
    Camera,
    CreditCard,
    Package,
    ChevronRight
  } from 'lucide-react';
  import { useAuth } from '../context/AuthContext';
  import { motion } from 'framer-motion';
  import { toast } from 'react-hot-toast';
  import api from '../config/axios';

  const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
    });

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          
          const res = await api.get("/api/user/profile");
          setFormData((prev) => ({ ...prev, ...res.data }));
          } catch (err) {
            console.error(err);
          }
      };
      fetchProfile();
    }, []);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await api.post("/api/user/profile", formData);

        updateUser(response.data);
        setFormData(response.data);

        toast.success("Profile updated successfully", {
          style: { background: "#fff", color: "#000" },
        });
      } catch {
        toast.error("Could not update profile");
      } finally {
        setLoading(false);
      }
    };

  // UI Components
  const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>
    </div>
  );

  const InputField = ({ label, name, type = "text", value, icon: Icon, readOnly = false }) => (
    <div className="group relative">
      <label className="block text-xs font-medium text-zinc-500 mb-2 group-focus-within:text-white transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          className={`
            w-full bg-zinc-900/50 text-white rounded-2xl py-4 pl-12 pr-4 border border-transparent 
            focus:bg-zinc-900 focus:border-zinc-700 focus:outline-none focus:ring-0 
            transition-all duration-300 placeholder-zinc-700
            ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          placeholder="Not set"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          
          {/* --- LEFT COLUMN: Profile Card --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-8">
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 text-center overflow-hidden relative">
                {/* Decorative Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative inline-block mb-6 group cursor-pointer">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                      <span className="text-4xl font-bold text-zinc-700 select-none">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : <User />}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Camera size={16} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">{formData.name || 'Anonymous'}</h2>
                <p className="text-zinc-500 text-sm mb-6">{formData.email}</p>

                <div className="flex justify-center gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-xs font-medium text-zinc-300">
                    {user?.role || 'Member'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-500">
                    Active Status
                  </span>
                </div>     
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Edit Forms --- */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit}>
              
              {/* 1. Personal Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 mb-8"
              >
                <SectionTitle 
                  title="Personal Information" 
                  subtitle="Update your photo and personal details here." 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Full Name" 
                    name="name" 
                    value={formData.name} 
                    icon={User} 
                  />
                  <InputField 
                    label="Email Address" 
                    name="email" 
                    value={formData.email} 
                    icon={Mail} 
                    readOnly 
                  />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Phone Number" 
                      name="phone" 
                      value={formData.phone} 
                      icon={Phone} 
                    />
                  </div>
                </div>
              </motion.div>

              {/* 2. Address Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 mb-8"
              >
                <SectionTitle 
                  title="Shipping Address" 
                  subtitle="Used for calculating shipping and checkout." 
                />
                
                <div className="space-y-6">
                  <InputField 
                    label="Street Address" 
                    name="address" 
                    value={formData.address} 
                    icon={MapPin} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField 
                      label="City" 
                      name="city" 
                      value={formData.city} 
                      icon={MapPin} 
                    />
                    <InputField 
                      label="State / Region" 
                      name="state" 
                      value={formData.state} 
                      icon={MapPin} 
                    />
                    <InputField 
                      label="ZIP Code" 
                      name="zipCode" 
                      value={formData.zipCode} 
                      icon={MapPin} 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Action Bar */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    relative overflow-hidden group
                    bg-white text-black px-8 py-3.5 rounded-xl font-semibold
                    hover:bg-zinc-200 transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center gap-2
                  "
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;