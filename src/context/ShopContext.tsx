import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, PageType, CurrencyType, ToastMessage, PromoCode, Language, User, UserAddress } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { translations, TranslationDictionary, getLocalizedCategoryName, getLocalizedStatusLabel } from '../i18n/translations';
import { api } from '../services/api';

const USD_EXCHANGE_RATE = 12800; // 1 USD = 12,800 UZS

const DEFAULT_DEMO_USER: User = {
  id: 'usr-1',
  fullName: 'Diyorbek Karimov',
  email: 'diyorbek@gmail.com',
  phone: '+998 90 123 45 67',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  role: 'user',
  createdAt: '2025-11-12',
  bonusPoints: 50000,
  addresses: [
    {
      id: 'addr-1',
      title: 'Uy (Toshkent)',
      city: 'Toshkent shahri',
      district: 'Yunusobod tumani',
      address: 'Amir Temur shoh ko\'chasi, 108-uy, 42-xonadon',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Ishxona',
      city: 'Toshkent shahri',
      district: 'Mirobod tumani',
      address: 'Nukus ko\'chasi, 29-uy, IT Park',
      isDefault: false
    }
  ]
};

const DEFAULT_ADMIN_USER: User = {
  id: 'usr-admin',
  fullName: 'Administrator',
  email: 'admin@bozorpro.uz',
  phone: '+998 71 200 00 00',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  role: 'admin',
  createdAt: '2025-01-01',
  bonusPoints: 100000,
  addresses: []
};

