import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Order } from '@/lib/types';

// GET /api/orders - List all orders (Admin)
export async function GET() {
  try {
    const orders = db.getOrders();
    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/orders - Place a new customer order (Checkout)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.items || !body.items.length || !body.customer?.fullName || !body.customer?.phone) {
      return NextResponse.json(
        { success: false, error: 'Xaridor ma\'lumotlari yoki savatdagi tovarlar to\'liq emas' },
        { status: 400 }
      );
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      deliveryFee: Number(body.deliveryFee) || 0,
      total: Number(body.total) || 0,
      status: 'kutilmoqda',
      paymentMethod: body.paymentMethod || 'cash',
      deliveryType: body.deliveryType || 'standard',
      customer: {
        fullName: body.customer.fullName,
        phone: body.customer.phone,
        city: body.customer.city || 'Toshkent',
        district: body.customer.district || '',
        address: body.customer.address || '',
        note: body.customer.note || ''
      }
    };

    // Decrement stock for ordered items
    newOrder.items.forEach(item => {
      const prod = db.getProductById(item.productId);
      if (prod) {
        const remaining = Math.max(0, prod.stockCount - item.quantity);
        db.updateProduct(item.productId, {
          stockCount: remaining,
          inStock: remaining > 0
        });
      }
    });

    const savedOrder = db.addOrder(newOrder);
    return NextResponse.json({ success: true, data: savedOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
