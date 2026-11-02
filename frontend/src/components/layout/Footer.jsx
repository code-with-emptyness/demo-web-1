import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight,
  ArrowUpRight,
  Minus,
  Zap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
      
      {/* 1. Top Bar: Technical Specs (Trust Badges) */}
      <div className="border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { title: 'SHIPPING', desc: 'Global Tracked Delivery' },
              { title: 'SECURITY', desc: '256-Bit SSL Encryption' },
              { title: 'WARRANTY', desc: '30-Day Quality Guarantee' }
            ].map((item, idx) => (
              <div key={idx} className="py-6 px-8 flex items-center justify-between hover:bg-white hover:text-black transition-colors duration-300 group cursor-default">
                <span className="font-mono text-xs uppercase tracking-widest">{`0${idx + 1} /// ${item.title}`}</span>
                <span className="font-bold text-sm uppercase tracking-wider">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* --- LEFT: Brand & Manifesto (Span 5) --- */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 p-8 md:p-16 flex flex-col justify-between relative">
            <div>
              <div className="mb-8">
                <div className="w-12 h-12 bg-white flex items-center justify-center mb-6">
                  <span className="font-black text-black text-2xl leading-none">D</span>
                </div>
                <h2 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">
                  Redefine<br/>The Standard.
                </h2>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs font-mono leading-relaxed">
                // EST. 2025<br/>
                Engineered in Pune, India.<br/>
                Premium garments for the modern minimalist. We prioritize longevity over trends.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-6 mt-12">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Follow</span>
                </a>
              ))}
            </div>
          </div>

          {/* --- MIDDLE: Navigation (Span 3) --- */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 p-8 md:p-16">
            <div className="h-full flex flex-col justify-between gap-12">
              
              {/* Section 1 */}
              <div>
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
                  Directory
                </h4>
                <ul className="space-y-4">
                  {['Shop Collection', 'New Arrivals', 'About Studio', 'Journal'].map((link, i) => {
                    let path = '/products'
                    if (link === 'About Studio') path = '/about'
                    if (link === 'Journal') path = '/journal'
                    return (
                      <li key={i}>
                            <Link
                              to={path}
                              onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
                              className="group flex items-center justify-between w-full text-lg font-bold uppercase tracking-tight hover:pl-2 transition-all duration-300">
                              <span>{link}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">Support</h4>
                <ul className="space-y-2">
                  {['Fabric & Care', 'Shipping & Returns', 'Size Guide', 'Contact Us'].map((link, i) => {
                    let path = '/contact';
                    if (link === 'Fabric & Care') path = '/fabric-care';
                    if (link === 'Shipping & Returns') path = '/shipping-returns';
                    if (link === 'Size Guide') path = '/size-guide';
                    return (
                      <li key={i}>
                        <Link to={path} onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                          <Minus className="w-3 h-3 text-zinc-600 group-hover:text-white" />
                          {link}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Newsletter (Span 4) --- */}
          <div className="lg:col-span-4 p-8 md:p-16 flex flex-col justify-center bg-zinc-950">
            <h3 className="text-2xl font-bold uppercase mb-2">Newsletter</h3>
            <p className="text-zinc-500 text-sm mb-8">Subscribe for exclusive drops and archive access.</p>
            
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors uppercase font-bold tracking-wide"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </form>

            <div className="mt-auto pt-12">
              <p className="font-mono text-[10px] text-zinc-600 uppercase">
                Dev by Vijay Pratap singh <br/>
                Pune, MH — IN
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Massive Bottom Brand Name (Watermark style) */}
      <div className="border-t border-white/10 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4">
          <h1 className="text-[12vw] sm:text-[13.5vw] leading-[0.8] font-black tracking-tighter text-zinc-900 select-none text-center pointer-events-none">
            DEMOSTORE®
          </h1>
        </div>
      </div>

      {/* 4. Bottom Legal Bar */}
      <div className="bg-white text-black py-2">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest">
          <p>© {currentYear} Inc. All Rights Reserved.</p>
          <p>Developer: Vijay Pratap singh</p>
          <div className="flex gap-6">
            <Link to="/privacy" onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className="hover:underline">Privacy</Link>
            <Link to="/terms" onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;