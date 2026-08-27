import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  Gift, 
  Shield, 
  LogOut, 
  Heart, 
  ShoppingCart, 
  Plus, 
  Check, 
  Trash2, 
  Edit3, 
  Calendar, 
  Phone, 
  Mail, 
  Award, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Save,
  Key
} from 'lucide-react';
import { UserAddress } from '../types';

export const ProfilePage: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    cart, 
    logout, 
    updateProfile, 
    addUserAddress, 
    deleteUserAddress, 
    setDefaultAddress, 
    formatPrice, 
    navigateTo, 
    getStatusLabel, 
    t 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'bonuses' | 'security'>('overview');
  
  // Profile edit states
  const [editingProfile, setEditingProfile] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  // Add Address Modal state
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Toshkent shahri');
  const [newAddrDistrict, setNewAddrDistrict] = useState('');
  const [newAddrDetails, setNewAddrDetails] = useState('');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  // Security
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Profilga kirilmagan</h2>
        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
          Shaxsiy kabinetingizga kirish yoki ro'yxatdan o'tish orqali barcha qulayliklardan foydalanishingiz mumkin.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-zinc-900 text-white font-bold text-sm rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  // Filter orders for this user (or show all local orders for demo)
  const userOrders = orders;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName,
      phone,
      email
    });
    setEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrTitle || !newAddrDistrict || !newAddrDetails) return;

    addUserAddress({
      title: newAddrTitle,
      city: newAddrCity,
      district: newAddrDistrict,
      address: newAddrDetails,
      isDefault: newAddrIsDefault
    });

    setNewAddrTitle('');
    setNewAddrDistrict('');
    setNewAddrDetails('');
    setNewAddrIsDefault(false);
    setAddressModalOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('Yangi parol kamida 6 ta belgidan iborat bo\'lishi lozim');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Yangi parollar mos kelmadi');
      return;
    }

    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="bg-zinc-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8 relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* User Info Left */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-zinc-100 border-2 border-zinc-900/10 shadow-sm flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.fullName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <UserIcon className="w-10 h-10 text-zinc-400" />
                  )}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    {currentUser.fullName}
                  </h1>
                  {currentUser.role === 'admin' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Premium Mijoz
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 mt-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    {currentUser.email}
                  </span>
                  {currentUser.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      {currentUser.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    {t.profileMemberSince}: {currentUser.createdAt || '2025'}
                  </span>
                </div>
              </div>
            </div>

            {/* Loyalty & Bonus Points Card Right */}
            <div className="flex items-center gap-3">
              <div className="bg-zinc-900 text-white p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {t.profileBonusPoints}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {formatPrice(currentUser.bonusPoints || 50000)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" /> 1 bonus = 1 so'm
                  </div>
                </div>
              </div>

              <button
                id="profile-logout-btn"
                onClick={logout}
                title={t.profileLogout}
                className="p-3.5 rounded-2xl bg-zinc-100 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 border border-zinc-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-100">
            <button
              onClick={() => setActiveTab('orders')}
              className="p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs text-zinc-500 font-medium">{t.profileTabOrders}</div>
              <div className="text-lg font-bold text-zinc-900 mt-0.5">{userOrders.length} ta</div>
            </button>
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs text-zinc-500 font-medium">Saqlanganlar</div>
              <div className="text-lg font-bold text-zinc-900 mt-0.5">{wishlist.length} ta</div>
            </button>
            <button
              onClick={() => navigateTo('cart')}
              className="p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs text-zinc-500 font-medium">Savatchada</div>
              <div className="text-lg font-bold text-zinc-900 mt-0.5">{cart.length} ta</div>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className="p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 text-left transition-colors cursor-pointer"
            >
              <div className="text-xs text-zinc-500 font-medium">{t.profileTabAddresses}</div>
              <div className="text-lg font-bold text-zinc-900 mt-0.5">{(currentUser.addresses || []).length} ta</div>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Tabs + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Tabs (Sidebar on desktop) */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-3xl p-3 border border-zinc-200/80 shadow-xs space-y-1">
              <button
                id="profile-tab-overview"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4" />
                  <span>{t.profileTabOverview}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                id="profile-tab-orders"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>{t.profileTabOrders}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-zinc-800 text-emerald-400' : 'bg-zinc-100 text-zinc-600'}`}>
                  {userOrders.length}
                </span>
              </button>

              <button
                id="profile-tab-addresses"
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>{t.profileTabAddresses}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                id="profile-tab-bonuses"
                onClick={() => setActiveTab('bonuses')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bonuses'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-4 h-4 text-emerald-500" />
                  <span>{t.profileTabBonuses}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                  50k
                </span>
              </button>

              <button
                id="profile-tab-security"
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  <span>{t.profileTabSecurity}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </div>

            {/* Admin quick access if admin */}
            {currentUser.role === 'admin' && (
              <div className="bg-purple-50 rounded-3xl p-4 border border-purple-200/80">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs mb-1">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Admin Boshqaruv</span>
                </div>
                <p className="text-[11px] text-purple-700 mb-3">
                  Do'kon mahsulotlari, buyurtmalar va promokodlarni boshqarish
                </p>
                <button
                  onClick={() => navigateTo('admin')}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Admin Panelga o'tish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Tab Content Panels (Right Column) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Personal Info Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">
                        {t.profilePersonalInfo}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Shaxsiy ma'lumotlaringiz va kontaktlaringiz
                      </p>
                    </div>
                    {!editingProfile ? (
                      <button
                        id="profile-edit-btn"
                        onClick={() => setEditingProfile(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{t.profileEditInfo}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
                      >
                        Bekor qilish
                      </button>
                    )}
                  </div>

                  {editingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1">
                            {t.authFullName}
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1">
                            {t.authEmail}
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-700 mb-1">
                            {t.authPhone}
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{t.profileSaveBtn}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100">
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">F.I.SH</div>
                        <div className="text-sm font-semibold text-zinc-900 mt-1">{currentUser.fullName}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100">
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Email</div>
                        <div className="text-sm font-semibold text-zinc-900 mt-1">{currentUser.email}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100">
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Telefon</div>
                        <div className="text-sm font-semibold text-zinc-900 mt-1">{currentUser.phone || 'Kiritilmagan'}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100">
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Hisob darajasi</div>
                        <div className="text-sm font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Gold VIP Mijoz (3% keshbek)
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-zinc-900">
                      So'nggi buyurtmalar
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      Barchasini ko'rish ({userOrders.length})
                    </button>
                  </div>

                  {userOrders.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400 text-xs">
                      Hozircha buyurtmalar yo'q
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userOrders.slice(0, 3).map((order) => (
                        <div 
                          key={order.id}
                          className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shrink-0">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                                <span>{order.id}</span>
                                <span className="text-[10px] font-semibold text-zinc-400">({order.date})</span>
                              </div>
                              <div className="text-xs text-zinc-500 mt-0.5">
                                {order.items.length} ta mahsulot • {order.customer?.city || (order as any).customerCity || 'Toshkent'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3">
                            <span className="text-sm font-bold text-zinc-900">
                              {formatPrice(order.total ?? (order as any).totalAmount ?? 0)}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              order.status === 'yetkazildi' ? 'bg-emerald-100 text-emerald-700' :
                              order.status === 'yolda' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'tayyorlanmoqda' ? 'bg-amber-100 text-amber-700' :
                              'bg-zinc-200 text-zinc-700'
                            }`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {t.profileMyOrders}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Barcha xaridlaringiz va ularning yetkazilish holati
                    </p>
                  </div>
                  <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-xl">
                    Jami: {userOrders.length} ta
                  </span>
                </div>

                {userOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-zinc-400">
                      <Package className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">Hozircha buyurtmalar yo'q</h4>
                    <p className="text-xs text-zinc-500 mt-1 mb-5 max-w-xs mx-auto">
                      Do'konimizdan biror mahsulot xarid qilsangiz, buyurtma tafsilotlari shu yerda ko'rinadi.
                    </p>
                    <button
                      onClick={() => navigateTo('home')}
                      className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Katalogni ko'rish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div 
                        key={order.id}
                        className="p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-all space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-zinc-900">{order.id}</div>
                              <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                                <Clock className="w-3 h-3" /> {order.date}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'yetkazildi' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'yolda' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'tayyorlanmoqda' ? 'bg-amber-100 text-amber-800' :
                              'bg-zinc-100 text-zinc-800'
                            }`}>
                              {getStatusLabel(order.status)}
                            </span>
                            <span className="text-base font-extrabold text-zinc-900">
                              {formatPrice(order.total ?? (order as any).totalAmount ?? 0)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.productImage || (item as any).product?.image || (item as any).product?.images?.[0]} 
                                  alt={item.productName || (item as any).product?.name}
                                  className="w-10 h-10 object-cover rounded-lg border border-zinc-100 shrink-0" 
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-semibold text-zinc-900 line-clamp-1">{item.productName || (item as any).product?.name}</div>
                                  <div className="text-[11px] text-zinc-400">
                                    {formatPrice(item.price || (item as any).product?.price || 0)} × {item.quantity} ta
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold text-zinc-800">
                                {formatPrice((item.price || (item as any).product?.price || 0) * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery address & meta */}
                        <div className="p-3 bg-zinc-50 rounded-xl text-xs text-zinc-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>{order.customer?.address || (order as any).deliveryAddress}, {order.customer?.city || (order as any).customerCity}</span>
                          </div>
                          <div className="text-zinc-500 font-medium">
                            To'lov: <span className="font-bold text-zinc-800 uppercase">{order.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {t.profileDeliveryAddresses}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Buyurtmalarni tezkor rasmiylashtirish uchun saqlangan manzillar
                    </p>
                  </div>
                  <button
                    id="profile-add-address-btn"
                    onClick={() => setAddressModalOpen(true)}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.profileAddAddress}</span>
                  </button>
                </div>

                {(!currentUser.addresses || currentUser.addresses.length === 0) ? (
                  <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-2xl">
                    <MapPin className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                    <p className="text-xs text-zinc-500 mb-4">Saqlangan manzillar mavjud emas</p>
                    <button
                      onClick={() => setAddressModalOpen(true)}
                      className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                    >
                      + Yangi manzil qo'shish
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentUser.addresses.map((addr) => (
                      <div 
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all relative ${
                          addr.isDefault 
                            ? 'border-emerald-500 bg-emerald-50/20 shadow-xs' 
                            : 'border-zinc-200 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-900">{addr.title}</span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                                Asosiy
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => deleteUserAddress(addr.id)}
                            className="text-zinc-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-zinc-600 space-y-1 mb-4">
                          <div className="font-semibold text-zinc-800">{addr.city}, {addr.district}</div>
                          <div className="text-zinc-500">{addr.address}</div>
                        </div>

                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                          >
                            Asosiy qilib belgilash
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. BONUSES TAB */}
            {activeTab === 'bonuses' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
                  <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{t.profileBonusPoints}</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                      {formatPrice(currentUser.bonusPoints || 50000)}
                    </div>

                    <p className="text-xs text-zinc-300 max-w-md mb-6 leading-relaxed">
                      Sizning hisobingizda 50 000 bonus ball mavjud. Ushbu bonuslarni keyingi xaridlarda buyurtma summasining 50% gacha qismini to'lash uchun ishlatishingiz mumkin.
                    </p>

                    {/* Progress to next tier */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-md">
                      <div className="flex justify-between text-xs font-semibold text-zinc-200 mb-1.5">
                        <span>VIP Status: <strong className="text-emerald-400">Gold</strong></span>
                        <span>Keyingi daraja: <strong>Platinum (100k)</strong></span>
                      </div>
                      <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loyalty Rules & History */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                  <h3 className="text-base font-bold text-zinc-900 mb-4">
                    Bonuslar qanday ishlaydi?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-2">
                        1
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 mb-1">Xaridlardan 3% keshbek</h4>
                      <p className="text-[11px] text-zinc-500">Har bir muvaffaqiyatli buyurtmadan 3% hisobingizga tushadi.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2">
                        2
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 mb-1">1 bonus = 1 so'm</h4>
                      <p className="text-[11px] text-zinc-500">Bonuslar hech qachon kuymaydi va to'lov vaqtida chegirma beradi.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-2">
                        3
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 mb-1">Do'stlarni taklif qiling</h4>
                      <p className="text-[11px] text-zinc-500">Har bir ro'yxatdan o'tgan do'stingiz uchun 25 000 so'm bonus oling.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-zinc-900">
                    Xavfsizlik va Parolni o'zgartirish
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Akkountingiz xavfsizligini ta'minlash uchun parolingizni yangilab turing
                  </p>
                </div>

                {passwordSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Parol muvaffaqiyatli yangilandi!</span>
                  </div>
                )}

                {passwordError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Hozirgi parol
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Yangi parol
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Yangi parolni tasdiqlash
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer mt-4"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Parolni yangilash</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {addressModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => { if (e.target === e.currentTarget) setAddressModalOpen(false); }}
        >
          <div className="bg-white w-full max-w-md rounded-3xl p-6 border border-zinc-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900">
              {t.profileAddAddress}
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Manzil nomi (Masalan: Uy, Ishxona, Ota-onam uyi)
                </label>
                <input
                  type="text"
                  required
                  value={newAddrTitle}
                  onChange={(e) => setNewAddrTitle(e.target.value)}
                  placeholder="Uy"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Shahar / Viloyat</label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Tuman</label>
                  <input
                    type="text"
                    required
                    value={newAddrDistrict}
                    onChange={(e) => setNewAddrDistrict(e.target.value)}
                    placeholder="Chilonzor tumani"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Ko'cha, uy va xonadon raqami
                </label>
                <textarea
                  required
                  rows={2}
                  value={newAddrDetails}
                  onChange={(e) => setNewAddrDetails(e.target.value)}
                  placeholder="Qatortol ko'chasi, 12-uy, 34-xonadon"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-zinc-900 transition-all resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAddrIsDefault}
                  onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-zinc-300 focus:ring-emerald-500"
                />
                <span>Asosiy yetkazib berish manzili sifatida saqlash</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
