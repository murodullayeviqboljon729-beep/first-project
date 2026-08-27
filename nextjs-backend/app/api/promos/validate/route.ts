import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json({ success: false, error: 'Promokod kiritilmadi' }, { status: 400 });
    }

    const promo = db.getPromoByCode(code);

    if (!promo || !promo.isActive) {
      return NextResponse.json(
        { success: false, error: 'Yaroqsiz yoki muddati o\'tgan promokod' },
        { status: 404 }
      );
    }

    if (promo.minOrderAmount && Number(cartTotal) < promo.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Ushbu promokod faqat minimal ${promo.minOrderAmount.toLocaleString()} so'mlik xaridlar uchun amal qiladi`
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: promo });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
