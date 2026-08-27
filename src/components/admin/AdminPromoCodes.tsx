import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PromoCode } from '../../types';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Check, 
  Power, 
  Copy, 
  Percent, 
  Sparkles, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AdminPromoCodes: React.FC = () => {
  const { promoCodes, addPromoCode, togglePromoCode, deletePromoCode, formatPrice, showToast } = useShop();

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(100000);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      showToast('Xatolik', 'Promokod matnini kiriting', 'error');
      return;
    }

    if (discountPercent <= 0 || discountPercent > 90) {
      showToast('Xatolik', 'Chegirma foizi 1 dan 90 gacha bo\'lishi kerak', 'error');
      return;
    }

    addPromoCode({
      code: code.trim(),
      discountPercent,
      minOrderAmount: minOrderAmount > 0 ? minOrderAmount : undefined,
      isActive
    });

    setCode('');
    setDiscountPercent(10);
    setMinOrderAmount(100000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Nusxalandi', `"${text}" kodi nusxalandi`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">Promokodlar va Chegirmalar</h2>
            <span className="bg-zinc-100 text-zinc-800 text-xs font-black px-2.5 py-0.5 rounded-full">
              {promoCodes.length} ta
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Mijozlarni jalb qilish uchun yangi promo-kodlar yaratish va ularning foydalanish statistikasini kuzatish
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Create Promo Code Form */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-900">Yangi Promokod</h3>
              <p className="text-[11px] text-zinc-400">Tezkor chegirma kuponi qo'shish</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-zinc-700 block mb-1.5">
                Kupon kodi *
              </label>
              <input
                id="promo-code-input"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Masalan: NAVROZ25 yoki MEGA30"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 font-mono font-bold tracking-wider uppercase outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-700 block mb-1.5">
                Chegirma miqdori (%) *
              </label>
              <div className="relative">
                <input
                  id="promo-percent-input"
                  type="number"
                  required
                  min={1}
                  max={90}
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-zinc-900 font-black outline-none"
                />
                <Percent className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="font-bold text-zinc-700 block mb-1.5">
                Minimal buyurtma summasi (so'm)
              </label>
              <input
                id="promo-min-amount-input"
                type="number"
                min={0}
                step={10000}
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 font-bold outline-none"
              />
              <span className="text-[10px] text-zinc-400 block mt-1">
                {formatPrice(minOrderAmount)} dan yuqori buyurtmalar uchun
              </span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span className="font-bold text-zinc-800">Darhol faollashtirish (Active)</span>
            </label>

            <button
              id="create-promo-submit-btn"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Promokodni Yaratish</span>
            </button>
          </form>
        </div>

        {/* Promo Codes List Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/70 flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900">Mavjud promo-kodlar</h3>
            <span className="text-xs text-zinc-400 font-medium">Jami {promoCodes.length} ta kupon</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">KOD</th>
                  <th className="py-3 px-4">CHEGIRMA</th>
                  <th className="py-3 px-4">MIN. SUMMA</th>
                  <th className="py-3 px-4">ISHLATILISH</th>
                  <th className="py-3 px-4">HOLATI</th>
                  <th className="py-3 px-4 text-right">AMALLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {promoCodes.map(promo => (
                  <tr key={promo.id} className="hover:bg-zinc-50/80 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-lg">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(promo.code)}
                          className="p-1 text-zinc-400 hover:text-zinc-900 rounded"
                          title="Nusxalash"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-emerald-600 text-xs">
                      {promo.discountPercent}% OFF
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600 font-bold">
                      {promo.minOrderAmount ? formatPrice(promo.minOrderAmount) : 'Cheklovsiz'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-zinc-900">{promo.usageCount} marta</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePromoCode(promo.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          promo.isActive 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>{promo.isActive ? 'Faol' : 'O\'chiq'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`"${promo.code}" promokodini o'chirmoqchimisiz?`)) {
                            deletePromoCode(promo.id);
                          }
                        }}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
