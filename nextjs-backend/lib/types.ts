export interface Product {
  id: string;
  name: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'watches' | 'clothing' | 'home' | 'beauty' | 'sports';
  categoryName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'kutilmoqda' | 'tayyorlanmoqda' | 'yolda' | 'yetkazildi' | 'bekor_qilindi';
  paymentMethod: 'click' | 'payme' | 'uzumpay' | 'cash' | 'card_delivery';
  deliveryType: 'standard' | 'express';
  customer: {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    address: string;
    note?: string;
  };
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  minOrderAmount?: number;
  isActive: boolean;
  usageCount: number;
  createdDate: string;
}

export interface UserAddress {
  id: string;
  title: string;
  city: string;
  district: string;
  address: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  password?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  addresses?: UserAddress[];
  bonusPoints?: number;
}

