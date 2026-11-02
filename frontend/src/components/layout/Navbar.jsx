import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* 1. Announcement Ticker */}
      <div className="bg-zinc-900 text-zinc-400 text-[10px] font-mono uppercase tracking-widest py-2 px-4 text-center relative z-50 border-b border-zinc-800">
        <span className="animate-pulse text-white">●</span> Free Shipping on Orders Over ₹499
      </div>

      {/* 2. Main Navbar */}
      <nav className="sticky top-0 z-40 bg-black border-b border-white/10 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* --- Left: Mobile Trigger & Search --- */}
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:text-zinc-400 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <div className="hidden lg:flex items-center">
                <div className="relative group">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <MagnifyingGlassIcon className="h-4 w-4 text-zinc-500 absolute left-0 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      placeholder="SEARCH"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-b border-transparent focus:border-white py-1 pl-6 w-24 focus:w-48 transition-all duration-300 text-xs font-bold text-white placeholder-zinc-600 focus:outline-none uppercase tracking-wider"
                    />
                  </form>
                </div>
              </div>
            </div>

            {/* --- Center: LOGO --- */}
            <div className="flex-shrink-0 flex justify-center">
              <Link to="/" className="group flex items-center gap-3">
                {/* Visual Mark */}
                <div className="w-10 h-10 bg-white flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 ease-out">
                  <span className="font-black text-black text-xl leading-none">D</span>
                </div>
                
                {/* Text Mark */}
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-black tracking-tighter text-white leading-none">
                    DEMO<span className="text-zinc-600">STORE</span>
                  </h1>
                  <span className="text-[8px] font-mono text-zinc-500 tracking-[0.2em] uppercase hidden sm:block">
                    Est. 2025
                  </span>
                </div>
              </Link>
            </div>

            {/* --- Right: Links, Contact, Account --- */}
            <div className="flex items-center justify-end gap-6 flex-1">
              
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-8">
                {['/products', '/about'].map((path) => (
                  <Link 
                    key={path}
                    to={path} 
                    className={`text-xs font-bold uppercase tracking-widest hover:text-white transition-colors ${isActiveRoute(path) ? 'text-white border-b border-white' : 'text-zinc-500'}`}
                  >
                    {path.replace('/', '')}
                  </Link>
                ))}

                {/* CONTACT BUTTON */}
                <Link 
                  to="/contact" 
                  className="bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <div className="h-4 w-[1px] bg-zinc-800 hidden lg:block"></div>

              {/* Account */}
              <div className="hidden lg:block relative group">
                {user ? (
                  <button className="flex items-center gap-2 text-xs font-bold text-white uppercase hover:text-zinc-300">
                    <UserIcon className="h-4 w-4" />
                    <span>ACCOUNT</span>
                  </button>
                ) : (
                  <Link to="/login" className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider">
                    LOGIN
                  </Link>
                )}

                {/* Dropdown Menu */}
                {user && (
                  <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-black border border-zinc-800 p-2 min-w-[200px] shadow-2xl">
                      <div className="px-3 py-2 border-b border-zinc-900 mb-2">
                        <p className="text-[10px] text-zinc-500 uppercase">Signed in as</p>
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      </div>
                      <Link to="/profile" className="block px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 uppercase">Profile</Link>
                      <Link to="/orders" className="block px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 uppercase">Orders</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard" className="block px-3 py-2 text-xs font-mono text-red-400 hover:text-blue-3 00 hover:bg-zinc-900 uppercase">Admin Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs font-mono text-zinc-500 hover:text-white hover:bg-zinc-900 uppercase mt-2 border-t border-zinc-900">
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-2 group">
                <span className="text-xs font-bold text-white group-hover:text-zinc-300 hidden sm:block uppercase tracking-wider">
                  Cart
                </span>
                <div className="relative">
                  <ShoppingCartIcon className="h-5 w-5 text-white group-hover:text-zinc-300 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-none">
                    {getCartItemsCount()}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Full Screen Mobile Menu --- */}
        <div 
          className={`fixed inset-0 bg-black z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-6 h-20 border-b border-zinc-900">
              <span className="text-xs font-mono text-zinc-500 uppercase">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:rotate-90 transition-transform duration-300"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            {/* Search Mobile */}
            <div className="px-6 py-8 border-b border-zinc-900">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 p-4 text-lg font-black text-white placeholder-zinc-600 focus:outline-none uppercase"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              {[
                { to: "/", label: "Index", sub: "Start Here" },
                { to: "/products", label: "Shop", sub: "Latest Drops" },
                { to: "/about", label: "Studio", sub: "Our Philosophy" },
                { to: "/contact", label: "Contact", sub: "Get Help" },
              ].filter(Boolean).map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex justify-between items-end border-b border-zinc-900 pb-4"
                >
                  <div>
                    <span className="block text-[10px] font-mono text-zinc-500 mb-1">0{i + 1}</span>
                    <span className="text-4xl font-black text-transparent stroke-text group-hover:text-white transition-colors uppercase tracking-tighter" style={{ WebkitTextStroke: '1px white' }}>
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-600 group-hover:text-white uppercase">
                    {item.sub}
                  </span>
                </Link>
              ))}
            </div>

            {/* Footer User Info */}
            <div className="p-6 bg-zinc-950 border-t border-zinc-900">
              {user ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Currently logged in as</p>
                      <p className="text-lg font-bold text-white">{user.name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="p-3 bg-zinc-900 text-white hover:bg-white hover:text-black transition-colors">
                        <UserIcon className="h-5 w-5" />
                      </Link>
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="p-3 bg-zinc-900 text-white hover:bg-white hover:text-black transition-colors">
                        <ShoppingCartIcon className="h-5 w-5" />
                      </Link>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 bg-zinc-900 text-sm text-red-500 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                          Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="p-3 bg-zinc-900 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <ArrowRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="py-4 text-center border border-zinc-800 text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="py-4 text-center bg-white text-black font-bold uppercase text-sm hover:bg-zinc-200 transition-colors">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;