import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = db.getProducts();
    const categoryCounts: Record<string, number> = { all: products.length };

    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categories = [
      { id: 'all', name: 'Barcha toifalar', icon: 'LayoutGrid', count: categoryCounts['all'] || 0 },
      { id: 'smartphones', name: 'Smartfonlar va Gadjetlar', icon: 'Smartphone', count: categoryCounts['smartphones'] || 0 },
      { id: 'laptops', name: 'Noutbuklar va Kompyuterlar', icon: 'Laptop', count: categoryCounts['laptops'] || 0 },
      { id: 'audio', name: 'Audio va Quloqchinlar', icon: 'Headphones', count: categoryCounts['audio'] || 0 },
      { id: 'watches', name: 'Aqlli soatlar', icon: 'Watch', count: categoryCounts['watches'] || 0 },
      { id: 'clothing', name: 'Kiyim va Poyabzal', icon: 'Shirt', count: categoryCounts['clothing'] || 0 },
      { id: 'home', name: 'Uy va Maishiy texnika', icon: 'Home', count: categoryCounts['home'] || 0 },
      { id: 'sports', name: 'Sport va Sayohat', icon: 'Activity', count: categoryCounts['sports'] || 0 },
    ];

    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
