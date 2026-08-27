import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  ArrowUpDown, 
  Check, 
  AlertCircle, 
  Sparkles,
  RotateCcw,
  Package,
  Layers,
  ChevronDown
} from 'lucide-react';

interface AdminProductsProps {
  onOpenProductForm: (product?: Product) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  onOpenProductForm
}) => {
  const { 
    products, 
    deleteProduct, 
    updateProduct, 
    addProduct, 
    resetProductsToDefault, 
    formatPrice, 
    navigateTo,
    showToast 
  } = useShop();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchQuery = 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;

      let matchStock = true;
      if (stockFilter === 'in_stock') matchStock = p.stockCount > 5;
      else if (stockFilter === 'low_stock') matchStock = p.stockCount > 0 && p.stockCount <= 5;
      else if (stockFilter === 'out_of_stock') matchStock = p.stockCount === 0;

      return matchQuery && matchCat && matchStock;
    });
  }, [products, search, selectedCategory, stockFilter]);

  const handleDuplicate = (p: Product) => {
    const duplicatedData = {
      ...p,
      name: `${p.name} (Nusxa)`
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, rating, reviewsCount, ...rest } = duplicatedData;
    addProduct(rest);
    showToast('Nusxa olindi', `"${p.name}" nusxalandi`, 'success');
  };

  const handleStockStep = (p: Product, delta: number) => {
    const newStock = Math.max(0, p.stockCount + delta);
    updateProduct(p.id, { 
      stockCount: newStock, 
      inStock: newStock > 0 
    });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">Mahsulotlar boshqaruvi</h2>
            <span className="bg-zinc-100 text-zinc-800 text-xs font-black px-2.5 py-0.5 rounded-full">
              {products.length} ta
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Bozordagi barcha tovarlarni tahrirlash, yangi tovar qo'shish va ombor qoldig'ini sozlash
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            id="reset-default-products-btn"
            onClick={() => {
              if (window.confirm('Barcha mahsulotlarni asl namunaviy holatiga qaytarmoqchimisiz?')) {
                resetProductsToDefault();
              }
            }}
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Standart tovarlar ro'yxatini qayta yuklash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Standartni tiklash</span>
          </button>

          <button
            id="add-new-product-top-btn"
            onClick={() => onOpenProductForm()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Mahsulot Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-zinc-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="admin-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nomi, brendi yoki ID bo'yicha qidirish..."
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl pl-9 pr-3.5 py-2 text-xs text-zinc-900 outline-none font-medium"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            id="admin-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3 py-2 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
          >
            <option value="all">Barcha toifalar</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="sm:col-span-3">
          <select
            id="admin-stock-filter"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3 py-2 text-xs text-zinc-900 outline-none font-bold cursor-pointer"
          >
            <option value="all">Barcha ombor holatlari</option>
            <option value="in_stock">✅ Omborda yetarli (&gt;5)</option>
            <option value="low_stock">⚠️ Kam qolgan (1-5)</option>
            <option value="out_of_stock">❌ Tugagan (0 dona)</option>
          </select>
        </div>

      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="font-black text-zinc-900 text-sm">Mos mahsulot topilmadi</h3>
            <p className="text-xs text-zinc-400">Qidiruv parametrlarini o'zgartirib ko'ring yoki yangi tovar qo'shing</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/70 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">MAHSULOT</th>
                  <th className="py-3.5 px-4">KATEGORIYA</th>
                  <th className="py-3.5 px-4">NARXI</th>
                  <th className="py-3.5 px-4">OMBOR QOLDIG'I</th>
                  <th className="py-3.5 px-4">TEGLAR</th>
                  <th className="py-3.5 px-4 text-right">AMALLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {filteredProducts.map(product => {
                  const isLow = product.stockCount > 0 && product.stockCount <= 5;
                  const isOut = product.stockCount === 0;

                  return (
                    <tr key={product.id} className="hover:bg-zinc-50/80 transition-colors group">
                      
                      {/* Product details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-zinc-200 bg-zinc-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="space-y-0.5 max-w-xs">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                              {product.brand} • ID: {product.id.slice(-6)}
                            </span>
                            <h4 className="font-bold text-zinc-900 line-clamp-1 leading-tight text-xs">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                              <span>⭐ {product.rating}</span>
                              <span>•</span>
                              <span>{product.colors?.length || 0} xil rang</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-zinc-100 text-zinc-700 font-bold text-[11px] px-2.5 py-1 rounded-lg">
                          {product.categoryName}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="font-black text-zinc-900">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <span className="line-through text-zinc-400">
                                {formatPrice(product.originalPrice)}
                              </span>
                              <span className="text-rose-600 font-bold">
                                -{product.discountPercent}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Stock with quick stepper */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200">
                            <button
                              onClick={() => handleStockStep(product, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-200"
                              title="1 ta kamaytirish"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-black text-xs text-zinc-900">
                              {product.stockCount}
                            </span>
                            <button
                              onClick={() => handleStockStep(product, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-200"
                              title="1 ta oshirish"
                            >
                              +
                            </button>
                          </div>

                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isOut 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                              : isLow
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {isOut ? 'Tugagan' : isLow ? 'Kam qolgan' : 'Bor'}
                          </span>
                        </div>
                      </td>

                      {/* Tags / Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.isNew && (
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded">
                              YANGI
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="bg-purple-100 text-purple-800 text-[9px] font-black px-1.5 py-0.5 rounded">
                              TOP
                            </span>
                          )}
                          {product.isFlashSale && (
                            <span className="bg-rose-100 text-rose-800 text-[9px] font-black px-1.5 py-0.5 rounded">
                              AKSIYA
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          {/* View in shop */}
                          <button
                            onClick={() => navigateTo('product-detail', product)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            title="Do'konda ko'rish"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Clone / Duplicate */}
                          <button
                            onClick={() => handleDuplicate(product)}
                            className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            title="Nusxa olish"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => onOpenProductForm(product)}
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Tahrirlash"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          {deleteConfirmId === product.id ? (
                            <div className="inline-flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200 animate-in fade-in">
                              <span className="text-[10px] text-rose-700 font-bold px-1">O'chirish?</span>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-rose-600 text-white p-1 rounded font-bold hover:bg-rose-700"
                                title="Ha, o'chirish"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="bg-zinc-200 text-zinc-700 p-1 rounded font-bold hover:bg-zinc-300"
                                title="Bekor qilish"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(product.id)}
                              className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
