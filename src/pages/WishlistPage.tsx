import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, navigateTo, showToast, t } = useShop();

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    favoriteProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    showToast('Success', t.wishlistAddAll, 'success');
  };

  if (favoriteProducts.length === 0) {
    return (
      <div id="wishlist-empty-view" className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
          <Heart className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-900">{t.wishlistEmpty}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            {t.wishlistEmptySub}
          </p>
        </div>
        <button
          id="wishlist-to-catalog-btn"
          onClick={() => navigateTo('catalog')}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{t.cartGoToCatalog}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div id="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            {t.wishlistTitle}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">{favoriteProducts.length} {t.productsSuffix}</p>
        </div>

        <button
          id="add-all-wishlist-cart-btn"
          onClick={handleAddAllToCart}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>{t.wishlistAddAll}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
