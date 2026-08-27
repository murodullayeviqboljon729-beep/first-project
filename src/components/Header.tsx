import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { Language } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Layers, 
  User as UserIcon, 
  Package, 
  ChevronDown, 
  Sparkles,
  ArrowRight,
  Globe,
  Check,
  LogOut,
  Gift,
  MapPin,
  Shield
} from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿', nativeName: "O'zbekcha" },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' }
];

export const Header: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    cartTotal, 
    wishlistCount, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    currency, 
    setCurrency, 
    language,
    setLanguage,
    t,
    getCategoryName,
    formatPrice,
    products,
    currentUser,
    setAuthModalOpen,
    setAuthModalMode,
    logout
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    navigateTo('catalog');
  };

  const filteredSuggestions = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs">
      {/* Top utility bar */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.topFreeShipping}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.topOriginalWarranty}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a 
              href="tel:+998712000000" 
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{t.phoneContact}</span>
            </a>
            
            <div className="h-3 w-px bg-zinc-700 hidden sm:block"></div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-dropdown-toggle-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors border border-zinc-700 flex items-center gap-1.5 cursor-pointer"
                title="Select language / Tilni tanlash / Выбрать язык"
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="font-bold">{currentLangObj.nativeName}</span>
                <ChevronDown className={`w-2.5 h-2.5 opacity-70 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div 
                  id="header-language-dropdown"
                  className="absolute right-0 top-full mt-1.5 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl p-1 z-50 overflow-hidden"
                >
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    {t.topLanguage}
                  </div>
                  {LANGUAGES.map(item => (
                    <button
                      key={item.code}
                      id={`lang-option-${item.code}`}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                        language === item.code
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.flag}</span>
                        <span>{item.nativeName}</span>
                      </div>
                      {language === item.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-3 w-px bg-zinc-700"></div>

            {/* Currency selector */}
            <div className="flex items-center gap-1">
              <span className="text-zinc-400 text-[10px] uppercase font-medium hidden sm:inline">{t.topCurrency}</span>
              <button
                id="currency-toggle-btn"
                onClick={() => setCurrency(currency === 'UZS' ? 'USD' : 'UZS')}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors border border-zinc-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{currency === 'UZS' ? `UZS (${t.currencyUz})` : 'USD ($)'}</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-70" />
              </button>
            </div>

            <div className="h-3 w-px bg-zinc-700"></div>

            {/* Admin Panel Quick Access */}
            <button
              id="top-admin-panel-btn"
              onClick={() => navigateTo('admin')}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[11px] font-extrabold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{t.topAdminPanel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-md shadow-zinc-900/10 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-zinc-900">BOZOR</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">PRO</span>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium tracking-tight">{t.brandSubtitle}</p>
            </div>
          </button>

          {/* Catalog Dropdown Button */}
          <div className="relative hidden lg:block" ref={dropdownRef}>
            <button
              id="catalog-menu-btn"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer ${
                categoryDropdownOpen || activePage === 'catalog'
                  ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/10' 
                  : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200/80'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{t.navCatalog}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-bold text-zinc-400 uppercase px-3 py-1.5 tracking-wider">
                  {t.navSections}
                </div>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    id={`cat-dropdown-${cat.id}`}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCategoryDropdownOpen(false);
                      navigateTo('catalog');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                      selectedCategory === cat.id 
                        ? 'bg-zinc-100 text-zinc-900 font-semibold' 
                        : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                    }`}
                  >
                    <span>{getCategoryName(cat.id)}</span>
                    <span className="text-xs bg-zinc-100 text-zinc-500 font-normal px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder={t.navSearchPlaceholder}
                className="w-full pl-11 pr-24 py-2.5 bg-zinc-100/90 hover:bg-zinc-100 focus:bg-white text-zinc-900 text-sm rounded-xl border border-transparent focus:border-zinc-300 focus:ring-4 focus:ring-zinc-900/5 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              {searchQuery && (
                <button
                  type="button"
                  id="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                id="search-submit-btn"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {t.navSearchBtn}
              </button>
            </form>

            {/* Quick search suggestions popup */}
            {searchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-200 p-2.5 z-50">
                <div className="text-[11px] font-bold text-zinc-400 uppercase px-2 py-1 tracking-wider">
                  {t.navSearchSuggestions}
                </div>
                {filteredSuggestions.map(item => (
                  <button
                    key={item.id}
                    id={`search-suggestion-${item.id}`}
                    onClick={() => {
                      setSearchFocused(false);
                      navigateTo('product-detail', item);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover rounded-lg bg-zinc-100 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 truncate">{item.name}</p>
                      <p className="text-xs font-semibold text-emerald-600">{formatPrice(item.price)}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Orders Tracking */}
            <button
              id="header-orders-btn"
              onClick={() => navigateTo('orders')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activePage === 'orders'
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Package className="w-4 h-4 text-zinc-500" />
              <span>{t.navOrders}</span>
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2.5 rounded-xl transition-colors cursor-pointer ${
                activePage === 'wishlist'
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
              title={t.navWishlistTitle}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => navigateTo('cart')}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                activePage === 'cart'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md shadow-zinc-900/10'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-emerald-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-zinc-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] text-zinc-400 leading-none">{t.navCart}</span>
                <span className="text-xs font-bold leading-tight text-white mt-0.5">
                  {cartTotal > 0 ? formatPrice(cartTotal) : (currency === 'USD' ? '$0' : `0 ${t.currencyUz}`)}
                </span>
              </div>
            </button>

            {/* User Profile / Auth Button (Desktop) */}
            <div className="relative" ref={userDropdownRef}>
              {currentUser ? (
                <button
                  id="header-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activePage === 'profile'
                      ? 'border-zinc-900 bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                  title={currentUser.fullName}
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.fullName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-zinc-900 truncate max-w-[100px]">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600">
                      {formatPrice(currentUser.bonusPoints || 50000)}
                    </span>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  id="header-login-btn"
                  onClick={() => {
                    setAuthModalMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-zinc-600" />
                  <span>{t.authLoginBtn}</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {userDropdownOpen && currentUser && (
                <div 
                  id="header-user-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="p-3 border-b border-zinc-100 bg-zinc-50 rounded-xl mb-1">
                    <div className="text-xs font-bold text-zinc-900 truncate">{currentUser.fullName}</div>
                    <div className="text-[11px] text-zinc-500 truncate">{currentUser.email}</div>
                    <div className="mt-2 pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">Bonus balansi:</span>
                      <span className="font-bold text-emerald-600">{formatPrice(currentUser.bonusPoints || 50000)}</span>
                    </div>
                  </div>

                  <button
                    id="user-drop-profile"
                    onClick={() => {
                      navigateTo('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-left transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-zinc-400" />
                    <span>{t.profilePersonalInfo}</span>
                  </button>

                  <button
                    id="user-drop-orders"
                    onClick={() => {
                      navigateTo('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-left transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-zinc-400" />
                    <span>{t.profileMyOrders}</span>
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      id="user-drop-admin"
                      onClick={() => {
                        navigateTo('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-50 text-left transition-colors cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span>Admin Panel</span>
                    </button>
                  )}

                  <div className="h-px bg-zinc-100 my-1" />

                  <button
                    id="user-drop-logout"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>{t.profileLogout}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 pt-3 mt-2 border-t border-zinc-100 text-xs font-semibold text-zinc-600">
          <button
            id="cat-link-all"
            onClick={() => { setSelectedCategory('all'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'all' && activePage === 'catalog' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catAll}
          </button>
          <button
            id="cat-link-smartphones"
            onClick={() => { setSelectedCategory('smartphones'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'smartphones' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catSmartphones}
          </button>
          <button
            id="cat-link-laptops"
            onClick={() => { setSelectedCategory('laptops'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'laptops' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catLaptops}
          </button>
          <button
            id="cat-link-audio"
            onClick={() => { setSelectedCategory('audio'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'audio' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catAudio}
          </button>
          <button
            id="cat-link-clothing"
            onClick={() => { setSelectedCategory('clothing'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'clothing' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catClothing}
          </button>
          <button
            id="cat-link-home"
            onClick={() => { setSelectedCategory('home'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'home' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catHome}
          </button>
          <button
            id="cat-link-sports"
            onClick={() => { setSelectedCategory('sports'); navigateTo('catalog'); }}
            className={`hover:text-zinc-900 transition-colors pb-1 cursor-pointer ${selectedCategory === 'sports' ? 'text-zinc-900 border-b-2 border-zinc-900 font-bold' : ''}`}
          >
            {t.catSports}
          </button>

          <div className="ml-auto flex items-center gap-4">
            <button
              id="header-about-link"
              onClick={() => navigateTo('about')}
              className={`hover:text-zinc-900 transition-colors cursor-pointer ${activePage === 'about' ? 'text-zinc-900 font-bold' : ''}`}
            >
              {t.navAboutFaq}
            </button>
            <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[11px] font-bold">
              <Sparkles className="w-3 h-3" />
              {t.navDiscountsBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-200 px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Language Switcher */}
          <div className="bg-zinc-50 p-2.5 rounded-2xl border border-zinc-200">
            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span>{t.topLanguage}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  id={`mob-lang-btn-${l.code}`}
                  onClick={() => {
                    setLanguage(l.code);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    language === l.code
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Account / Profile Mobile Section */}
          <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-2xl">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-200 flex items-center justify-center">
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">{currentUser.fullName}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{formatPrice(currentUser.bonusPoints || 50000)} bonus</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg"
                    title={t.profileLogout}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
                <button
                  id="mob-nav-profile"
                  onClick={() => { navigateTo('profile'); setMobileMenuOpen(false); }}
                  className="w-full py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{t.profilePersonalInfo} (Kabinet)</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  id="mob-login-btn"
                  onClick={() => { setAuthModalMode('login'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold text-center"
                >
                  {t.authLoginBtn}
                </button>
                <button
                  id="mob-register-btn"
                  onClick={() => { setAuthModalMode('register'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center"
                >
                  {t.authRegisterBtn}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{t.navMainPages}</div>
            <button
              id="mob-nav-home"
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 cursor-pointer"
            >
              {t.navHome}
            </button>
            <button
              id="mob-nav-catalog"
              onClick={() => { navigateTo('catalog'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 cursor-pointer"
            >
              {t.navAllProducts}
            </button>
            <button
              id="mob-nav-orders"
              onClick={() => { navigateTo('orders'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
            >
              <span>{t.navMyOrders}</span>
              <Package className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              id="mob-nav-wishlist"
              onClick={() => { navigateTo('wishlist'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
            >
              <span>{t.navWishlistTitle}</span>
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>
            </button>
            <button
              id="mob-nav-about"
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium hover:bg-zinc-100 cursor-pointer"
            >
              {t.navAboutContact}
            </button>
            <button
              id="mob-nav-admin"
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.navAdminPro}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded">Pro</span>
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-100 space-y-1">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{t.navCategories}</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                id={`mob-cat-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigateTo('catalog');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-zinc-600 hover:bg-zinc-50 flex items-center justify-between cursor-pointer"
              >
                <span>{getCategoryName(cat.id)}</span>
                <span className="text-xs text-zinc-400">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

