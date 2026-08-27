import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = db.getOrders();
    const products = db.getProducts();

    const totalRevenue = orders
      .filter(o => o.status !== 'bekor_qilindi')
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrdersCount = orders.length;
    const activeProductsCount = products.filter(p => p.inStock).length;
    const lowStockCount = products.filter(p => p.stockCount <= 5).length;

    const categoryBreakdown: Record<string, number> = {};
    products.forEach(p => {
      categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrdersCount,
        activeProductsCount,
        totalProductsCount: products.length,
        lowStockCount,
        categoryBreakdown,
        recentOrders: orders.slice(0, 5)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
