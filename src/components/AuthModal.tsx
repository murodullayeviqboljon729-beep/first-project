import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  CheckCircle2, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register, 
    quickLoginDemo, 
    t 
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  if (!authModalOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setConfirmPassword('');
    setError(null);
    setForgotSent(false);
  };

  const handleClose = () => {
    resetForm();
    setAuthModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        if (!email || !password) {
          setError(languagePromptMissing());
          setLoading(false);
          return;
        }
        const res = await login(email, password);
        if (!res.success) {
          setError(res.message || 'Email yoki parol noto\'g\'ri');
        }
      } else if (authModalMode === 'register') {
        if (!fullName || !email || !password) {
          setError('Iltimos, barcha majburiy maydonlarni to\'ldiring');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Kiritilgan parollar bir-biriga mos kelmadi');
          setLoading(false);
          return;
        }
        const res = await register({
          fullName,
          email,
          phone,
          password
        });
        if (!res.success) {
          setError(res.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
        }
      } else if (authModalMode === 'forgot') {
        if (!email) {
          setError('Email manzilini kiriting');
          setLoading(false);
          return;
        }
        setTimeout(() => {
          setForgotSent(true);
          setLoading(false);
        }, 600);
        return;
      }
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const languagePromptMissing = () => {
    return 'Email va parolni kiriting';
  };

  return (
    <div 
      id="auth-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        id="auth-modal-container"
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden relative animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="relative bg-zinc-900 text-white p-6 pb-7">
          <button
            id="auth-modal-close-btn"
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white">BOZOR PRO</span>
              <span className="text-[10px] font-bold text-emerald-400 ml-1.5 uppercase px-1.5 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">
                Akkount
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            {authModalMode === 'login' && t.authLoginTitle}
            {authModalMode === 'register' && t.authRegisterTitle}
            {authModalMode === 'forgot' && t.authForgotPassword}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {authModalMode === 'login' && 'Shaxsiy profilingizga kiring va xaridlarni boshqaring'}
            {authModalMode === 'register' && 'Ro\'yxatdan o\'ting va 50 000 so\'m bonusga ega bo\'ling!'}
            {authModalMode === 'forgot' && 'Emailingizni kiriting, tiklash havolasini yuboramiz'}
          </p>

          {/* Welcome Promo Ribbon */}
          {authModalMode === 'register' && (
            <div className="mt-3.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-2.5 flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.authWelcomeBonus}</span>
            </div>
          )}
        </div>

        {/* Mode Switcher Tabs */}
        {authModalMode !== 'forgot' && (
          <div className="flex border-b border-zinc-100 bg-zinc-50 p-1.5 m-4 mb-2 rounded-2xl">
            <button
              id="auth-tab-login"
              type="button"
              onClick={() => { setAuthModalMode('login'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authModalMode === 'login'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {t.authSwitchToLogin}
            </button>
            <button
              id="auth-tab-register"
              type="button"
              onClick={() => { setAuthModalMode('register'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authModalMode === 'register'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {t.authSwitchToRegister}
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 pt-2">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {forgotSent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">Email yuborildi!</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                <span className="font-semibold text-zinc-800">{email}</span> manziliga parolni tiklash bo'yicha ko'rsatmalar yuborildi.
              </p>
              <button
                type="button"
                onClick={() => { setAuthModalMode('login'); setForgotSent(false); }}
                className="mt-2 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Kirish sahifasiga qaytish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name for Register */}
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {t.authFullName} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="auth-fullname-input"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ali Valiyev"
                      className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none transition-all"
                    />
                    <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              {/* Email / Phone */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  {authModalMode === 'register' ? t.authEmail : t.authEmailOrPhone} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="auth-email-input"
                    type={authModalMode === 'register' ? 'email' : 'text'}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={authModalMode === 'register' ? 'misol@gmail.com' : 'user@bozorpro.uz'}
                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone for Register */}
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {t.authPhone}
                  </label>
                  <div className="relative">
                    <input
                      id="auth-phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none transition-all"
                    />
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              {/* Password */}
              {authModalMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-zinc-700">
                      {t.authPassword} <span className="text-rose-500">*</span>
                    </label>
                    {authModalMode === 'login' && (
                      <button
                        type="button"
                        id="auth-forgot-btn"
                        onClick={() => { setAuthModalMode('forgot'); setError(null); }}
                        className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        {t.authForgotPassword}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="auth-password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none transition-all"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      id="auth-toggle-pwd-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-zinc-400 hover:text-zinc-600 absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password for Register */}
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {t.authConfirmPassword} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="auth-confirm-pwd-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none transition-all"
                    />
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                id="auth-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-sm shadow-md shadow-zinc-900/10 flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {authModalMode === 'login' && t.authLoginBtn}
                      {authModalMode === 'register' && t.authRegisterBtn}
                      {authModalMode === 'forgot' && 'Parolni tiklash'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Login Shortcut */}
          <div className="mt-5 pt-4 border-t border-zinc-100">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center mb-2.5">
              Tezkor Demo Kirish (1-klik)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="auth-demo-user-btn"
                onClick={() => quickLoginDemo('user')}
                className="py-2 px-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mijoz (Test)</span>
              </button>
              <button
                type="button"
                id="auth-demo-admin-btn"
                onClick={() => quickLoginDemo('admin')}
                className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin (Test)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
