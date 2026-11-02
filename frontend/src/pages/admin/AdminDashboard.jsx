import { useState, useEffect } from 'react';
import { 
  PackageIcon, UsersIcon, IndianRupeeIcon, 
  ShoppingCartIcon, PlusIcon, EditIcon, 
  TrashIcon,
  Package,
  FileText,
  Image as ImageIcon,
  Tag,
  Layers,
  X,
  Activity,
  Terminal,
  ArrowRight
} from 'lucide-react';
import api from '../../config/axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Red']
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        api.get('/api/admin/dashboard'),
        api.get('/api/products?limit=5'),
        api.get('/api/orders?limit=5')
      ]);

      setStats(statsRes.data.stats);
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data.orders);
    } catch {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/api/products/${editingProduct._id}`, productForm);
        toast.success('Product database updated');
      } else {
        await api.post('/api/products', productForm);
        toast.success('New entry created');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Blue', 'Red']
      });
      fetchDashboardData();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      colors: product.colors || ['Black', 'White', 'Blue', 'Red']
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('CONFIRM DELETION: This action cannot be undone.')) return;
    
    try {
      await api.delete(`/api/products/${productId}`);
      toast.success('Entry removed');
      fetchDashboardData();
    } catch {
      toast.error('Delete failed');
    }
  };

  // --- STYLES ---
  const inputClass = "w-full bg-transparent border-b border-zinc-800 text-white p-3 focus:border-white focus:outline-none transition-colors font-mono text-sm placeholder-zinc-600";
  const labelClass = "text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block";

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
         <div className="text-white font-mono animate-pulse">LOADING SYSTEM DATA...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-20">
      
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              <Terminal className="w-6 h-6" />
              Admin_Console
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Operational</p>
            </div>
          </div>

          <button
            onClick={() => setShowProductForm(true)}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 group"
          >
            <PlusIcon className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            New Entry
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Stats Grid - Brutalist Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-zinc-800 mb-16 bg-zinc-900/20">
          {/* Stat 1 */}
          <div className="p-8 border-b md:border-b-0 lg:border-r border-zinc-800 hover:bg-zinc-900 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">TOTAL_PRODUCTS</span>
              <PackageIcon className="h-4 w-4 text-zinc-600" />
            </div>
            <p className="text-4xl font-bold font-mono">{stats.totalProducts.toString().padStart(2, '0')}</p>
          </div>

          {/* Stat 2 */}
          <div className="p-8 border-b md:border-b-0 lg:border-r border-zinc-800 hover:bg-zinc-900 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">TOTAL_ORDERS</span>
              <ShoppingCartIcon className="h-4 w-4 text-zinc-600" />
            </div>
            <p className="text-4xl font-bold font-mono">{stats.totalOrders.toString().padStart(2, '0')}</p>
          </div>

          {/* Stat 3 */}
          <div className="p-8 border-b md:border-r-0 lg:border-r border-zinc-800 hover:bg-zinc-900 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">ACTIVE_USERS</span>
              <UsersIcon className="h-4 w-4 text-zinc-600" />
            </div>
            <p className="text-4xl font-bold font-mono">{stats.totalUsers.toString().padStart(2, '0')}</p>
          </div>

          {/* Stat 4 */}
          <div className="p-8 border-zinc-800 hover:bg-zinc-900 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">REVENUE (INR)</span>
              <Activity className="h-4 w-4 text-zinc-600" />
            </div>
            <p className="text-4xl font-bold font-mono text-white">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Recent Products */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <PackageIcon className="h-5 w-5 text-zinc-500" />
                Inventory Log
              </h2>
              <span className="text-xs font-mono text-zinc-500">LATEST_ENTRIES</span>
            </div>

            <div className="space-y-1">
              {products.map((product) => (
                <div key={product._id} className="group flex items-center justify-between p-4 border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide">{product.name}</p>
                      <p className="text-xs font-mono text-zinc-500 mt-1">₹{product.price} // STOCK: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 hover:bg-white hover:text-black border border-zinc-700 transition-colors"
                    >
                      <EditIcon className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 hover:bg-red-600 hover:text-white hover:border-red-600 border border-zinc-700 transition-colors"
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <ShoppingCartIcon className="h-5 w-5 text-zinc-500" />
                Transaction Log
              </h2>
              <span className="text-xs font-mono text-zinc-500">RECENT_ACTIVITY</span>
            </div>

            <div className="space-y-1">
              {orders.map((order) => (
                <div key={order._id} className="p-4 border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 text-zinc-400">#{order._id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                      order.orderStatus === 'delivered' ? 'border-green-900 text-green-500 bg-green-900/10' :
                      order.orderStatus === 'shipped' ? 'border-blue-900 text-blue-500 bg-blue-900/10' :
                      'border-yellow-900 text-yellow-500 bg-yellow-900/10'
                    }`}>
                      {order.orderStatus}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-zinc-500 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-mono font-bold">₹{order.totalAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Modal Overlay */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-zinc-700 w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/30">
              <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                {editingProduct ? '>> UPDATE_DATABASE' : '>> INITIALIZE_PRODUCT'}
              </h2>
              <button
                onClick={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleProductSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
              
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Product Designation</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className={inputClass}
                      placeholder="ENTER NAME"
                      required
                    />
                    <Package className="absolute right-2 top-3 w-4 h-4 text-zinc-700" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Specifications</label>
                  <div className="relative">
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className={`${inputClass} min-h-[80px] resize-none`}
                      placeholder="ENTER DETAILS"
                      rows="3"
                      required
                    />
                    <FileText className="absolute right-2 top-3 w-4 h-4 text-zinc-700" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Unit Cost (INR)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className={inputClass}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Inventory Count</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className={inputClass}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Asset URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className={inputClass}
                      placeholder="HTTPS://"
                      required
                    />
                    <ImageIcon className="absolute right-2 top-3 w-4 h-4 text-zinc-700" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Category Tag</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className={inputClass}
                      placeholder="CATEGORY"
                      required
                    />
                    <Tag className="absolute right-2 top-3 w-4 h-4 text-zinc-700" />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest py-4 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {editingProduct ? 'Overwrite Data' : 'Execute Creation'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-white font-bold uppercase tracking-widest py-4 transition-all text-sm"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;