import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon
} from "lucide-react";
import { useCart } from "../context/CartContext";
import api from "../config/axios";
import ProductCard from "../components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const response = await api.get(`/api/products?limit=4`);
      setRelatedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
    fetchRelatedProducts();
  }, [fetchProduct, fetchRelatedProducts]);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { buyNow: { product, quantity, size } } });
  };

  const incrementQty = () =>
    setQuantity(prev => Math.min(prev + 1, product?.stock || 10));
  const decrementQty = () =>
    setQuantity(prev => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-purple-400 hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pb-16 sm:pb-20">
      {/* Slightly smaller padding on mobile, wider on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main grid – single column on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] w-full bg-zinc-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-purple-900/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <button className="p-2.5 sm:p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-purple-600 transition-colors group">
                  <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Thumbnails – full width scrollable on mobile */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-purple-500 opacity-100 ring-2 ring-purple-500/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="flex flex-col mt-6 lg:mt-0">
            <div className="mb-2">
              <span className="text-purple-400 font-bold tracking-widest text-xs uppercase">
                New Drop
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-gray-500 ml-1">(128 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 sm:mb-8 flex items-baseline gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-gray-600 line-through decoration-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 border-b border-white/10 pb-8 sm:pb-10">
              {product.description}
            </p>

            {/* SIZES */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    Select Size
                  </span>
                  <Link to="/size-guide" className="text-xs text-purple-400 underline hover:text-purple-300">
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[2.75rem] cursor-pointer sm:min-w-[3rem] h-10 sm:h-12 flex items-center justify-center rounded-xl border text-sm sm:text-base transition-all font-medium ${
                        size === s
                          ? "bg-white text-black border-white"
                          : "bg-zinc-900 text-gray-400 border-zinc-700 hover:border-gray-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ADD TO CART */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-700 w-full sm:w-auto">
                <button
                  onClick={decrementQty}
                  className="p-3 sm:p-4 cursor-pointer hover:text-white text-gray-500 transition-colors"
                >
                  <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="w-10 sm:w-12 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="p-3 sm:p-4 cursor-pointer hover:text-white text-gray-500 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex-1 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base sm:text-lg py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2.5 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-900/50 transition-shadow"
              >
                <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                {product.stock ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                disabled={!product.stock || (product.sizes && product.sizes.length > 0 && !size)}
                className="bg-white cursor-pointer text-black font-bold text-base sm:text-lg py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-black/20 flex items-center justify-center gap-2.5 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-black/30 transition-shadow"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
              <div className="bg-zinc-900/50 p-3.5 sm:p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <TruckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white mb-1">
                    Free Shipping
                  </h4>
                  <p className="text-xs text-gray-500">
                    On all orders over ₹499
                  </p>
                </div>
              </div>
              <div className="bg-zinc-900/50 p-3.5 sm:p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white mb-1">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-gray-500">
                    100% protected checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS SECTION --- */}
        <div className="mt-20 sm:mt-24 lg:mt-32 border-t border-white/10 pt-12 sm:pt-16 lg:pt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts
              .filter((p) => p._id !== id)
              .map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                  viewMode="grid"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;