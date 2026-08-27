import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Send, 
  Heart,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Xatolik', 'Iltimos to\'g\'ri elektron pochta manzilini kiriting', 'error');
      return;
    }
    showToast('Obuna bo\'ldingiz!', 'Aksiya va chegirmalar xabarnomasi yuboriladi', 'success');
    setEmail('');
  };

  return (
    <footer id="app-footer" className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-zinc-800/80">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-emerald-400 flex items-center justify-center shrink-0 border border-zinc-800">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Tezkor yetkazib berish</h4>
              <p className="text-xs text-zinc-400 mt-1">O'zbekistonning barcha viloyatlariga 1 kunda yetkazamiz.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-emerald-400 flex items-center justify-center shrink-0 border border-zinc-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Original kafolati</h4>
              <p className="text-xs text-zinc-400 mt-1">Faqat rasmiy distribyutorlardan sertifikatlangan tovarlar.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-emerald-400 flex items-center justify-center shrink-0 border border-zinc-800">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Qulay to'lov tizimlari</h4>
              <p className="text-xs text-zinc-400 mt-1">Click, Payme, Uzum Pay va qabul qilganda naqd to'lov.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-emerald-400 flex items-center justify-center shrink-0 border border-zinc-800">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Qo'llab-quvvatlash</h4>
              <p className="text-xs text-zinc-400 mt-1">Har qanday savolingizga operatorlarimiz yordam beradi.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">BOZOR</span>
                <span className="ml-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded-md border border-emerald-800">PRO</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              Eng so'nggi zamonaviy elektronika, gadjetlar, noutbuklar, sport va kiyim-kechaklar eng hamyonbop narxlarda O'zbekiston bo'ylab.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white mb-2">Aksiyalardan xabardor bo'ling:</p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  id="footer-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  id="footer-subscribe-btn"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Obuna</span>
                </button>
              </form>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Bo'limlar</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">
                  Barcha mahsulotlar
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                  Sevimlilar ro'yxati
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">
                  Savatcha
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('orders')} className="hover:text-white transition-colors">
                  Buyurtmalar holati
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Kategoriyalar</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => { setSelectedCategory('smartphones'); navigateTo('catalog'); }} className="hover:text-white transition-colors">
                  Smartfonlar & Gadjetlar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('laptops'); navigateTo('catalog'); }} className="hover:text-white transition-colors">
                  Noutbuklar & Kompyuterlar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('audio'); navigateTo('catalog'); }} className="hover:text-white transition-colors">
                  Audio & Quloqchinlar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('clothing'); navigateTo('catalog'); }} className="hover:text-white transition-colors">
                  Kiyim & Poyabzal
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('home'); navigateTo('catalog'); }} className="hover:text-white transition-colors">
                  Maishiy texnika
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Aloqa markazi</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+998712000000" className="text-white font-semibold hover:text-emerald-400">
                  +998 (71) 200-00-00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-400">support@bozorpro.uz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-400">Toshkent sh., Amir Temur shoh ko'chasi 108</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-400">Har kuni 09:00 dan 22:00 gacha</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Payment badges */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 BOZOR PRO Online Do'koni. Barcha huquqlar himoyalangan.</p>
          
          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">CLICK</span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">PAYME</span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">UZUM PAY</span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">UZCARD</span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">HUMO</span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-[11px] font-bold">VISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
