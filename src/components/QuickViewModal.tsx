import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    t,
    getCategoryName
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFav = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(
      quickViewProduct, 
      quantity, 
      selectedColor || (quickViewProduct.colors?.[0]?.name),
      selectedSize || (quickViewProduct.sizes?.[0])
    );
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    navigateTo('product-detail', prod);
  };

  return (
    <AnimatePresence>
      <div 
        id="quick-view-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
        onClick={() => setQuickViewProduct(null)}
      >
        <motion.div
          id="quick-view-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            id="close-quick-view-btn"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
            
            {/* Gallery Column */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square rounded-2xl bg-zinc-50 overflow-hidden border border-zinc-100 relative">
                <img
                  src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.discountPercent && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                    -{quickViewProduct.discountPercent}% {t.badgeDiscount}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      id={`thumb-${idx}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx ? 'border-zinc-900 scale-95 ring-2 ring-zinc-900/10' : 'border-zinc-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  <span>{quickViewProduct.brand}</span>
                  <span>•</span>
                  <span>{getCategoryName(quickViewProduct.categoryId)}</span>
                </div>

                <h2 className="text-xl font-bold text-zinc-900 leading-snug">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-zinc-300">|</span>
                  <span className="text-xs text-zinc-500 font-medium">{quickViewProduct.reviewsCount} {t.reviewsCountSuffix}</span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-xs text-emerald-600 font-semibold">{quickViewProduct.inStock ? t.inStock : t.outOfStock}</span>
                </div>

                {/* Price */}
                <div className="mt-4 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-zinc-900">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-sm text-zinc-400 line-through font-medium">
                        {formatPrice(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Colors if available */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      {t.detailSelectColor} <span className="font-normal text-zinc-500">{selectedColor || quickViewProduct.colors[0].name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map(color => (
                        <button
                          key={color.name}
                          id={`color-${color.name}`}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                            (selectedColor === color.name || (!selectedColor && color.name === quickViewProduct.colors?.[0].name))
                              ? 'border-zinc-900 scale-110 ring-2 ring-zinc-900/20'
                              : 'border-white ring-1 ring-zinc-300'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes if available */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      {t.detailSelectSize}
                    </label>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button
                          key={size}
                          id={`size-${size}`}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border cursor-pointer ${
                            (selectedSize === size || (!selectedSize && size === quickViewProduct.sizes?.[0]))
                              ? 'bg-zinc-900 text-white border-zinc-900'
                              : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-zinc-100 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                    <button
                      id="qty-minus-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-zinc-900">{quantity}</span>
                    <button
                      id="qty-plus-btn"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    id="quick-add-cart-btn"
                    onClick={handleAddToCart}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10 transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>{t.detailAddToCart}</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    id="quick-wishlist-btn"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      isFav ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* View Full Product Page Link */}
                <button
                  id="view-full-page-btn"
                  onClick={handleViewFullPage}
                  className="w-full text-center text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center justify-center gap-1.5 py-1 cursor-pointer"
                >
                  <span>{t.quickViewFullDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
