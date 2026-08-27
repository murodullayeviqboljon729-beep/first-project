import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShoppingBag, 
  ChevronRight,
  Receipt
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, formatPrice, navigateTo, addToCart, t, getStatusLabel } = useShop();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'yetkazildi':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> {getStatusLabel(status)}
          </span>
        );
      case 'yolda':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <Truck className="w-3.5 h-3.5 animate-pulse" /> {getStatusLabel(status)}
          </span>
        );
      case 'tayyorlanmoqda':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <Clock className="w-3.5 h-3.5" /> {getStatusLabel(status)}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 border border-zinc-200 px-2.5 py-1 rounded-full text-xs font-bold">
            <Clock className="w-3.5 h-3.5" /> {getStatusLabel(status)}
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div id="orders-empty-view" className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <Package className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-900">{t.ordersEmpty}</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            {t.ordersEmptySub}
          </p>
        </div>
        <button
          id="orders-to-catalog-btn"
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
    <div id="orders-page" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">
      <div className="pb-4 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          {t.ordersTitle}
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">{orders.length} {t.productsSuffix}</p>
      </div>

      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order.id}
            id={`order-card-${order.id}`}
            className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-xs hover:border-zinc-300 transition-colors"
          >
            {/* Header info bar */}
            <div className="bg-zinc-50/80 px-6 py-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.ordersIdPrefix}</span>
                  <span className="font-black text-zinc-900">{order.id}</span>
                </div>
                <div className="h-6 w-px bg-zinc-200"></div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.ordersDate}</span>
                  <span className="font-semibold text-zinc-700">{order.date}</span>
                </div>
                <div className="h-6 w-px bg-zinc-200 hidden sm:block"></div>
                <div className="hidden sm:block">
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.checkoutPaymentMethod}</span>
                  <span className="font-bold uppercase text-zinc-900">{order.paymentMethod}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(order.status)}
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-6">
              
              {/* Order items */}
              <div className="space-y-4 divide-y divide-zinc-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.productImage}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-zinc-100 shrink-0 border border-zinc-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 leading-snug">{item.productName}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                          <span>{item.quantity} {t.productsSuffix}</span>
                          {item.selectedColor && <span>• {t.detailSelectColor}: {item.selectedColor}</span>}
                          {item.selectedSize && <span>• {t.detailSelectSize}: {item.selectedSize}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-black text-zinc-900 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery and Totals Bar */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-600 bg-zinc-50/50 -mx-6 -mb-6 p-6">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.checkoutDeliveryAddress}:</span>
                  <p className="font-semibold text-zinc-800 mt-0.5">
                    {order.customer.fullName} ({order.customer.phone}) — {order.customer.city}, {order.customer.district}, {order.customer.address}
                  </p>
                </div>

                <div className="text-right sm:border-l sm:border-zinc-200 sm:pl-6">
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">{t.cartTotal}:</span>
                  <span className="text-base font-black text-zinc-900">{formatPrice(order.total)}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
