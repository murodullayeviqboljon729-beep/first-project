import { Product, Order, PromoCode, User } from '../types';

const BASE_URL = '/api';

export const api = {
  // Auth
  async login(emailOrPhone: string, password?: string): Promise<{ success: boolean; message?: string; user?: User; token?: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, password })
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err.message || 'Tarmoq xatosi' };
    }
  },

  async register(data: { fullName: string; email: string; phone?: string; password?: string }): Promise<{ success: boolean; message?: string; user?: User; token?: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err.message || 'Tarmoq xatosi' };
    }
  },

  async getMe(userId?: string): Promise<{ success: boolean; user?: User }> {
    try {
      const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
      const res = await fetch(`${BASE_URL}/auth/me${query}`);
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false };
    }
  },

  async updateProfile(id: string, updates: Partial<User>): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err.message || 'Tarmoq xatosi' };
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const res = await fetch(`${BASE_URL}/auth/users`);
      const json = await res.json();
      return json.users || [];
    } catch {
      return [];
    }
  },
  // Products
  async getProducts(params?: {
    category?: string;
    brand?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sort?: string;
  }): Promise<{ success: boolean; data: Product[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'all') query.append('category', params.category);
      if (params?.brand) query.append('brand', params.brand);
      if (params?.search) query.append('search', params.search);
      if (params?.minPrice) query.append('minPrice', String(params.minPrice));
      if (params?.maxPrice) query.append('maxPrice', String(params.maxPrice));
      if (params?.inStock) query.append('inStock', 'true');
      if (params?.sort) query.append('sort', params.sort);

      const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.warn('API getProducts fallback to local:', err);
      return { success: false, data: [], total: 0 };
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  async createProduct(product: Partial<Product>): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Failed to create product');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('API createProduct error:', err);
      return null;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update product');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('API updateProduct error:', err);
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async createOrder(orderData: any): Promise<Order | null> {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error('Failed to create order');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('API createOrder error:', err);
      return null;
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Promos
  async getPromos(): Promise<PromoCode[]> {
    try {
      const res = await fetch(`${BASE_URL}/promos`);
      if (!res.ok) throw new Error('Failed to fetch promos');
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  async validatePromo(code: string, cartTotal: number): Promise<{ success: boolean; data?: PromoCode; error?: string }> {
    try {
      const res = await fetch(`${BASE_URL}/promos/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal })
      });
      const json = await res.json();
      return json;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // AI Assistant
  async askAiAssistant(query: string): Promise<string> {
    try {
      const res = await fetch(`${BASE_URL}/ai/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const json = await res.json();
      return json.reply || '';
    } catch {
      return '';
    }
  }
};
