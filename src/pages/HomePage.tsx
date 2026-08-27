import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, BRANDS } from '../data/products';
import { 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Percent, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Shirt, 
  Home, 
  Activity,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, setSelectedCategory, formatPrice } = useShop();

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter subsets
  const flashSaleProducts = products.filter(p => p.isFlashSale).slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newProducts = products.filter(p => p.isNew || p.discountPercent).slice(0, 4);

  // Category Icon mapper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'smartphones': return <Smartphone className="w-6 h-6 text-blue-500" />;
      case 'laptops': return <Laptop className="w-6 h-6 text-indigo-500" />;
      case 'audio': return <Headphones className="w-6 h-6 text-rose-500" />;
      case 'watches': return <Watch className="w-6 h-6 text-amber-500" />;
      case 'clothing': return <Shirt className="w-6 h-6 text-emerald-500" />;
      case 'home': return <Home className="w-6 h-6 text-cyan-500" />;
      case 'sports': return <Activity className="w-6 h-6 text-orange-500" />;
      default: return <Sparkles className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div id="home-page" className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-zinc-950 text-white rounded-3xl mx-4 sm:mx-6 mt-4 shadow-2xl">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yangi Mavsum Takliflari 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Eng sara texnika va gadjetlar <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">hush kelibsiz!</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              iPhone 16 Pro Max, M3 Max MacBook Pro, Sony ANC quloqchinlari va boshqa original brend mahsulotlarini rasmiy kafolat bilan xarid qiling.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={() => navigateTo('catalog')}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
              >
                <span>Xaridni boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-flash-btn"
                onClick={() => {
                  const elem = document.getElementById('flash-sale-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-bold text-sm px-6 py-3.5 rounded-2xl transition-colors flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Kunning aksiyalari</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1 yillik rasmiy kafolat
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0% Muddatli to'lov
              </span>
            </div>
          </div>

          {/* Hero Featured Card Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-zinc-900/90 rounded-3xl p-6 border border-zinc-800/80 shadow-2xl backdrop-blur-md">
              
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-zinc-950 mb-5 group cursor-pointer"
                   onClick={() => navigateTo('product-detail', products[0])}>
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80"
                  alt="iPhone 16 Pro Max"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  -9% CHEGIRMA
                </span>
                <span className="absolute bottom-3 right-3 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  Top Flagman
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Apple Flagman 2026</div>
                <h3 className="text-lg font-bold text-white leading-tight">iPhone 16 Pro Max 256GB Desert Titanium</h3>
                
                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span className="text-2xl font-black text-white">{formatPrice(16800000)}</span>
                    <span className="ml-2 text-xs text-zinc-500 line-through">{formatPrice(18500000)}</span>
                  </div>
                  <button
                    id="hero-featured-view-btn"
                    onClick={() => navigateTo('product-detail', products[0])}
                    className="bg-white text-zinc-900 font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-zinc-100 transition-colors"
                  >
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900">Ommabop kategoriyalar</h2>
            <p className="text-xs text-zinc-500 mt-0.5">O'zingizga kerakli bo'limni tanlang</p>
          </div>
          <button
            id="view-all-categories-btn"
            onClick={() => { setSelectedCategory('all'); navigateTo('catalog'); }}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('catalog');
              }}
              className="group bg-white hover:bg-zinc-50 border border-zinc-200/90 hover:border-zinc-300 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 group-hover:bg-white flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.id)}
              </div>
              <h3 className="text-xs font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-zinc-400 font-medium mt-1">
                {cat.count} ta mahsulot
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FLASH SALE COUNTDOWN SECTION */}
      <section id="flash-sale-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-600/10 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <Flame className="w-7 h-7 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight">Kunning Tezkor Aksiya Takliflari</h2>
                  <span className="bg-white text-rose-600 font-black text-xs px-2 py-0.5 rounded-full uppercase">
                    Maxsus narx
                  </span>
                </div>
                <p className="text-xs text-rose-100 mt-0.5">
                  Cheklangan miqdordagi mahsulotlar uchun 20% gacha chegirmalar
                </p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
              <div className="text-center">
                <span className="text-lg font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[9px] uppercase tracking-wider text-rose-200">soat</span>
              </div>
              <span className="text-lg font-bold opacity-70">:</span>
              <div className="text-center">
                <span className="text-lg font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[9px] uppercase tracking-wider text-rose-200">daq</span>
              </div>
              <span className="text-lg font-bold opacity-70">:</span>
              <div className="text-center">
                <span className="text-lg font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[9px] uppercase tracking-wider text-rose-200">son</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashSaleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER 2-COLUMN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="relative overflow-hidden bg-zinc-900 rounded-3xl p-8 text-white border border-zinc-800 flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10 max-w-xs">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mavsumiy Taklif</span>
              <h3 className="text-2xl font-black mt-1">Apple MacBook & Gaming Noutbuklar</h3>
              <p className="text-xs text-zinc-400 mt-2">Professional dasturlash va geyming uchun eng kuchli noutbuklar.</p>
              <button 
                id="promo-laptop-btn"
                onClick={() => { setSelectedCategory('laptops'); navigateTo('catalog'); }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold bg-white text-zinc-900 px-4 py-2 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <span>Noutbuklarni ko'rish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80" 
              alt="MacBook" 
              className="absolute -right-10 -bottom-10 w-64 h-64 object-cover rounded-full opacity-60 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative overflow-hidden bg-emerald-950 rounded-3xl p-8 text-white border border-emerald-900/50 flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10 max-w-xs">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Yangi Kolleksiya</span>
              <h3 className="text-2xl font-black mt-1">Nike & Adidas Sport Kiyimlari</h3>
              <p className="text-xs text-emerald-200/80 mt-2">100% original krossovkalar va qulay kundalik kiyimlar.</p>
              <button 
                id="promo-clothing-btn"
                onClick={() => { setSelectedCategory('clothing'); navigateTo('catalog'); }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-400 text-zinc-950 px-4 py-2 rounded-xl hover:bg-emerald-300 transition-colors"
              >
                <span>Katalogga o'tish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" 
              alt="Nike" 
              className="absolute -right-8 -bottom-8 w-60 h-60 object-cover rounded-full opacity-60 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* ALL POPULAR PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-zinc-900">Barcha Tavsiya Etilgan Mahsulotlar</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Xaridorlarimiz tomonidan eng yuqori baholangan tovarlar</p>
          </div>
          <button
            id="view-all-products-btn"
            onClick={() => navigateTo('catalog')}
            className="text-xs font-bold text-zinc-900 hover:text-emerald-600 flex items-center gap-1"
          >
            <span>Katalogga o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TRUST & SERVICE GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-zinc-100 rounded-3xl p-8 border border-zinc-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-black text-zinc-900">Nega aynan bizning do'konimiz?</h3>
            <p className="text-xs text-zinc-600 mt-1">Mijozlarimizga eng qulay va ishonchli xarid tajribasini taqdim etamiz</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900">Tez va Bepul Yetkazish</h4>
              <p className="text-xs text-zinc-500 mt-1">150 000 so'mdan yuqori xaridlar O'zbekiston bo'ylab bepul.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900">Kafolatlangan Sifat</h4>
              <p className="text-xs text-zinc-500 mt-1">Har bir mahsulot ishlab chiqaruvchining rasmiy kafolatiga ega.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900">14 Kunda Qaytarish</h4>
              <p className="text-xs text-zinc-500 mt-1">Mahsulot yoqmasa yoki mos kelmasa, osonlikcha almashtiring.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900">Qulay Bo'lib To'lash</h4>
              <p className="text-xs text-zinc-500 mt-1">Boshlang'ich to'lovsiz, 12 oygacha bo'lib to'lash imkoniyati.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR BRANDS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rasmiy Hamkor Brendlar</p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 opacity-70">
          {BRANDS.map(brand => (
            <span key={brand} className="text-base sm:text-lg font-black text-zinc-600 tracking-wider">
              {brand.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
};
