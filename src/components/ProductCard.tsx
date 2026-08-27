import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    setQuickViewProduct,
    cart,
    t,
    getCategoryName
  } = useShop();

  const isFavorite = isInWishlist(product.id);
  const inCart = cart.some(item => item.product.id === product.id);

  // 12 months installment simulation
  const installmentPerMonth = Math.round(product.price / 12);

  if (layout === 'list') {
    return (
      <div 
        id={`product-card-list-${product.id}`}
        className="group bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 transition-all duration-200 p-4 flex flex-col sm:flex-row gap-5 items-center"
      >
        {/* Image */}
        <div 
          onClick={() => navigateTo('product-detail', product)}
          className="relative w-full sm:w-48 h-48 rounded-xl bg-zinc-50 overflow-hidden shrink-0 cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {product.discountPercent && (
            <span className="absolute top-2 left-2 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {product.brand} • {getCategoryName(product.categoryId)}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-400 font-normal">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 
              onClick={() => navigateTo('product-detail', product)}
              className="text-base font-bold text-zinc-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
            >
              {product.name}
            </h3>

            <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                {t.installmentPrefix} {formatPrice(installmentPerMonth)}{t.perMonth}
              </span>
              {product.inStock ? (
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {t.inStockCount} ({product.stockCount})
                </span>
              ) : (
                <span className="text-[11px] font-medium text-rose-500">{t.outOfStock}</span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-black text-zinc-900">{formatPrice(product.price)}</div>
              {product.originalPrice && (
                <div className="text-xs text-zinc-400 line-through">{formatPrice(product.originalPrice)}</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                id={`wishlist-btn-list-${product.id}`}
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isFavorite 
                    ? 'bg-rose-50 border-rose-200 text-rose-500' 
                    : 'border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50'
                }`}
                title={t.navWishlist}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                id={`quick-view-btn-list-${product.id}`}
                onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                className="p-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer"
                title={t.btnQuickView}
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                id={`add-to-cart-btn-list-${product.id}`}
                onClick={() => addToCart(product, 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-xs cursor-pointer ${
                  inCart 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                {inCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                <span>{inCart ? t.btnInCart : t.btnAddToCart}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (Default)
  return (
    <div 
      id={`product-card-grid-${product.id}`}
      className="group relative bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300/80 hover:shadow-xl hover:shadow-zinc-900/5 transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Image Container */}
      <div 
        onClick={() => navigateTo('product-detail', product)}
        className="relative w-full aspect-square bg-zinc-50 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-xs">
              {t.badgeNew}
            </span>
          )}
        </div>

        {/* Quick action buttons floating on image */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            id={`wishlist-btn-grid-${product.id}`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 cursor-pointer ${
              isFavorite 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-white/90 text-zinc-600 hover:text-rose-500 hover:bg-white shadow-xs'
            }`}
            title={t.navWishlist}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            id={`quick-view-btn-grid-${product.id}`}
            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
            className="w-8 h-8 rounded-full bg-white/90 text-zinc-600 hover:text-zinc-900 hover:bg-white shadow-xs flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            title={t.btnQuickView}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-1">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-400 font-normal text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => navigateTo('product-detail', product)}
            className="text-sm font-bold text-zinc-900 hover:text-emerald-600 transition-colors line-clamp-2 leading-snug cursor-pointer min-h-[38px]"
          >
            {product.name}
          </h3>

          {/* Monthly installment badge */}
          <div className="mt-2.5 inline-block bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md px-2 py-0.5 text-[10px] font-semibold">
            {formatPrice(installmentPerMonth)} {t.perMonth}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-black text-zinc-900 leading-tight">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            id={`add-cart-btn-${product.id}`}
            onClick={() => addToCart(product, 1)}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              inCart
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white active:scale-95'
            }`}
            title={t.btnAddToCart}
          >
            {inCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
            )}
            <span className="hidden sm:inline">{inCart ? t.btnInCart : t.btnAddToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
