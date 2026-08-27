import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { PromoCode } from '@/lib/types';

// GET /api/promos - List promo codes
export async function GET() {
  try {
    const promos = db.getPromoCodes();
    return NextResponse.json({ success: true, data: promos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/promos - Create promo code (Admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.code || !body.discountPercent) {
      return NextResponse.json({ success: false, error: 'Code and discountPercent are required' }, { status: 400 });
    }

    const newPromo: PromoCode = {
      id: `promo-${Date.now()}`,
      code: body.code.toUpperCase().trim(),
      discountPercent: Number(body.discountPercent),
      minOrderAmount: Number(body.minOrderAmount) || 0,
      isActive: true,
      usageCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    const saved = db.addPromoCode(newPromo);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