const INITIAL_PROMOS: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'SALOM2026',
    discountPercent: 10,
    minOrderAmount: 100000,
    isActive: true,
    usageCount: 42,
    createdDate: '2026-01-01'
  },
  {
    id: 'promo-2',
    code: 'SUPER20',
    discountPercent: 20,
    minOrderAmount: 500000,
    isActive: true,
    usageCount: 18,
    createdDate: '2026-01-15'
  },
  {
    id: 'promo-3',
    code: 'UZUM5',
    discountPercent: 5,
    minOrderAmount: 50000,
    isActive: true,
    usageCount: 95,
    createdDate: '2026-02-01'
  }
];

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  promoCodes: PromoCode[];
  activePage: PageType;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  searchQuery: string;
  selectedCategory: string;
  currency: CurrencyType;
  language: Language;
  appliedPromo: { code: string; discountPercent: number } | null;
  toasts: ToastMessage[];
  t: TranslationDictionary;
  
  // User & Auth State
  currentUser: User | null;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { fullName: string; email: string; phone?: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addUserAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteUserAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  quickLoginDemo: (type: 'user' | 'admin') => void;

  // Actions
  setActivePage: (page: PageType) => void;
  setSelectedProduct: (product: Product | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setCurrency: (currency: CurrencyType) => void;
  setLanguage: (lang: Language) => void;
  getCategoryName: (categoryId: string) => string;
  getStatusLabel: (status: string) => string;
  
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  addPromoCode: (promo: Omit<PromoCode, 'id' | 'usageCount' | 'createdDate'>) => void;
  togglePromoCode: (id: string) => void;
  deletePromoCode: (id: string) => void;
  
  createOrder: (orderData: Omit<Order, 'id' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  
  // Product Management (Admin)
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Product;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  
  formatPrice: (priceUZS: number) => string;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  navigateTo: (page: PageType, product?: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return SAMPLE_PRODUCTS;
  });
  
  // Load persisted promo codes
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_promos');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PROMOS;
  });

  // Load persisted states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-4'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial sample orders
    return [
      {
        id: 'ORD-84920',
        date: '2026-02-24 10:15',
        items: [
          {
            productId: 'prod-4',
            productName: 'Sony WH-1000XM5 Simsiz Shovqin So\'ndiruvchi Quloqchin',
            productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
            price: 4300000,
            quantity: 1,
            selectedColor: 'Silver'
          }
        ],
        subtotal: 4300000,
        discount: 0,
        deliveryFee: 0,
        total: 4300000,
        status: 'yolda',
        paymentMethod: 'click',
        deliveryType: 'standard',
        customer: {
          fullName: 'Doston Aramov',
          phone: '+998 90 123 45 67',
          city: 'Toshkent shahri',
          district: 'Yunusobod',
          address: 'Amir Temur ko\'chasi, 45-uy'
        }
      },
      {
        id: 'ORD-72194',
        date: '2026-02-23 16:40',
        items: [
          {
            productId: 'prod-1',
            productName: 'iPhone 16 Pro Max 256GB Desert Titanium',
            productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
            price: 15400000,
            quantity: 1,
            selectedColor: 'Desert Titanium'
          }
        ],
        subtotal: 15400000,
        discount: 1540000,
        deliveryFee: 0,
        total: 13860000,
        status: 'yetkazildi',
        paymentMethod: 'payme',
        deliveryType: 'express',
        customer: {
          fullName: 'Jasur Rahimov',
          phone: '+998 93 987 65 43',
          city: 'Samarqand viloyati',
          district: 'Samarqand shahri',
          address: 'Registon ko\'chasi, 12-uy'
        }
      }
    ];
  });

  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currency, setCurrency] = useState<CurrencyType>('UZS');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_lang');
      if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'uz';
  });
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auth & User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('onlineshop_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default to demo user for a great initial logged-in experience or testing
    return DEFAULT_DEMO_USER;
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Load live data from Backend API on mount
  useEffect(() => {
    let isMounted = true;

    async function syncWithBackend() {
      try {
        // Sync products from server
        const prodRes = await api.getProducts();
        if (isMounted && prodRes.success && Array.isArray(prodRes.data) && prodRes.data.length > 0) {
          setProducts(prodRes.data);
        }

        // Sync orders from server
        const ordRes = await api.getOrders();
        if (isMounted && Array.isArray(ordRes) && ordRes.length > 0) {
          setOrders(ordRes);
        }

        // Sync promo codes from server
        const promoRes = await api.getPromos();
        if (isMounted && Array.isArray(promoRes) && promoRes.length > 0) {
          setPromoCodes(promoRes);
        }

        // Sync user profile if logged in
        if (currentUser?.id) {
          const userRes = await api.getMe(currentUser.id);
          if (isMounted && userRes.success && userRes.user) {
            setCurrentUser(userRes.user);
          }
        }
      } catch (err) {
        console.warn('Backend sync initial note:', err);
      }
    }

    syncWithBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist Current User
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('onlineshop_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('onlineshop_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Current translation dictionary
  const t = translations[language] || translations.uz;

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('onlineshop_lang', newLang);
    } catch (e) {
      console.error(e);
    }
    const newT = translations[newLang] || translations.uz;
    showToast(newT.toastLangChanged, undefined, 'info');
  };

  const getCategoryName = (categoryId: string): string => {
    return getLocalizedCategoryName(categoryId, language);
  };

  const getStatusLabel = (status: string): string => {
    return getLocalizedStatusLabel(status, language);
  };

  // Persist Products
  useEffect(() => {
    try {
      localStorage.setItem('onlineshop_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Persist Promo codes
  useEffect(() => {
    try {
      localStorage.setItem('onlineshop_promos', JSON.stringify(promoCodes));
    } catch (e) {
      console.error(e);
    }
  }, [promoCodes]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('onlineshop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('onlineshop_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem('onlineshop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast: ToastMessage = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageType, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    showToast('Savatchaga qo\'shildi!', `${product.name.slice(0, 35)}... qo'shildi`, 'success');
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
    showToast('O\'chirildi', 'Mahsulot savatchadan olib tashlandi', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);

    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Sevimlilardan o\'chirildi', prod ? prod.name.slice(0, 30) : '', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Sevimlilarga saqlandi ❤️', prod ? prod.name.slice(0, 30) : '', 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Promo Codes Logic
  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = promoCodes.find(p => p.code.toUpperCase() === cleanCode && p.isActive);

    if (found) {
      setAppliedPromo({ code: found.code, discountPercent: found.discountPercent });
      // Update promo usage
      setPromoCodes(prev => prev.map(p => p.id === found.id ? { ...p, usageCount: p.usageCount + 1 } : p));
      showToast('Promo-kod faollashtirildi!', `${found.discountPercent}% chegirma muvaffaqiyatli qo'llandi`, 'success');
      return { success: true, message: `${found.discountPercent}% chegirma qo'llandi!` };
    }

    showToast('Noto\'g\'ri kod', 'Bunday promokod mavjud emas yoki muddati o\'tgan', 'error');
    return { success: false, message: 'Bunday faol promo-kod topilmadi. Masalan: SALOM2026 yoki SUPER20' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo-kod bekor qilindi', undefined, 'info');
  };

  const addPromoCode = (promo: Omit<PromoCode, 'id' | 'usageCount' | 'createdDate'>) => {
    const newPromo: PromoCode = {
      ...promo,
      code: promo.code.trim().toUpperCase(),
      id: `promo-${Date.now()}`,
      usageCount: 0,
      createdDate: new Date().toISOString().slice(0, 10)
    };
    setPromoCodes(prev => [newPromo, ...prev]);
    showToast('Promokod yaratildi!', `"${newPromo.code}" (${newPromo.discountPercent}%) qo'shildi`, 'success');
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    showToast('Promokod holati o\'zgartirildi', undefined, 'info');
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
    showToast('Promokod o\'chirildi', undefined, 'info');
  };

  // Orders Logic
  const createOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'kutilmoqda'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Sync to backend API
    api.createOrder(newOrder).catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status } : order));
    api.updateOrderStatus(orderId, status).catch(() => {});
    showToast('Buyurtma holati yangilandi', `${orderId} holati: ${status}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    showToast('Buyurtma o\'chirildi', `${orderId} tizimdan o'chirildi`, 'info');
  };

  // Products Management (Admin)
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0
    };

    setProducts(prev => [newProduct, ...prev]);
    api.createProduct(newProduct).catch(() => {});
    showToast('Mahsulot qo\'shildi!', `"${newProduct.name}" katalogga muvaffaqiyatli joylandi`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedData };
        // Recalculate discount percent if original price and price are updated
        if (merged.originalPrice && merged.originalPrice > merged.price) {
          merged.discountPercent = Math.round(((merged.originalPrice - merged.price) / merged.originalPrice) * 100);
        } else {
          merged.discountPercent = undefined;
        }
        return merged;
      }
      return p;
    }));
    api.updateProduct(id, updatedData).catch(() => {});
    showToast('Mahsulot tahrirlandi!', 'Ma\'lumotlar muvaffaqiyatli saqlandi', 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    // Also remove from cart and wishlist if present
    setCart(prev => prev.filter(item => item.product.id !== id));
    setWishlist(prev => prev.filter(wishId => wishId !== id));
    api.deleteProduct(id).catch(() => {});
    showToast('Mahsulot o\'chirildi', target ? target.name.slice(0, 30) : '', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(SAMPLE_PRODUCTS);
    localStorage.removeItem('onlineshop_products');
    showToast('Standart mahsulotlar tiklandi', 'Boshlang\'ich katalog qayta yuklandi', 'info');
  };

  // Auth Methods
  const login = async (emailOrPhone: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await api.login(emailOrPhone, password);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        setAuthModalOpen(false);
        showToast(t.toastLoginSuccess, res.user.fullName, 'success');
        return { success: true };
      }
      // Fallback local check if API call failed
      if (emailOrPhone.toLowerCase() === 'admin@bozorpro.uz') {
        setCurrentUser(DEFAULT_ADMIN_USER);
        setAuthModalOpen(false);
        showToast(t.toastLoginSuccess, DEFAULT_ADMIN_USER.fullName, 'success');
        return { success: true };
      }
      
      const localUser: User = {
        id: `usr-${Date.now()}`,
        fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Mijoz',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'foydalanuvchi@bozorpro.uz',
        phone: emailOrPhone.startsWith('+') ? emailOrPhone : '+998 90 123 45 67',
        role: 'user',
        bonusPoints: 50000,
        createdAt: new Date().toISOString().split('T')[0],
        addresses: DEFAULT_DEMO_USER.addresses
      };
      setCurrentUser(localUser);
      setAuthModalOpen(false);
      showToast(t.toastLoginSuccess, localUser.fullName, 'success');
      return { success: true };
    } catch {
      return { success: false, message: 'Kirishda xatolik yuz berdi' };
    }
  };

  const register = async (data: { fullName: string; email: string; phone?: string; password?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await api.register(data);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        setAuthModalOpen(false);
        showToast(t.toastRegisterSuccess, undefined, 'success');
        return { success: true };
      }
      // Local fallback
      const newUser: User = {
        id: `usr-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        role: 'user',
        bonusPoints: 50000,
        createdAt: new Date().toISOString().split('T')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.fullName)}`,
        addresses: []
      };
      setCurrentUser(newUser);
      setAuthModalOpen(false);
      showToast(t.toastRegisterSuccess, undefined, 'success');
      return { success: true };
    } catch {
      return { success: false, message: "Ro'yxatdan o'tishda xatolik yuz berdi" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('onlineshop_current_user');
    showToast(t.toastLogoutSuccess, undefined, 'info');
    if (activePage === 'profile' || activePage === 'admin') {
      setActivePage('home');
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!currentUser) return false;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    api.updateProfile(currentUser.id, data).catch(() => {});
    showToast(t.toastProfileUpdated, undefined, 'success');
    return true;
  };

  const addUserAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddress: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    const updatedAddresses = [...(currentUser.addresses || []), newAddress];
    updateProfile({ addresses: updatedAddresses });
  };

  const deleteUserAddress = (id: string) => {
    if (!currentUser || !currentUser.addresses) return;
    const updatedAddresses = currentUser.addresses.filter(a => a.id !== id);
    updateProfile({ addresses: updatedAddresses });
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser || !currentUser.addresses) return;
    const updatedAddresses = currentUser.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    updateProfile({ addresses: updatedAddresses });
  };

  const quickLoginDemo = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      setCurrentUser(DEFAULT_ADMIN_USER);
      setAuthModalOpen(false);
      showToast(t.toastLoginSuccess, `${DEFAULT_ADMIN_USER.fullName} (Admin)`, 'success');
    } else {
      setCurrentUser(DEFAULT_DEMO_USER);
      setAuthModalOpen(false);
      showToast(t.toastLoginSuccess, DEFAULT_DEMO_USER.fullName, 'success');
    }
  };

  const formatPrice = (priceUZS: number): string => {
    if (currency === 'USD') {
      const inUSD = priceUZS / USD_EXCHANGE_RATE;
      return `$${inUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    const formattedNum = priceUZS.toLocaleString('uz-UZ').replace(/,/g, ' ');
    if (language === 'ru') {
      return `${formattedNum} сум`;
    }
    if (language === 'en') {
      return `${formattedNum} UZS`;
    }
    return `${formattedNum} so'm`;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        promoCodes,
        activePage,
        selectedProduct,
        quickViewProduct,
        searchQuery,
        selectedCategory,
        currency,
        language,
        appliedPromo,
        toasts,
        t,
        currentUser,
        isAuthenticated: !!currentUser,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        register,
        logout,
        updateProfile,
        addUserAddress,
        deleteUserAddress,
        setDefaultAddress,
        quickLoginDemo,
        setActivePage,
        setSelectedProduct,
        setQuickViewProduct,
        setSearchQuery,
        setSelectedCategory,
        setCurrency,
        setLanguage,
        getCategoryName,
        getStatusLabel,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromoCode,
        removePromoCode,
        addPromoCode,
        togglePromoCode,
        deletePromoCode,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        formatPrice,
        cartTotal,
        cartCount,
        wishlistCount,
        showToast,
        removeToast,
        navigateTo
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
