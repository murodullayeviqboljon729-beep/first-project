import React, { useState } from 'react';
import { Order } from '../../types';
import { useShop } from '../../context/ShopContext';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ChevronRight, 
  X,
  Printer
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, formatPrice } = useShop();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchQuery = 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.includes(search);

    const matchStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchQuery && matchStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'yetkazildi':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold">Yetkazildi</span>;
      case 'yolda':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-bold">Yo'lda (Kuryer)</span>;
      case 'tayyorlanmoqda':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-bold">Tayyorlanmoqda</span>;
      case 'kutilmoqda':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full text-[11px] font-bold">Yangi (Kutilmoqda)</span>;
      case 'bekor_qilindi':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-[11px] font-bold">Bekor qilingan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">Buyurtmalar boshqaruvi</h2>
            <span className="bg-zinc-100 text-zinc-800 text-xs font-black px-2.5 py-0.5 rounded-full">
              {orders.length} ta
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Barcha xaridorlar buyurtmalarini tekshirish, holatini yangilash va yetkazib berish jarayonini nazorat qilish
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-zinc-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search */}
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-orders-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buyurtma ID (#ORD-...), mijoz ismi yoki telefon raqami..."
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl pl-9 pr-3.5 py-2 text-xs text-zinc-900 outline-none font-medium"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-5">
          <select
            id="admin-orders-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3 py-2 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
          >
            <option value="all">Barcha holatlar ({orders.length})</option>
            <option value="kutilmoqda">🟣 Yangi (Kutilmoqda)</option>
            <option value="tayyorlanmoqda">🟡 Tayyorlanmoqda</option>
            <option value="yolda">🔵 Yo'lda (Yetkazilmoqda)</option>
            <option value="yetkazildi">🟢 Yetkazildi</option>
            <option value="bekor_qilindi">🔴 Bekor qilingan</option>
          </select>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="font-black text-zinc-900 text-sm">Buyurtma topilmadi</h3>
            <p className="text-xs text-zinc-400">Filtrlarni tozalab ko'ring</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">BUYURTMA ID & SANA</th>
                  <th className="py-3.5 px-4">XARIDOR MA'LUMOTI</th>
                  <th className="py-3.5 px-4">TOVARLAR SONI</th>
                  <th className="py-3.5 px-4">SUMMA</th>
                  <th className="py-3.5 px-4">HOLATI</th>
                  <th className="py-3.5 px-4">TEZKOR HOLAT O'ZGARTIRISH</th>
                  <th className="py-3.5 px-4 text-right">AMALLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                    
                    {/* ID & Date */}
                    <td className="py-3.5 px-4">
                      <span className="font-black text-zinc-900 block text-xs">{order.id}</span>
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {order.date}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-zinc-900 block">{order.customer.fullName}</span>
                      <span className="text-[11px] text-zinc-500">{order.customer.phone}</span>
                      <span className="text-[10px] text-zinc-400 block truncate max-w-[180px]">
                        {order.customer.city}, {order.customer.district}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-zinc-800">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} dona
                      </span>
                      <span className="text-[11px] text-zinc-400 block">
                        ({order.items.length} xil mahsulot)
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <span className="font-black text-zinc-900 block">
                        {formatPrice(order.total)}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Quick Status dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-lg px-2.5 py-1 text-[11px] font-bold text-zinc-800 outline-none cursor-pointer"
                      >
                        <option value="kutilmoqda">Kutilmoqda</option>
                        <option value="tayyorlanmoqda">Tayyorlanmoqda</option>
                        <option value="yolda">Yo'lda (Kuryer)</option>
                        <option value="yetkazildi">Yetkazildi</option>
                        <option value="bekor_qilindi">Bekor qilindi</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
                          title="Batafsil ko'rish"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ko'rish</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Buyurtma ${order.id} ni o'chirmoqchimisiz?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-zinc-900">Buyurtma {selectedOrder.id}</h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <span className="text-xs text-zinc-400 font-medium">Sana: {selectedOrder.date}</span>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              
              {/* Customer & Address cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
                  <span className="font-bold text-zinc-400 text-[10px] uppercase block">Mijoz haqida</span>
                  <div className="font-black text-zinc-900 text-sm">{selectedOrder.customer.fullName}</div>
                  <div className="flex items-center gap-2 text-zinc-600 font-bold">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                </div>

                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
                  <span className="font-bold text-zinc-400 text-[10px] uppercase block">Yetkazib berish manzili</span>
                  <div className="font-bold text-zinc-800">
                    {selectedOrder.customer.city}, {selectedOrder.customer.district}
                  </div>
                  <div className="flex items-start gap-2 text-zinc-600">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{selectedOrder.customer.address}</span>
                  </div>
                </div>

              </div>

              {/* Items list */}
              <div className="space-y-3">
                <span className="font-black text-zinc-900 text-xs block border-b border-zinc-100 pb-2">
                  Buyurtma tarkibi ({selectedOrder.items.length} xil)
                </span>

                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.productImage} 
                          alt="" 
                          className="w-10 h-10 rounded-xl object-cover border border-zinc-200 bg-white"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h5 className="font-bold text-zinc-900 line-clamp-1">{item.productName}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                            {item.selectedColor && <span>Rang: {item.selectedColor}</span>}
                            {item.selectedSize && <span>O'lcham: {item.selectedSize}</span>}
                            <span>{formatPrice(item.price)} × {item.quantity} dona</span>
                          </div>
                        </div>
                      </div>

                      <div className="font-black text-zinc-900 text-right">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial summary */}
              <div className="bg-zinc-900 text-white p-5 rounded-2xl space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Oraliq summa:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Chegirma:</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Yetkazib berish:</span>
                  <span>{selectedOrder.deliveryFee === 0 ? "Bepul" : formatPrice(selectedOrder.deliveryFee)}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between font-black text-base text-white">
                  <span>Jami to'lov:</span>
                  <span className="text-emerald-400">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status Update options */}
              <div className="space-y-2">
                <span className="font-bold text-zinc-700 block">Holatni o'zgartirish:</span>
                <div className="flex flex-wrap gap-2">
                  {(['kutilmoqda', 'tayyorlanmoqda', 'yolda', 'yetkazildi', 'bekor_qilindi'] as Order['status'][]).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, st);
                        setSelectedOrder({ ...selectedOrder, status: st });
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs capitalize transition-all ${
                        selectedOrder.status === st 
                          ? 'bg-zinc-900 text-white shadow-md' 
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 flex justify-end bg-zinc-50 shrink-0">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
