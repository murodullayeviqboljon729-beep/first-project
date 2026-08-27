import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
    }

    const products = db.getProducts();

    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const catalogSummary = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.categoryName,
        price: p.price,
        brand: p.brand
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Siz zamonaviy online do'konning aqlli AI maslahatchisisiz.
Mijoz savoli: "${query}".
Do'kondagi tovarlar: ${JSON.stringify(catalogSummary)}.
O'zbek tilida do'stona va aniq javob bering, mos tovarlarni narxlari bilan tavsiya eting.`
      });

      return NextResponse.json({ success: true, reply: response.text });
    }

    // Fallback response
    const qLower = String(query).toLowerCase();
    const matched = products.filter(p =>
      p.name.toLowerCase().includes(qLower) ||
      p.category.toLowerCase().includes(qLower) ||
      p.brand.toLowerCase().includes(qLower)
    );

    const reply = matched.length > 0
      ? `Sizning so'rovingiz bo'yicha ${matched.length} ta mahsulot topildi: ${matched.slice(0, 3).map(m => `"${m.name}" (${m.price.toLocaleString()} so'm)`).join(', ')}.`
      : `Do'konimizda smartfonlar, noutbuklar, kiyim va audio texnikalar mavjud. Katalog bo'limidan ko'rishingiz mumkin.`;

    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
