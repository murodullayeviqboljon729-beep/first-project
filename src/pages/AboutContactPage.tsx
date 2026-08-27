import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';

export const AboutContactPage: React.FC = () => {
  const { showToast, t, language } = useShop();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const faqsByLang = {
    uz: [
      {
        q: 'Yetkazib berish qancha vaqt oladi?',
        a: 'Toshkent shahri bo\'yicha buyurtmalar 3 soatdan 24 soatgacha yetkazib beriladi. Viloyat markazlariga 1-2 ish kuni ichida kuryer xizmati orqali yetkazamiz.'
      },
      {
        q: 'Mahsulotlarga kafolat bormi?',
        a: 'Ha, do\'konimizdagi barcha tovarlar 100% original bo\'lib, ularga ishlab chiqaruvchi va do\'konimiz tomonidan 12 oylik rasmiy kafolat taloni taqdim etiladi.'
      },
      {
        q: 'To\'lovni qanday usullarda amalga oshirish mumkin?',
        a: 'Siz Click, Payme, Uzum Pay orqali onlayn yoki kuryer tovaringizni olib kelganda naqd pul va Uzcard/Humo bank kartalari orqali to\'lashingiz mumkin.'
      },
      {
        q: 'Muddatli to\'lov (kredit) mavjudmi?',
        a: 'Ha! Uzum Nasiya va hamkor banklar orqali 3 oydan 12 oygacha ortiqcha hujjatlarsiz muddatli to\'lovga xarid qilishingiz mumkin.'
      },
      {
        q: 'Tovarni qaytarish yoki almashtirish shartlari qanday?',
        a: 'Agar mahsulotda nuqson bo\'lsa yoki sizga mos kelmasa, xarid qilingan kundan boshlab 14 kun ichida qadog\'i va cheki bilan qaytarishingiz yoki almashtirishingiz mumkin.'
      }
    ],
    ru: [
      {
        q: 'Сколько времени занимает доставка?',
        a: 'По Ташкенту доставка занимает от 3 до 24 часов. В областные центры доставка осуществляется курьерской службой за 1-2 рабочих дня.'
      },
      {
        q: 'Есть ли гарантия на товары?',
        a: 'Да, вся продукция в нашем магазине на 100% оригинальная и сопровождается официальной гарантией от производителя и нашего магазина на 12 месяцев.'
      },
      {
        q: 'Какие способы оплаты доступны?',
        a: 'Вы можете оплатить онлайн через Click, Payme, Uzum Pay или наличными и картами Uzcard/Humo при получении курьеру.'
      },
      {
        q: 'Доступна ли рассрочка?',
        a: 'Да! Через Uzum Nasiya и банки-партнеры вы можете оформить рассрочку от 3 до 12 месяцев без лишних справок.'
      },
      {
        q: 'Каковы условия возврата или обмена товара?',
        a: 'В случае обнаружения дефекта или несоответствия вы можете вернуть или обменять товар в течение 14 дней при сохранности упаковки и чека.'
      }
    ],
    en: [
      {
        q: 'How long does delivery take?',
        a: 'Delivery in Tashkent takes from 3 to 24 hours. To regional centers, delivery takes 1-2 business days via courier.'
      },
      {
        q: 'Is there a warranty on products?',
        a: 'Yes, all products in our store are 100% authentic and backed by a 12-month official warranty from the manufacturer and our store.'
      },
      {
        q: 'What payment methods are available?',
        a: 'You can pay online via Click, Payme, Uzum Pay, or cash and Uzcard/Humo bank cards upon courier arrival.'
      },
      {
        q: 'Is installment payment available?',
        a: 'Yes! Through Uzum Nasiya and partner banks, you can purchase in 3 to 12-month installments with minimal paperwork.'
      },
      {
        q: 'What are the return and exchange conditions?',
        a: 'If a product is defective or does not suit you, you can return or exchange it within 14 days with its original box and receipt.'
      }
    ]
  };

  const currentFaqs = faqsByLang[language] || faqsByLang.uz;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      showToast('Error', 'Please fill all fields', 'error');
      return;
    }
    showToast('Success', 'Message sent successfully!', 'success');
    setContactName('');
    setContactPhone('');
    setContactMessage('');
  };

  return (
    <div id="about-page" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-16">
      
      {/* Intro Banner */}
      <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.navAbout}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === 'uz' && "O'zbekistondagi eng ishonchli zamonaviy onlayn gipermarket"}
            {language === 'ru' && "Самый надежный современный онлайн-гипермаркет в Узбекистане"}
            {language === 'en' && "The most trusted modern online hypermarket in Uzbekistan"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {language === 'uz' && "Bizning maqsadimiz — har bir yurtdoshimizga eng sifatli va original texnika, smartfonlar hamda kundalik tovarlarni eng maqbul narxlarda tezkor yetkazib berishdir."}
            {language === 'ru' && "Наша цель — предоставить каждому клиенту качественную оригинальную технику, смартфоны и товары первой необходимости по лучшим ценам с быстрой доставкой."}
            {language === 'en' && "Our mission is to deliver authentic electronics, smartphones, and everyday essentials at the most reasonable prices directly to your doorstep."}
          </p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            100%
          </div>
          <h3 className="font-bold text-sm text-zinc-900">
            {language === 'uz' && "Faqat Original Brendlar"}
            {language === 'ru' && "Только оригинальные бренды"}
            {language === 'en' && "100% Genuine Brands"}
          </h3>
          <p className="text-xs text-zinc-500">
            {language === 'uz' && "Apple, Samsung, Sony, Dyson va boshqa jahon brendlari bilan to'g'ridan-to'g'ri rasmiy hamkorlik."}
            {language === 'ru' && "Прямое официальное сотрудничество с Apple, Samsung, Sony, Dyson и мировыми брендами."}
            {language === 'en' && "Direct authorized partnership with Apple, Samsung, Sony, Dyson and leading global brands."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            24/7
          </div>
          <h3 className="font-bold text-sm text-zinc-900">
            {language === 'uz' && "Doimiy Aloqa"}
            {language === 'ru' && "Круглосуточная поддержка"}
            {language === 'en' && "24/7 Customer Support"}
          </h3>
          <p className="text-xs text-zinc-500">
            {language === 'uz' && "Mijozlarimizga xarid qilishda va texnik masalalarda tunu-kun professional maslahat."}
            {language === 'ru' && "Круглосуточные профессиональные консультации по покупкам и техническим вопросам."}
            {language === 'en' && "Round-the-clock assistance and advisory for all your purchasing and technical questions."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            1 {t.perMonth}
          </div>
          <h3 className="font-bold text-sm text-zinc-900">
            {language === 'uz' && "Tezkor Kuryerlik"}
            {language === 'ru' && "Быстрая курьерская доставка"}
            {language === 'en' && "Fast Express Delivery"}
          </h3>
          <p className="text-xs text-zinc-500">
            {language === 'uz' && "O'zbekistonning barcha 14 ta hududiga qisqa muddat ichida to'g'ridan-to'g'ri xonadoningizgacha yetkazish."}
            {language === 'ru' && "Быстрая доставка прямо до вашей двери по всем регионам Узбекистана."}
            {language === 'en' && "Fast direct doorstep delivery across all regions of Uzbekistan."}
          </p>
        </div>
      </div>

      {/* FAQ & Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FAQ Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-black text-zinc-900">
              {language === 'uz' && "Ko'p beriladigan savollar (FAQ)"}
              {language === 'ru' && "Часто задаваемые вопросы (FAQ)"}
              {language === 'en' && "Frequently Asked Questions (FAQ)"}
            </h2>
          </div>

          <div className="space-y-3">
            {currentFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-colors"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-zinc-900' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-black text-zinc-900">{t.navAbout}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {language === 'uz' && "Savollaringiz yoki takliflaringiz bo'lsa, xabar qoldiring"}
              {language === 'ru' && "Если у вас есть вопросы или предложения, напишите нам"}
              {language === 'en' && "Leave a message if you have any questions or inquiries"}
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">{t.checkoutFullName}</label>
              <input
                id="contact-name-input"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Sardor Aliyev"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">{t.checkoutPhone}</label>
              <input
                id="contact-phone-input"
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">{t.checkoutNote}</label>
              <textarea
                id="contact-message-input"
                rows={3}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="..."
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-900 rounded-xl p-3.5 text-xs text-zinc-900 outline-none"
              />
            </div>

            <button
              type="submit"
              id="contact-send-btn"
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.contactSend}</span>
            </button>
          </form>

          {/* Quick contact list */}
          <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+998 (71) 200-00-00 (Call-center)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>info@bozorpro.uz</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Toshkent sh., Amir Temur shoh ko'chasi, 108</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
