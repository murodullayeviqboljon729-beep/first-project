import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { SAMPLE_PRODUCTS, CATEGORIES } from './src/data/products';
import { Product, Order, PromoCode, User } from './src/types';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-Memory Database Store with initial seed data
  let users: (User & { password?: string })[] = [
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
      fullName: 'Administrator',
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

  // In-Memory Database Store with initial seed data
  let products: Product[] = [...SAMPLE_PRODUCTS];
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
    },
    {
      id: 'ORD-76290',
      date: '2025-05-12',
      items: [
        {
          productId: 'prod-3',
          productName: 'Sony WH-1000XM5 Wireless Noise-Canceling',
          productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
          price: 3950000,
          quantity: 1,
          selectedColor: 'Midnight Silver'
        }
      ],
      subtotal: 3950000,
      discount: 200000,
      deliveryFee: 0,
      total: 3750000,
      status: 'yolda',
      paymentMethod: 'payme',
      deliveryType: 'standard',
      customer: {
        fullName: 'Dilshod Ergashev',
        phone: '+998 93 987 65 43',
        city: 'Toshkent shahri',
        district: 'Mirzo Ulug\'bek tumani',
        address: 'Buyuk Ipak Yo\'li, 102'
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
    },
    {
      id: 'promo-3',
      code: 'BAHOR15',
      discountPercent: 15,
      minOrderAmount: 1500000,
      isActive: true,
      usageCount: 19,
      createdDate: '2025-03-01'
    }
  ];

  // API Endpoints

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), totalProducts: products.length, totalOrders: orders.length });
  });

  // 2. Categories
  app.get('/api/categories', (req, res) => {
    const categoryCounts: Record<string, number> = { all: products.length };
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const enrichedCategories = CATEGORIES.map(cat => ({
      ...cat,
      count: categoryCounts[cat.id] || 0
    }));

    res.json({ success: true, data: enrichedCategories });
  });

  // 3. Products: List with filters, search, sorting, pagination
  app.get('/api/products', (req, res) => {
    const { category, brand, search, minPrice, maxPrice, inStock, sort, isFlashSale, isFeatured, isNew, limit } = req.query;

    let filtered = [...products];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (brand) {
      const brandStr = String(brand).toLowerCase();
      filtered = filtered.filter(p => p.brand.toLowerCase() === brandStr);
    }

    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    if (inStock === 'true') {
      filtered = filtered.filter(p => p.inStock && p.stockCount > 0);
    }

    if (isFlashSale === 'true') {
      filtered = filtered.filter(p => p.isFlashSale);
    }

    if (isFeatured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    if (isNew === 'true') {
      filtered = filtered.filter(p => p.isNew);
    }

    // Sorting
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
      filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else {
      // default / popular
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    if (limit) {
      filtered = filtered.slice(0, Number(limit));
    }

    res.json({
      success: true,
      count: filtered.length,
      total: products.length,
      data: filtered
    });
  });

  // 4. Product by ID
  app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  });

  // 5. Create Product (Admin)
  app.post('/api/products', (req, res) => {
    const newProduct: Product = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`
    };

    if (!newProduct.name || !newProduct.price) {
      return res.status(400).json({ success: false, error: 'Name and price are required' });
    }

    products.unshift(newProduct);
    res.status(201).json({ success: true, data: newProduct });
  });

  // 6. Update Product (Admin)
  app.put('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    products[index] = {
      ...products[index],
      ...req.body,
      id: req.params.id
    };

    res.json({ success: true, data: products[index] });
  });

  // 7. Delete Product (Admin)
  app.delete('/api/products/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter(p => p.id !== req.params.id);

    if (products.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // 8. Orders: List (Admin & History)
  app.get('/api/orders', (req, res) => {
    res.json({ success: true, count: orders.length, data: orders });
  });

  // 9. Orders: Create new order (Checkout)
  app.post('/api/orders', (req, res) => {
    const orderData = req.body;

    if (!orderData.items || !orderData.items.length || !orderData.customer?.fullName || !orderData.customer?.phone) {
      return res.status(400).json({ success: false, error: 'Invalid order data. Missing items or customer details.' });
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: orderData.items,
      subtotal: Number(orderData.subtotal) || 0,
      discount: Number(orderData.discount) || 0,
      deliveryFee: Number(orderData.deliveryFee) || 0,
      total: Number(orderData.total) || 0,
      status: 'kutilmoqda',
      paymentMethod: orderData.paymentMethod || 'cash',
      deliveryType: orderData.deliveryType || 'standard',
      customer: orderData.customer
    };

    // Auto-update stock counts
    newOrder.items.forEach(orderItem => {
      const prod = products.find(p => p.id === orderItem.productId);
      if (prod) {
        prod.stockCount = Math.max(0, prod.stockCount - orderItem.quantity);
        if (prod.stockCount === 0) {
          prod.inStock = false;
        }
      }
    });

    orders.unshift(newOrder);
    res.status(201).json({ success: true, data: newOrder });
  });

  // 10. Orders: Update status (Admin)
  app.patch('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const order = orders.find(o => o.id === req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    res.json({ success: true, data: order });
  });

  // 11. Promos: List
  app.get('/api/promos', (req, res) => {
    res.json({ success: true, data: promoCodes });
  });

  // 12. Promos: Validate code
  app.post('/api/promos/validate', (req, res) => {
    const { code, cartTotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Promo code is required' });
    }

    const promo = promoCodes.find(p => p.code.toUpperCase() === String(code).trim().toUpperCase());
    if (!promo || !promo.isActive) {
      return res.status(404).json({ success: false, error: 'Yaroqsiz yoki eskirgan promokod' });
    }

    if (promo.minOrderAmount && Number(cartTotal) < promo.minOrderAmount) {
      return res.status(400).json({
        success: false,
        error: `Ushbu promokod minimal ${promo.minOrderAmount.toLocaleString()} so'mlik xaridlar uchun amal qiladi`
      });
    }

    res.json({ success: true, data: promo });
  });

  // 13. Promos: Create new promo
  app.post('/api/promos', (req, res) => {
    const newPromo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: req.body.code.toUpperCase().trim(),
      discountPercent: Number(req.body.discountPercent),
      minOrderAmount: Number(req.body.minOrderAmount) || 0,
      isActive: true,
      usageCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    promoCodes.unshift(newPromo);
    res.status(201).json({ success: true, data: newPromo });
  });

  // 14. Analytics summary (Admin dashboard)
  app.get('/api/analytics', (req, res) => {
    const totalRevenue = orders
      .filter(o => o.status !== 'bekor_qilindi')
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrdersCount = orders.length;
    const activeProductsCount = products.filter(p => p.inStock).length;
    const lowStockProducts = products.filter(p => p.stockCount <= 5);

    const categoryBreakdown: Record<string, number> = {};
    products.forEach(p => {
      categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrdersCount,
        activeProductsCount,
        totalProductsCount: products.length,
        lowStockCount: lowStockProducts.length,
        categoryBreakdown,
        recentOrders: orders.slice(0, 5)
      }
    });
  });

  // 15. Contact feedback submission
  app.post('/api/contact', (req, res) => {
    const { name, phone, message } = req.body;
    console.log(`[Contact Form Received] Name: ${name}, Phone: ${phone}, Message: ${message}`);
    res.json({ success: true, message: 'Xabaringiz qabul qilindi. Tez orada siz bilan bog\'lanamiz!' });
  });

  // 16. AI Assistant search / recommendation (Powered by Google Gemini)
  app.post('/api/ai/assistant', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ success: false, error: 'Query is required' });
      }

      // If Gemini API key is available
      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const catalogContext = products.map(p => ({
          id: p.id,
          name: p.name,
          category: p.categoryName,
          price: p.price,
          brand: p.brand,
          description: p.description
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Siz O'zbekistondagi zamonaviy online do'konning do'stona va professional AI maslahatchisisiz.
Mijoz savoli: "${query}".
Do'kondagi mavjud mahsulotlar ro'yxati (JSON): ${JSON.stringify(catalogContext)}.
Mijozga do'stona, o'zbek tilida aniq javob bering, kerakli tovarlarni tavsiya qiling va narxlarini ko'rsating. Javob ixcham va chiroyli formatlangan bo'lsin.`
        });

        return res.json({ success: true, reply: response.text });
      }

      // Fallback smart response if no key
      const qLower = String(query).toLowerCase();
      const matched = products.filter(p =>
        p.name.toLowerCase().includes(qLower) ||
        p.category.toLowerCase().includes(qLower) ||
        p.brand.toLowerCase().includes(qLower)
      );

      const reply = matched.length > 0
        ? `Sizning so'rovingiz bo'yicha ${matched.length} ta mahsulot topildi: ${matched.slice(0, 3).map(m => `"${m.name}" (${m.price.toLocaleString()} so'm)`).join(', ')}. Xarid qilish uchun savatchaga qo'shishingiz mumkin!`
        : `Do'konimizda siz qidirgan tovarlar bo'yicha smartfonlar, noutbuklar, kiyim-kechak va audio gadjetlar mavjud. Katalog bo'limidan barchasini ko'rishingiz mumkin.`;

      res.json({ success: true, reply });
    } catch (err: any) {
      console.error('AI assistant error:', err);
      res.status(500).json({ success: false, error: 'AI serverda xatolik yuz berdi' });
    }
  });

  // 17. Auth: Register
  app.post('/api/auth/register', (req, res) => {
    try {
      const { fullName, email, phone, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: "Ism, email va parol kiritilishi shart" });
      }

      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(409).json({ success: false, message: "Ushbu email bilan allaqachon ro'yxatdan o'tilgan" });
      }

      const newUser: User & { password?: string } = {
        id: `usr-${Date.now()}`,
        fullName,
        email,
        phone: phone || '',
        password,
        role: 'user',
        bonusPoints: 50000,
        createdAt: new Date().toISOString().split('T')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
        addresses: []
      };

      users.unshift(newUser);
      const { password: _, ...safeUser } = newUser;

      res.status(201).json({
        success: true,
        message: "Muvaffaqiyatli ro'yxatdan o'tdingiz va 50 000 so'm xush kelibsiz bonusi berildi!",
        user: safeUser,
        token: `token_${safeUser.id}_${Date.now()}`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Serverda xatolik yuz berdi" });
    }
  });

  // 18. Auth: Login
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email va parol talab qilinadi" });
      }

      const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() || 
        (u.phone && u.phone.replace(/\D/g, '') === email.replace(/\D/g, ''))
      );

      if (!user) {
        return res.status(401).json({ success: false, message: "Bunday email yoki telefon bilan foydalanuvchi topilmadi" });
      }

      if (user.password && user.password !== password) {
        return res.status(401).json({ success: false, message: "Parol noto'g'ri kiritildi" });
      }

      const { password: _, ...safeUser } = user;

      res.json({
        success: true,
        message: "Tizimga muvaffaqiyatli kirdingiz",
        user: safeUser,
        token: `token_${safeUser.id}_${Date.now()}`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Serverda xatolik yuz berdi" });
    }
  });

  // 19. Auth: Get Current User (Me)
  app.get('/api/auth/me', (req, res) => {
    const userId = (req.query.userId as string) || (users[0]?.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  });

  // 20. Auth: Update Profile
  app.put('/api/auth/profile', (req, res) => {
    try {
      const { id, ...updates } = req.body;
      if (!id) {
        return res.status(400).json({ success: false, message: "Foydalanuvchi ID talab qilinadi" });
      }

      const index = users.findIndex(u => u.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: "Foydalanuvchi topilmadi" });
      }

      users[index] = { ...users[index], ...updates, id };
      const { password: _, ...safeUser } = users[index];

      res.json({
        success: true,
        message: "Profil muvaffaqiyatli yangilandi",
        user: safeUser
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Serverda xatolik yuz berdi" });
    }
  });

  // 21. Auth: List Users (Admin)
  app.get('/api/auth/users', (req, res) => {
    const safeUsers = users.map(({ password, ...u }) => u);
    res.json({ success: true, users: safeUsers });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 E-Commerce Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
