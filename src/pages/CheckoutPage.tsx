import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CITIES_LIST } from '../data/products';
import { Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Receipt,
  FileText,
  Clock
} from 'lucide-react';

const STANDARD_FEE = 30000;
const EXPRESS_FEE = 45000;
const FREE_SHIPPING_MIN = 500000;

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    formatPrice, 
    appliedPromo, 
    createOrder, 
    navigateTo, 
    showToast,
    t,
    getStatusLabel
  } = useShop();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [selectedCity, setSelectedCity] = useState(CITIES_LIST[0].name);
  const [selectedDistrict, setSelectedDistrict] = useState(CITIES_LIST[0].districts[0]);
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');
  
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'click' | 'payme' | 'uzumpay' | 'cash' | 'card_delivery'>('click');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const discountAmount = appliedPromo 
    ? Math.round((cartTotal * appliedPromo.discountPercent) / 100) 
    : 0;

  const baseDeliveryFee = cartTotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_FEE;
  const deliveryFee = deliveryType === 'express' ? baseDeliveryFee + EXPRESS_FEE : baseDeliveryFee;
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  // Handle City Change
  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const found = CITIES_LIST.find(c => c.name === cityName);
    if (found && found.districts.length > 0) {
      setSelectedDistrict(found.districts[0]);
    }
  };

  const currentDistricts = CITIES_LIST.find(c => c.name === selectedCity)?.districts || [];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 3) {
      showToast('Error', t.checkoutFullName, 'error');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 9) {
      showToast('Error', t.checkoutPhone, 'error');
      return;
    }

    if (!address.trim()) {
      showToast('Error', t.checkoutAddress, 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Error', t.cartEmpty, 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderData: Omit<Order, 'id' | 'date'> = {
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0],
          price: item.product.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize
        })),
        subtotal: cartTotal,
        discount: discountAmount,
        deliveryFee,
        total: finalTotal,
        status: 'kutilmoqda',
        paymentMethod,
        deliveryType,
        customer: {
          fullName,
          phone,
          city: selectedCity,
          district: selectedDistrict,
          address,
          note: orderNote || undefined
        }
      };

      const newOrder = createOrder(orderData);
      setCreatedOrder(newOrder);
      setIsSubmitting(false);

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      showToast(t.checkoutSuccessTitle, `${t.ordersIdPrefix}: ${newOrder.id}`, 'success');
    }, 600);
  };

  // SUCCESS CONFIRMATION MODAL / VIEW
  if (createdOrder) {
    return (
      <div id="order-success-view" className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xl p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {getStatusLabel(createdOrder.status)}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2">
              {t.checkoutSuccessTitle}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              {t.ordersIdPrefix}: <strong className="text-zinc-900">{createdOrder.id}</strong>. {t.checkoutSuccessDesc}
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 text-left space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 font-bold text-zinc-700">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>{t.checkoutTitle}</span>
              </span>
              <span>{createdOrder.date}</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {createdOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <img src={item.productImage} alt="" className="w-8 h-8 rounded-lg object-cover bg-zinc-200" referrerPolicy="no-referrer" />
                    <span className="text-zinc-800 font-medium truncate max-w-xs">{item.productName} (x{item.quantity})</span>
                  </div>
                  <span className="font-bold text-zinc-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 pt-3 space-y-1.5 text-zinc-600">
              <div className="flex justify-between">
                <span>{t.checkoutAddress}:</span>
                <span className="font-semibold text-zinc-900">{createdOrder.customer.city}, {createdOrder.customer.district}, {createdOrder.customer.address}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.checkoutPaymentMethod}:</span>
                <span className="font-bold uppercase text-zinc-900">{createdOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200">
                <span>{t.cartTotal}:</span>
                <span className="text-emerald-600 text-base">{formatPrice(createdOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Next Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="view-orders-history-btn"
              onClick={() => navigateTo('orders')}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3.5 px-5 rounded-xl transition-colors cursor-pointer"
            >
              {t.navOrders}
            </button>
            <button
              id="success-back-home-btn"
              onClick={() => navigateTo('home')}
              className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs py-3.5 px-5 rounded-xl transition-colors cursor-pointer"
            >
              {t.navHome}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            {t.checkoutTitle}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">{t.checkoutRecipientInfo}</p>
        </div>
        <button
          id="checkout-back-cart-btn"
          onClick={() => navigateTo('cart')}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.cartTitle}</span>
        </button>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Fields Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Customer Contact */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
            <h3 className="font-black text-base text-zinc-900 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>1. {t.checkoutRecipientInfo}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  {t.checkoutFullName} *
                </label>
                <input
                  id="checkout-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sardor Aliyev"
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  {t.checkoutPhone} *
                </label>
                <input
                  id="checkout-phone-input"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
            <h3 className="font-black text-base text-zinc-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>2. {t.checkoutDeliveryAddress}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  {t.checkoutCity} *
                </label>
                <select
                  id="checkout-city-select"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
                >
                  {CITIES_LIST.map(city => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                  {t.checkoutDistrict} *
                </label>
                <select
                  id="checkout-district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
                >
                  {currentDistricts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                {t.checkoutAddress} *
              </label>
              <input
                id="checkout-address-input"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Navoiy ko'chasi, 24-uy"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                {t.checkoutNote}
              </label>
              <input
                id="checkout-note-input"
                type="text"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Domofon 45"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none font-medium"
              />
            </div>
          </div>

          {/* 3. Delivery Speed */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
            <h3 className="font-black text-base text-zinc-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>3. {t.checkoutDeliveryType}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label 
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  deliveryType === 'standard' 
                    ? 'border-zinc-900 bg-zinc-50/70' 
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="standard"
                  checked={deliveryType === 'standard'}
                  onChange={() => setDeliveryType('standard')}
                  className="mt-0.5 accent-zinc-900"
                />
                <div>
                  <div className="text-xs font-bold text-zinc-900">{t.checkoutStandardDelivery}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">1-2 {t.perMonth}</div>
                  <div className="text-xs font-bold text-emerald-600 mt-1">
                    {cartTotal >= FREE_SHIPPING_MIN ? t.cartFreeDelivery : formatPrice(STANDARD_FEE)}
                  </div>
                </div>
              </label>

              <label 
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  deliveryType === 'express' 
                    ? 'border-zinc-900 bg-zinc-50/70' 
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="express"
                  checked={deliveryType === 'express'}
                  onChange={() => setDeliveryType('express')}
                  className="mt-0.5 accent-zinc-900"
                />
                <div>
                  <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                    <span>{t.checkoutExpressDelivery}</span>
                    <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.2 rounded font-bold">3h</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Express delivery</div>
                  <div className="text-xs font-bold text-zinc-900 mt-1">+{formatPrice(EXPRESS_FEE)}</div>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
            <h3 className="font-black text-base text-zinc-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>4. {t.checkoutPaymentMethod}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Click */}
              <button
                type="button"
                id="pay-click-btn"
                onClick={() => setPaymentMethod('click')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'click' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="font-black text-sm">{t.checkoutPayClick}</div>
                <div className={`text-[11px] mt-0.5 ${paymentMethod === 'click' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  Click online
                </div>
              </button>

              {/* Payme */}
              <button
                type="button"
                id="pay-payme-btn"
                onClick={() => setPaymentMethod('payme')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'payme' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="font-black text-sm">{t.checkoutPayPayme}</div>
                <div className={`text-[11px] mt-0.5 ${paymentMethod === 'payme' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  Payme online
                </div>
              </button>

              {/* Uzum Pay */}
              <button
                type="button"
                id="pay-uzumpay-btn"
                onClick={() => setPaymentMethod('uzumpay')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'uzumpay' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="font-black text-sm">{t.checkoutPayUzum}</div>
                <div className={`text-[11px] mt-0.5 ${paymentMethod === 'uzumpay' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  Uzum bank
                </div>
              </button>

              {/* Cash on delivery */}
              <button
                type="button"
                id="pay-cash-btn"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'cash' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="font-black text-sm">{t.checkoutPayCash}</div>
                <div className={`text-[11px] mt-0.5 ${paymentMethod === 'cash' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  Cash on Delivery
                </div>
              </button>

              {/* Card on delivery */}
              <button
                type="button"
                id="pay-card-delivery-btn"
                onClick={() => setPaymentMethod('card_delivery')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'card_delivery' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="font-black text-sm">{t.checkoutPayCard}</div>
                <div className={`text-[11px] mt-0.5 ${paymentMethod === 'card_delivery' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  Uzcard / Humo / Visa
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-6 sticky top-24 shadow-sm">
          <h3 className="font-black text-lg text-zinc-900 pb-3 border-b border-zinc-100">
            {t.checkoutYourOrder}
          </h3>

          {/* Items mini list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs gap-3">
                <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover bg-zinc-100 shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-zinc-400">x{item.quantity} {t.productsSuffix}</p>
                </div>
                <span className="font-bold text-zinc-900 shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Breakdown calculation */}
          <div className="space-y-2.5 text-xs border-t border-zinc-100 pt-4 text-zinc-600">
            <div className="flex justify-between">
              <span>{t.cartSubtotal}:</span>
              <span className="font-bold text-zinc-900">{formatPrice(cartTotal)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{t.cartPromoDiscount} ({appliedPromo.code}):</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>{t.cartDeliveryFee}:</span>
              <span className="font-bold text-zinc-900">
                {deliveryFee === 0 ? <span className="text-emerald-600">{t.cartFreeDelivery}</span> : formatPrice(deliveryFee)}
              </span>
            </div>

            <div className="border-t border-zinc-200 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-bold text-zinc-900">{t.cartTotal}:</span>
              <span className="text-2xl font-black text-zinc-900">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="submit-order-btn"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-400 text-white font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
          >
            {isSubmitting ? (
              <span>{t.checkoutConfirming}</span>
            ) : (
              <span>{t.checkoutSubmitBtn}</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
