import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 500000; // 500,000 UZS
const STANDARD_DELIVERY_FEE = 30000; // 30,000 UZS

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    formatPrice, 
    navigateTo, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode,
    t
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Discount calculation
  const discountAmount = appliedPromo 
    ? Math.round((cartTotal * appliedPromo.discountPercent) / 100)
    : 0;

  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0;
  const deliveryFee = isFreeShipping ? 0 : STANDARD_DELIVERY_FEE;
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  // Progress towards free shipping
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div id="cart-empty-page" className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-900">{t.cartEmpty}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            {t.cartEmptySub}
          </p>
        </div>
        <button
          id="cart-empty-to-catalog-btn"
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
    <div id="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">{t.cartTitle}</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{cart.length} {t.productsSuffix}</p>
        </div>
        <button
          id="clear-cart-btn"
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 p-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t.cartClear}</span>
        </button>
      </div>

      {/* Free Delivery Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-2 text-xs font-bold text-emerald-900">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>
              {isFreeShipping 
                ? t.cartFreeShippingUnlocked
                : `${t.cartFreeShippingRemaining} ${formatPrice(amountNeededForFreeShipping)}`}
            </span>
          </div>
          <span className="font-extrabold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-emerald-200/60 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Content: Items & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => {
            const itemSubtotal = item.product.price * item.quantity;

            return (
              <div 
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                id={`cart-item-${item.product.id}`}
                className="bg-white rounded-3xl border border-zinc-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-zinc-300 transition-colors"
              >
                {/* Image */}
                <div 
                  onClick={() => navigateTo('product-detail', item.product)}
                  className="w-24 h-24 rounded-2xl bg-zinc-50 overflow-hidden shrink-0 cursor-pointer border border-zinc-100"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    {item.product.brand}
                  </span>
                  <h3 
                    onClick={() => navigateTo('product-detail', item.product)}
                    className="text-sm font-bold text-zinc-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.product.name}
                  </h3>

                  {/* Attributes */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-zinc-500 pt-0.5">
                    {item.selectedColor && (
                      <span className="bg-zinc-100 px-2 py-0.5 rounded-md font-medium text-[11px]">
                        {t.detailSelectColor}: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="bg-zinc-100 px-2 py-0.5 rounded-md font-medium text-[11px]">
                        {t.detailSelectSize}: {item.selectedSize}
                      </span>
                    )}
                    <span className="text-zinc-400 font-semibold">{formatPrice(item.product.price)}</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                  <button
                    id={`cart-minus-${item.product.id}`}
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                    className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-black text-xs text-zinc-900">{item.quantity}</span>
                  <button
                    id={`cart-plus-${item.product.id}`}
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                    className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <div className="text-sm sm:text-base font-black text-zinc-900">
                    {formatPrice(itemSubtotal)}
                  </div>
                  <button
                    id={`cart-delete-${item.product.id}`}
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                    title={t.cartRemove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              id="continue-shopping-btn"
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.cartContinueShopping}</span>
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-6 sticky top-24 shadow-sm">
          <h3 className="font-black text-lg text-zinc-900 pb-3 border-b border-zinc-100">
            {t.cartSummaryTitle}
          </h3>

          {/* Promo Code Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 block">{t.cartHavePromo}</label>
            
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl px-3.5 py-2.5">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{appliedPromo.code} (-{appliedPromo.discountPercent}%)</span>
                </div>
                <button
                  id="remove-promo-btn"
                  onClick={removePromoCode}
                  className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  id="promo-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="SALOM2026"
                  className="flex-1 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl px-3.5 py-2 text-xs font-bold uppercase text-zinc-900 placeholder:normal-case placeholder:font-normal outline-none"
                />
                <button
                  type="submit"
                  id="apply-promo-btn"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t.cartApplyPromo}
                </button>
              </form>
            )}

            {promoMessage && (
              <p className={`text-[11px] font-medium ${promoMessage.isError ? 'text-rose-500' : 'text-emerald-600'}`}>
                {promoMessage.text}
              </p>
            )}
          </div>

          {/* Breakdown calculation */}
          <div className="space-y-2.5 text-xs border-t border-zinc-100 pt-4">
            <div className="flex justify-between text-zinc-600">
              <span>{t.cartSubtotal}</span>
              <span className="font-bold text-zinc-900">{formatPrice(cartTotal)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{t.cartPromoDiscount} ({appliedPromo.discountPercent}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-600">
              <span>{t.cartDeliveryFee}</span>
              <span className="font-bold text-zinc-900">
                {isFreeShipping ? <span className="text-emerald-600">{t.cartFreeDelivery}</span> : formatPrice(deliveryFee)}
              </span>
            </div>

            <div className="border-t border-zinc-200 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-bold text-zinc-900">{t.cartTotal}:</span>
              <span className="text-xl font-black text-zinc-900">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            id="proceed-to-checkout-btn"
            onClick={() => navigateTo('checkout')}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
          >
            <span>{t.cartCheckoutBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.benefit2Title} &amp; {t.benefit2Desc}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
