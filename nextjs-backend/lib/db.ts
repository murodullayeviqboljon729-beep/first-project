import { Product, Order, PromoCode, User } from './types';

// Mock in-memory database store with seed data
// In production Next.js, this can be swapped with Prisma / Drizzle / Mongoose / Supabase / Firebase
let users: User[] = [
  {
    id: 'usr-1',
    fullName: 'Diyorbek Karimov',
    email: 'user@bozorpro.uz',
    phone: '+998 90 123 45 67',
    password: 'password123',
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
  },
  {
    id: 'usr-admin',
    fullName: 'Adminstrator',
    email: 'admin@bozorpro.uz',
    phone: '+998 71 200 00 00',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    role: 'admin',
    createdAt: '2025-01-01',
    bonusPoints: 100000,
    addresses: []
  }
];
let products: Product[] = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    category: 'smartphones',
    categoryName: 'Smartfonlar va Gadjetlar',
    brand: 'Apple',
    price: 16800000,
    originalPrice: 18500000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Yangi A18 Pro protsessorli iPhone 16 Pro Max, titan korpus, 48MP kamera tizimi.',
    features: ['A18 Pro bionik chip', '48MP Fusion kamera', '5-darajali titan ramka'],
    specs: { 'Ekran': '6.9" Super Retina XDR OLED', 'Xotira': '256 GB', 'RAM': '8 GB' },
    colors: [{ name: 'Desert Titanium', hex: '#c5b49e' }],
    inStock: true,
    stockCount: 14,
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    tags: ['iphone', 'apple', 'smartfon']
  },
  {
    id: 'prod-2',
    name: 'Apple MacBook Pro 16" M3 Max 36GB / 1TB Space Black',
    category: 'laptops',
    categoryName: 'Noutbuklar va Kompyuterlar',
    brand: 'Apple',
    price: 36500000,
    originalPrice: 39000000,
    discountPercent: 6,
    rating: 5.0,
    reviewsCount: 68,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'M3 Max chipiga ega eng kuchli MacBook Pro. Video montaj va dasturlash uchun.',
    features: ['Apple M3 Max 14-core CPU', 'Liquid Retina XDR displey'],
    specs: { 'Protsessor': 'Apple M3 Max', 'Xotira': '1 TB SSD', 'RAM': '36 GB Unified' },
    inStock: true,
    stockCount: 6,
    isNew: true,
    isFeatured: true,
    tags: ['macbook', 'apple', 'laptop']
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling',
    category: 'audio',
    categoryName: 'Audio va Quloqchinlar',
    brand: 'Sony',
    price: 3950000,
    originalPrice: 4500000,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Sanoatdagi yetakchi shovqinni bekor qiluvchi (ANC) simsiz quloqchinlar.',
    features: ['30 soat batareya', 'Auto NC Optimizer'],
    specs: { 'Turi': 'Simsiz over-ear', 'Ulanish': 'Bluetooth 5.2' },
    inStock: true,
    stockCount: 20,
    isNew: false,
    isFeatured: true,
    tags: ['sony', 'headphones', 'audio']
  }
];

let orders: Order[] = [
  {
    id: 'ORD-89421',
    date: '2025-05-10',
    items: [
      {
        productId: 'prod-1',
        productName: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
        productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
        price: 16800000,
        quantity: 1,
        selectedColor: 'Desert Titanium'
      }
    ],
    subtotal: 16800000,
    discount: 0,
    deliveryFee: 0,
    total: 16800000,
    status: 'yetkazildi',
    paymentMethod: 'click',
    deliveryType: 'standard',
    customer: {
      fullName: 'Rustam Karimov',
      phone: '+998 90 123 45 67',
      city: 'Toshkent shahri',
      district: 'Yunusobod tumani',
      address: 'Amir Temur ko\'chasi, 45-uy, 12-xonadon'
    }
  }
];

let promoCodes: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'YANGI2025',
    discountPercent: 10,
    minOrderAmount: 500000,
    isActive: true,
    usageCount: 42,
    createdDate: '2025-01-01'
  },
  {
    id: 'promo-2',
    code: 'SUPER5',
    discountPercent: 5,
    minOrderAmount: 200000,
    isActive: true,
    usageCount: 88,
    createdDate: '2025-02-15'
  }
];

export const db = {
  getProducts: () => products,
  getProductById: (id: string) => products.find(p => p.id === id),
  addProduct: (product: Product) => {
    products.unshift(product);
    return product;
  },
  updateProduct: (id: string, updates: Partial<Product>) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id };
    return products[index];
  },
  deleteProduct: (id: string) => {
    const initialLen = products.length;
    products = products.filter(p => p.id !== id);
    return products.length < initialLen;
  },
  getOrders: () => orders,
  getOrderById: (id: string) => orders.find(o => o.id === id),
  addOrder: (order: Order) => {
    orders.unshift(order);
    return order;
  },
  updateOrderStatus: (id: string, status: Order['status']) => {
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.status = status;
    return order;
  },
  getPromoCodes: () => promoCodes,
  getPromoByCode: (code: string) => promoCodes.find(p => p.code.toUpperCase() === code.toUpperCase()),
  addPromoCode: (promo: PromoCode) => {
    promoCodes.unshift(promo);
    return promo;
  },
  getUsers: () => users.map(({ password, ...u }) => u),
  getUserById: (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },
  getUserByEmail: (email: string) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      bonusPoints: userData.bonusPoints ?? 50000,
      addresses: userData.addresses ?? [],
      role: userData.role ?? 'user'
    };
    users.unshift(newUser);
    const { password, ...safeUser } = newUser;
    return safeUser;
  },
  updateUser: (id: string, updates: Partial<User>) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates, id };
    const { password, ...safeUser } = users[index];
    return safeUser;
  }
};
