import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Barcha maydonlarni to\'ldiring' }, { status: 400 });
    }

    // Here you can send Telegram Bot notification / Email / SMS:
    console.log(`[Next.js API Contact Message] From: ${name} (${phone}) - ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Xabaringiz qabul qilindi. Operatorimiz tez orada siz bilan bog\'lanadi!'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
