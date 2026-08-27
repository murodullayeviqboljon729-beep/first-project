import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminPromoCodes } from '../components/admin/AdminPromoCodes';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Store, 
  ArrowLeft, 
  ShieldCheck, 
  Plus,
  Bell,
  Sparkles
} from 'lucide-react';

type AdminTab = 'overview' | 'products' | 'orders' | 'promos';

export const AdminPage: React.FC = () => {
  const { navigateTo, products, orders, promoCodes } = useShop();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const pendingOrdersCount = orders.filter(o => o.status === 'kutilmoqda' || o.status === 'tayyorlanmoqda').length;

  const handleOpenNewProduct = () => {
    setProductToEdit(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product?: Product) => {
    setProductToEdit(product || null);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-100/70 pb-16 font-sans">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo and Admin Badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-black text-base shadow-sm">
                B
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-zinc-900">
                  BOZOR <span className="text-emerald-600">ADMIN</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Boshqaruv Tizimi</span>
                </span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                id="admin-quick-add-btn"
                onClick={handleOpenNewProduct}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mahsulot qo'shish</span>
              </button>

              <button
                id="back-to-shop-btn"
                onClick={() => navigateTo('home')}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors border border-zinc-200"
              >
                <Store className="w-3.5 h-3.5 text-zinc-500" />
                <span>Do'konga o'tish</span>
              </button>
            </div>

          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-zinc-100 text-xs">
            <button
              id="admin-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Umumiy Ko'rinish</span>
            </button>

            <button
              id="admin-tab-products"
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Mahsulotlar</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeTab === 'products' ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-700'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              id="admin-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Buyurtmalar</span>
              {pendingOrdersCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black animate-pulse">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              id="admin-tab-promos"
              onClick={() => setActiveTab('promos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold transition-all whitespace-nowrap ${
                activeTab === 'promos'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Promokodlar</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeTab === 'promos' ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-700'
              }`}>
                {promoCodes.length}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'overview' && (
          <AdminOverview 
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenNewProduct={handleOpenNewProduct}
          />
        )}

        {activeTab === 'products' && (
          <AdminProducts 
            onOpenProductForm={handleOpenEditProduct}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrders />
        )}

        {activeTab === 'promos' && (
          <AdminPromoCodes />
        )}
      </main>

      {/* Product Create/Edit Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
      />

    </div>
  );
};
