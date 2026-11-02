import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeOffIcon, 
  Shield, 
  Terminal, 
  ArrowLeft,
  Cpu
} from 'lucide-react';
import Lightning from '../auth/Lightning';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password, true);
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'UNAUTHORIZED_ACCESS_ATTEMPT');
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  const inputClass = "w-full bg-transparent border-b border-cyan-900/50 text-white p-4 focus:border-cyan-400 focus:outline-none transition-colors duration-300 font-mono placeholder-zinc-700 text-sm";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-cyan-700/70 font-bold mb-1 block";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Lightning
          hue={180} // Cyan/Teal for Admin
          xOffset={0}
          speed={0.5}
          intensity={0.6}
          size={1}
        />
      </div>

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, black 100%) pointer-events-none z-0"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Container: Darker, Cyan Borders */}
        <div className="bg-black/80 backdrop-blur-xl border border-cyan-900/30 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_-12px_rgba(6,182,212,0.1)]">
          
          {/* Header */}
          <div className="mb-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-cyan-500 animate-pulse shadow-[0_0_10px_cyan]"></div>
              <span className="font-mono text-[10px] text-cyan-600 uppercase tracking-widest">Restricted_Area // Root_Access</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              Admin<br />Portal
              <Shield className="w-8 h-8 text-cyan-900 stroke-[1.5]" />
            </h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="group/field">
              <label htmlFor="email" className={labelClass}>
                Administrator ID
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="ADMIN@ROOT.SYS"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Terminal className="absolute right-2 top-4 w-4 h-4 text-cyan-900/50" />
              </div>
            </div>

            {/* Password Field */}
            <div className="group/field">
              <div className="flex justify-between items-end mb-1">
                <label htmlFor="password" className={labelClass}>
                  Access Protocol
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[9px] font-mono text-cyan-800 hover:text-cyan-400 uppercase tracking-wider transition-colors"
                >
                  {showPassword ? '[ MASK ]' : '[ REVEAL ]'}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={inputClass}
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-950/30 border border-cyan-900 text-cyan-400 py-4 font-bold uppercase tracking-widest hover:bg-cyan-900/20 hover:border-cyan-400 hover:text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 mt-8 group"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-cyan-900 border-t-cyan-400 rounded-full animate-spin" />
              ) : (
                <>
                  Initialize Session <Cpu className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials - Styled as System Log */}
          <div className="mt-8 border-t border-dashed border-cyan-900/30 pt-6">
            <p className="text-[10px] font-mono text-cyan-900 uppercase mb-2 tracking-widest">// DEMO_CREDENTIALS</p>
            <div className="bg-black/50 border border-zinc-900 p-3 font-mono text-[10px] text-zinc-500 space-y-1">
              <div className="flex justify-between">
                <span>Admin:</span>
                <span className="text-zinc-300">admin@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span>PASS:</span>
                <span className="text-zinc-300">admin123</span>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-600 hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3" />
              Terminate_Sequence
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;