import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { SAMPLE_REVIEWS } from '../data/products';
import { Review } from '../types';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  ArrowLeft, 
  Share2, 
  Zap, 
  MessageSquarePlus, 
  Send
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    showToast,
    t,
    getCategoryName
  } = useShop();

  const product = selectedProduct || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'delivery'>('specs');

  // Customer Reviews state
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);
  const installmentPerMonth = Math.round(product.price / 12);

  // Related products from same category or brand
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} - ${formatPrice(product.price)}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied!', '', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      showToast('Error', 'Please fill name and comment', 'error');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: newReviewName,
      rating: newReviewRating,
      date: 'Today',
      comment: newReviewComment,
      verifiedPurchase: true
    };

    setReviews(prev => [newRev, ...prev]);
    setNewReviewName('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Success!', 'Thank you for your feedback', 'success');
  };

  return (
    <div id="product-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-12">
      
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          id="detail-back-btn"
          onClick={() => navigateTo('catalog')}
          className="flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.detailBack}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="share-product-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 p-2 rounded-xl border border-zinc-200 bg-white cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-zinc-50 border border-zinc-200/80 overflow-hidden shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountPercent && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                -{product.discountPercent}% {t.badgeDiscount}
              </span>
            )}
            <button
              id="detail-wishlist-toggle-btn"
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'bg-white/90 text-zinc-600 hover:text-rose-500 hover:bg-white shadow-xs'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`detail-thumb-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-zinc-900 scale-95 ring-2 ring-zinc-900/10'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{product.brand}</span>
              <span>•</span>
              <span>{getCategoryName(product.categoryId)}</span>
              <span>•</span>
              <span className="text-zinc-500">ID: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating and Stock */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-zinc-900 font-black">{product.rating}</span>
                <span className="text-zinc-400 font-medium">({product.reviewsCount} {t.reviewsCountSuffix})</span>
              </div>
              <span className="text-zinc-300">|</span>
              {product.inStock ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {t.inStockCount} ({product.stockCount} {t.productsSuffix})
                </span>
              ) : (
                <span className="text-rose-500 font-bold">{t.outOfStock}</span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-5 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-zinc-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-400 line-through font-semibold">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Installment Badge */}
            <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-2xl p-3 text-xs font-semibold">
              <span className="text-zinc-600">{t.installmentPrefix}</span>
              <span className="text-emerald-600 font-black">{formatPrice(installmentPerMonth)} {t.perMonth}</span>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 block">
                {t.detailSelectColor}: <span className="text-zinc-900 font-extrabold">{selectedColor || product.colors[0].name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    id={`detail-color-${color.name}`}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      (selectedColor === color.name || (!selectedColor && color.name === product.colors?.[0].name))
                        ? 'border-zinc-900 bg-zinc-900 text-white ring-2 ring-zinc-900/10'
                        : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></span>
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 block">
                {t.detailSelectSize}:
              </label>
              <div className="flex items-center gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    id={`detail-size-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      (selectedSize === size || (!selectedSize && size === product.sizes?.[0]))
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-zinc-200 rounded-2xl p-1 bg-zinc-50">
                <button
                  id="detail-qty-minus"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-base cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-sm text-zinc-900">{quantity}</span>
                <button
                  id="detail-qty-plus"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-base cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                id="detail-add-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-zinc-900/10 transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>{t.detailAddToCart}</span>
              </button>
            </div>

            {/* 1-Click Buy Now */}
            <button
              id="detail-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{t.detailBuyNow}</span>
            </button>
          </div>

          {/* Key Advantages */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-200 text-center">
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
              <Truck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
              <p className="text-[11px] font-bold text-zinc-800">{t.benefit1Title}</p>
              <p className="text-[10px] text-zinc-400">{t.benefit1Desc}</p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
              <ShieldCheck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
              <p className="text-[11px] font-bold text-zinc-800">{t.benefit2Title}</p>
              <p className="text-[10px] text-zinc-400">{t.benefit2Desc}</p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
              <RotateCcw className="w-5 h-5 mx-auto text-purple-600 mb-1" />
              <p className="text-[11px] font-bold text-zinc-800">{t.benefit3Title}</p>
              <p className="text-[10px] text-zinc-400">{t.benefit3Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT TABS: Features / Specs / Reviews */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-4 overflow-x-auto">
          <button
            id="tab-specs-btn"
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'specs'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {t.detailTabSpecs}
          </button>
          <button
            id="tab-reviews-btn"
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <span>{t.detailTabReviews}</span>
            <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-0.5 rounded-full font-bold">
              {reviews.length}
            </span>
          </button>
          <button
            id="tab-delivery-btn"
            onClick={() => setActiveTab('delivery')}
            className={`text-sm font-bold pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'delivery'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {t.detailTabDelivery}
          </button>
        </div>

        <div className="pt-6">
          {/* Specs & Description Tab */}
          {activeTab === 'specs' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">{t.detailAboutProduct}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                  {product.description}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-zinc-900 mb-3">{t.detailKeyFeatures}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs Table */}
              <div>
                <h3 className="text-base font-bold text-zinc-900 mb-4">{t.detailTechSpecs}</h3>
                <div className="rounded-2xl border border-zinc-200 overflow-hidden divide-y divide-zinc-200">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div key={key} className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs ${idx % 2 === 0 ? 'bg-zinc-50/50' : 'bg-white'}`}>
                      <span className="font-bold text-zinc-500">{key}</span>
                      <span className="sm:col-span-2 font-medium text-zinc-900 mt-1 sm:mt-0">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-zinc-900">{product.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-amber-400' : 'text-zinc-300'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{reviews.length} {t.reviewsCountSuffix}</p>
                  </div>
                </div>

                <button
                  id="write-review-toggle-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquarePlus className="w-4 h-4 text-emerald-400" />
                  <span>{t.detailWriteReview}</span>
                </button>
              </div>

              {/* Review Input Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-bold text-sm text-zinc-900">{t.detailWriteReview}</h4>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          id={`star-btn-${star}`}
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${star <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      id="review-name-input"
                      type="text"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder={t.checkoutFullName}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 outline-none focus:border-zinc-900"
                    />
                  </div>

                  <textarea
                    id="review-comment-input"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Comment..."
                    rows={3}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-900 outline-none focus:border-zinc-900"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="submit-review-btn"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900">{rev.userName}</p>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400' : 'text-zinc-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-zinc-400">{rev.date}</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed pl-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery & Payment Info Tab */}
          {activeTab === 'delivery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-700">
              <div className="space-y-3 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                <h4 className="font-bold text-sm text-zinc-900">{t.detailTabDelivery}</h4>
                <ul className="space-y-2">
                  <li>• <strong>Standard:</strong> 1 {t.perMonth}</li>
                  <li>• <strong>Express:</strong> 3-4 hours</li>
                </ul>
              </div>

              <div className="space-y-3 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                <h4 className="font-bold text-sm text-zinc-900">{t.checkoutPaymentMethod}</h4>
                <ul className="space-y-2">
                  <li>• <strong>Online:</strong> Click, Payme, Uzum Pay, Visa, Mastercard</li>
                  <li>• <strong>Cash on Delivery:</strong> Cash or Card</li>
                  <li>• <strong>Installment:</strong> 0% interest up to 12 months</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-zinc-900">{t.detailRelatedProducts}</h2>
            <button
              id="view-more-related-btn"
              onClick={() => navigateTo('catalog')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              {t.navCatalog}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
