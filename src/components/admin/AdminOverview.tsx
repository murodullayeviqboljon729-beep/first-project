import React from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertTriangle,
  Plus,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: 'products' | 'orders' | 'promos') => void;
  onOpenNewProduct: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigateTab,
  onOpenNewProduct
}) => {
  const { products, orders, formatPrice, updateOrderStatus, navigateTo } = useShop();

  // Statistics calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'bekor_qilindi' ? ord.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'kutilmoqda' || o.status === 'tayyorlanmoqda');
  const deliveredOrders = orders.filter(o => o.status === 'yetkazildi');
  const lowStockProducts = products.filter(p => p.stockCount <= 5);
  const totalStockUnits = products.reduce((sum, p) => sum + p.stockCount, 0);

  // Category counts
  const categoryStats: Record<string, number> = {};
  products.forEach(p => {
    categoryStats[p.categoryName] = (categoryStats[p.categoryName] || 0) + 1;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner / Welcome Bar */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Boshqaruv Markazi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Xush kelibsiz, Administrator!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Bugungi sotuvlar, ombor holati va faol buyurtmalarni ushbu paneldan qulay boshqaring.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            id="overview-add-product-btn"
            onClick={onOpenNewProduct}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Mahsulot Qo'shish</span>
          </button>
          <button
            id="overview-view-orders-btn"
            onClick={() => onNavigateTab('orders')}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs px-5 py-3.5 rounded-2xl flex items-center gap-2 transition-colors border border-zinc-700"
          >
            <Package className="w-4 h-4 text-zinc-400" />
            <span>Buyurtmalarni ko'rish ({pendingOrders.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500">Umumiy tushum</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {formatPrice(totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% o'tgan haftaga nisbatan</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500">Jami buyurtmalar</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {totalOrdersCount} ta
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium mt-1">
              <span className="text-emerald-600 font-bold">{deliveredOrders.length} yetkazildi</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">{pendingOrders.length} faol</span>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500">Katalogdagi tovarlar</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {products.length} xil
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-1">
              Jami <strong className="text-zinc-900">{totalStockUnits} dona</strong> omborda mavjud
            </div>
          </div>
        </div>

        {/* Low Stock / Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500">Kam qolgan tovarlar</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight">
              {lowStockProducts.length} ta
            </div>
            <div className="text-[11px] text-amber-600 font-bold mt-1">
              {lowStockProducts.length > 0 ? 'Omborni to\'ldirish talab etiladi' : 'Ombor me\'yorda'}
            </div>
          </div>
        </div>

      </div>

      {/* Sales Visual & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sales Weekly Progress Visual */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-black text-zinc-900">Savdolar dinamikasi (Oxirgi 7 kun)</h3>
              <p className="text-xs text-zinc-400">Haftalik daromad va buyurtmalar hajmi</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              O'sish sur'ati +24%
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-4 pb-2">
            {[
              { day: 'Dush', amount: 4800000, height: '40%' },
              { day: 'Sesh', amount: 7200000, height: '60%' },
              { day: 'Chor', amount: 5900000, height: '50%' },
              { day: 'Pay', amount: 11400000, height: '85%' },
              { day: 'Jum', amount: 9800000, height: '75%' },
              { day: 'Shan', amount: 14200000, height: '100%' },
              { day: 'Yak', amount: 8600000, height: '70%' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] py-1 px-1.5 rounded-md whitespace-nowrap mb-1 shadow-md">
                  {formatPrice(bar.amount)}
                </div>
                <div className="w-full bg-zinc-100 rounded-xl h-full flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-emerald-500 group-hover:bg-emerald-600 rounded-xl transition-all duration-500"
                    style={{ height: bar.height }}
                  />
                </div>
                <span className="text-[11px] font-bold text-zinc-500">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
            <span>O'rtacha kunlik sotuv: <strong>8 800 000 so'm</strong></span>
            <span>Eng yuqori kun: <strong>Shanba (14.2M)</strong></span>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-black text-zinc-900 pb-2 border-b border-zinc-100">
            Toifalar bo'yicha taqsimot
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryStats).map(([catName, count], idx) => {
              const percent = Math.round((count / products.length) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-zinc-700">
                    <span>{catName}</span>
                    <span>{count} ta ({percent}%)</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-zinc-800 h-full rounded-full" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            id="overview-manage-products-link"
            onClick={() => onNavigateTab('products')}
            className="w-full mt-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Barcha tovarlarni boshqarish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-base font-black text-zinc-900">So'nggi buyurtmalar</h3>
            <p className="text-xs text-zinc-400">Yangi tushgan buyurtmalarni tezkor tasdiqlash</p>
          </div>
          <button
            id="overview-view-all-orders"
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Barchasi ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-zinc-400 text-center py-6">Hozircha buyurtmalar yo'q</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 font-bold">
                  <th className="py-2.5 px-3">ID & SANA</th>
                  <th className="py-2.5 px-3">MIJOZ</th>
                  <th className="py-2.5 px-3">MAHSULOTLAR</th>
                  <th className="py-2.5 px-3">SUMMA</th>
                  <th className="py-2.5 px-3">TO'LOV</th>
                  <th className="py-2.5 px-3">HOLATI</th>
                  <th className="py-2.5 px-3 text-right">AMALLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-bold text-zinc-900 block">{order.id}</span>
                      <span className="text-[10px] text-zinc-400">{order.date}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-zinc-800 block">{order.customer.fullName}</span>
                      <span className="text-[11px] text-zinc-500">{order.customer.phone}</span>
                    </td>
                    <td className="py-3 px-3 text-zinc-600">
                      {order.items.length} xil ({order.items.reduce((s, i) => s + i.quantity, 0)} dona)
                    </td>
                    <td className="py-3 px-3 font-bold text-zinc-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3 px-3 uppercase text-[11px] font-bold text-zinc-700">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'yetkazildi' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : order.status === 'yolda'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : order.status === 'tayyorlanmoqda'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigateTab('orders')}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg"
                        title="Batafsil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
