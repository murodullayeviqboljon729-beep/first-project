import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, BRANDS } from '../data/products';
import { 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Search, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Check, 
  Star,
  Sparkles
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    formatPrice,
    t,
    getCategoryName
  } = useShop();

  // Local filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(45000000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'newest'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Toggle brand
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(45000000);
    setOnlyInStock(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      // In stock
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Min Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.rating - a.rating; // default 'popular'
    });
  }, [products, selectedCategory, selectedBrands, searchQuery, minPrice, maxPrice, onlyInStock, minRating, sortBy]);

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (minPrice > 0 || maxPrice < 45000000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div id="catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            {t.catalogTitle}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            {t.totalProductsFound}: {filteredProducts.length} {t.productsSuffix}
            {selectedCategory !== 'all' && ` • ${getCategoryName(selectedCategory)}`}
          </p>
        </div>

        {/* View & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            id="mobile-filter-trigger-btn"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-zinc-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>{t.filters}</span>
            {activeFilterCount > 0 && (
              <span className="bg-emerald-500 text-zinc-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold">
            <span className="text-zinc-400">{t.sortBy}:</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-zinc-900 font-bold outline-none cursor-pointer"
            >
              <option value="popular">{t.sortPopular}</option>
              <option value="price_asc">{t.sortPriceAsc}</option>
              <option value="price_desc">{t.sortPriceDesc}</option>
              <option value="newest">{t.sortNewest}</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              id="grid-view-btn"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="list-view-btn"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-4">
          <span className="text-xs font-bold text-zinc-400">{t.activeFilters}:</span>
          
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
              {t.filterCategories}: {getCategoryName(selectedCategory)}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
            </span>
          )}

          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
              {t.searchPlaceholder}: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}

          {selectedBrands.map(b => (
            <span key={b} className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
              {b}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(b)} />
            </span>
          ))}

          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
              {t.inStockOnly}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyInStock(false)} />
            </span>
          )}

          <button
            id="reset-filters-chip-btn"
            onClick={resetFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-2 underline cursor-pointer"
          >
            {t.clearAll}
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-zinc-200/90 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <h3 className="font-black text-base text-zinc-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
              <span>{t.filters}</span>
            </h3>
            {activeFilterCount > 0 && (
              <button
                id="sidebar-reset-btn"
                onClick={resetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.clearAll}</span>
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
              {t.filterCategories}
            </label>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  id={`filter-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <span>{getCategoryName(cat.id)}</span>
                  <span className={`text-[11px] ${selectedCategory === cat.id ? 'text-zinc-400' : 'text-zinc-400'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="pt-4 border-t border-zinc-100">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
              {t.filterBrands}
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {BRANDS.map(brand => {
                const checked = selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`brand-check-${brand}`}
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 rounded-md"
                    />
                    <span>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-zinc-100">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
              {t.filterPriceRange}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="45000000"
                step="500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
                <span>0</span>
                <span className="text-emerald-600">{t.upTo} {formatPrice(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* In Stock & Rating */}
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <label className="flex items-center gap-2.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 cursor-pointer">
              <input
                type="checkbox"
                id="stock-checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 rounded-md"
              />
              <span>{t.inStockOnly}</span>
            </label>

            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                {t.filterMinRating}
              </label>
              <div className="flex items-center gap-1.5">
                {[0, 4, 4.5, 4.8].map(rate => (
                  <button
                    key={rate}
                    id={`rate-filter-${rate}`}
                    onClick={() => setMinRating(rate)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      minRating === rate 
                        ? 'bg-zinc-900 text-white' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {rate === 0 ? t.ratingAll : `${rate} ★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS LISTING */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">{t.noProductsFound}</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {t.noProductsFoundDesc}
              </p>
              <button
                id="empty-reset-btn"
                onClick={resetFilters}
                className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.clearAll}</span>
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <h3 className="font-black text-lg text-zinc-900">{t.filters}</h3>
                <button
                  id="close-mobile-filter-btn"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  {t.filterCategories}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      id={`mob-filter-cat-${cat.id}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                        selectedCategory === cat.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {getCategoryName(cat.id)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  {t.filterBrands}
                </label>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(b => (
                    <button
                      key={b}
                      id={`mob-filter-brand-${b}`}
                      onClick={() => toggleBrand(b)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        selectedBrands.includes(b)
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  {t.filterPriceRange}: {formatPrice(maxPrice)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="45000000"
                  step="500000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 flex gap-3">
              <button
                id="mob-filter-reset-btn"
                onClick={resetFilters}
                className="flex-1 py-3 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                {t.clearAll}
              </button>
              <button
                id="mob-filter-apply-btn"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {t.viewResults}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
