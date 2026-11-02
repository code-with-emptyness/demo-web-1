import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GridIcon, 
  ListIcon, 
  SearchIcon, 
  XIcon, 
  SlidersHorizontalIcon, 
  ChevronDownIcon,
  ChevronLeftIcon, 
  ChevronRightIcon 
} from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import api from '../config/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'newest'
  });

  // Auto-show filters on desktop (controlled by CSS display mainly, state for mobile drawer)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowFilters(false); // Reset mobile drawer state
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        category: filters.category,
        priceRange: filters.priceRange,
        sort: filters.sort,
        search: searchQuery
      };

      const response = await api.get('/api/products', { params });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, searchQuery]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProducts]); // Trigger fetch on page/filter change

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const clearFilters = () => {
    setFilters({ category: '', priceRange: '', sort: 'newest' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.category || filters.priceRange || searchQuery;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* --- PAGE HEADER --- */}
      <div className="border-b border-white/10 bg-black pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div>
               <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                 /// Archive / 2025
               </p>
               <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                 All<br/>Products
               </h1>
            </div>
            <div className="md:text-right">
               <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                 {totalProducts} Items Loaded
               </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- STICKY TOOLBAR --- */}
      <div className="sticky top-20 z-30 bg-black border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">
           
           {/* Mobile Filter Toggle */}
           <button 
             onClick={() => setShowFilters(true)}
             className="lg:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-zinc-400"
           >
             <SlidersHorizontalIcon className="w-4 h-4" />
             Filter
           </button>

           {/* Desktop Search */}
           <div className="hidden md:flex flex-1 max-w-md h-full border-x border-white/10">
              <form onSubmit={handleSearch} className="w-full h-full relative group">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="SEARCH ARCHIVE..."
                   className="w-full h-full bg-transparent px-6 text-xs font-bold uppercase placeholder-zinc-600 focus:outline-none text-white"
                 />
                 <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                    <SearchIcon className="w-4 h-4" />
                 </button>
              </form>
           </div>

           {/* Controls */}
           <div className="flex items-center gap-6 h-full">
              
              {/* Sort */}
              <div className="relative group h-full flex items-center">
                 <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value })}
                    className="appearance-none bg-transparent text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none pr-6 text-white hover:text-zinc-400 transition-colors"
                 >
                    <option value="newest">Latest Drops</option>
                    <option value="price-low">Price: Low</option>
                    <option value="price-high">Price: High</option>
                    <option value="popular">Popular</option>
                 </select>
                 <ChevronDownIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
              </div>

              <div className="w-[1px] h-6 bg-white/10 hidden sm:block"></div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-1 ${viewMode === 'grid' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                 >
                   <GridIcon className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-1 ${viewMode === 'list' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                 >
                   <ListIcon className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-40 h-fit">
             <div className="space-y-12">
                <div>
                   <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                     Refine
                   </h3>
                   <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
                </div>

                {hasActiveFilters && (
                   <button 
                     onClick={clearFilters}
                     className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
                   >
                     <XIcon className="w-3 h-3 group-hover:rotate-90 transition-transform" /> Clear All
                   </button>
                )}
             </div>
          </aside>

          {/* --- MOBILE DRAWER --- */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                />
                <motion.div 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed inset-y-0 right-0 w-full max-w-sm bg-zinc-950 border-l border-white/10 z-50 flex flex-col"
                >
                   <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <h2 className="text-xl font-black uppercase">Filter</h2>
                      <button onClick={() => setShowFilters(false)}>
                         <XIcon className="w-6 h-6" />
                      </button>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto p-6">
                      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
                   </div>

                   <div className="p-6 border-t border-white/10 grid grid-cols-2 gap-4 bg-zinc-950">
                      <button 
                        onClick={clearFilters}
                        className="py-4 text-xs font-bold uppercase border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-all"
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => setShowFilters(false)}
                        className="py-4 text-xs font-bold uppercase bg-white text-black hover:bg-zinc-200 transition-all"
                      >
                        Show Results
                      </button>
                   </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1 min-w-0">
             {/* Grid */}
             <ProductGrid products={products} loading={loading} viewMode={viewMode} />

             {/* Pagination */}
             {!loading && totalPages > 1 && (
                <div className="mt-20 flex justify-center border-t border-white/10 pt-12">
                   <div className="flex items-center gap-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-zinc-400 transition-colors flex items-center gap-2"
                      >
                        <ChevronLeftIcon className="w-4 h-4" /> Prev
                      </button>

                      <div className="font-mono text-xs">
                         <span className="text-white">{currentPage}</span> 
                         <span className="text-zinc-600 mx-2">/</span> 
                         <span className="text-zinc-600">{totalPages}</span>
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-zinc-400 transition-colors flex items-center gap-2"
                      >
                        Next <ChevronRightIcon className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             )}

             {/* Empty State */}
             {!loading && products.length === 0 && (
                <div className="py-32 text-center border border-dashed border-white/10">
                   <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
                      0 Results Found
                   </p>
                   <h3 className="text-2xl font-bold text-white mb-8">
                      No items match your filters.
                   </h3>
                   <button 
                     onClick={clearFilters}
                     className="px-8 py-3 border border-white text-white text-xs font-bold uppercase hover:bg-white hover:text-black transition-all"
                   >
                     Reset Archive
                   </button>
                </div>
             )}
          </main>

        </div>
      </div>

    </div>
  );
};

export default Products;