import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Product } from '@/lib/types';

// GET /api/products - List products with filter, search, sort, pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const isFlashSale = searchParams.get('isFlashSale');
    const isFeatured = searchParams.get('isFeatured');
    const isNew = searchParams.get('isNew');
    const sort = searchParams.get('sort');
    const limit = searchParams.get('limit');

    let items = [...db.getProducts()];

    if (category && category !== 'all') {
      items = items.filter(p => p.category === category);
    }

    if (brand) {
      items = items.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      items = items.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      items = items.filter(p => p.price <= Number(maxPrice));
    }

    if (inStock === 'true') {
      items = items.filter(p => p.inStock && p.stockCount > 0);
    }

    if (isFlashSale === 'true') {
      items = items.filter(p => p.isFlashSale);
    }

    if (isFeatured === 'true') {
      items = items.filter(p => p.isFeatured);
    }

    if (isNew === 'true') {
      items = items.filter(p => p.isNew);
    }

    // Sorting
    if (sort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
      items.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else {
      items.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    if (limit) {
      items = items.slice(0, Number(limit));
    }

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (Admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Product name and price are required' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      ...body,
      id: body.id || `prod-${Date.now()}`,
      images: body.images || [],
      features: body.features || [],
      specs: body.specs || {},
      tags: body.tags || [],
      rating: body.rating || 5.0,
      reviewsCount: body.reviewsCount || 0,
      inStock: body.inStock ?? true,
      stockCount: Number(body.stockCount) || 1
    };

    const created = db.addProduct(newProduct);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
