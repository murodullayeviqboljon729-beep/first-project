import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Ism, email va parol kiritilishi shart" },
        { status: 400 }
      );
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Ushbu email bilan ro'yxatdan o'tilgan" },
        { status: 409 }
      );
    }

    const newUser = db.createUser({
      fullName,
      email,
      phone: phone || '',
      password,
      role: 'user',
      bonusPoints: 50000,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
      addresses: []
    });

    return NextResponse.json({
      success: true,
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz va 50 000 bonus taqdim etildi!",
      user: newUser,
      token: `token_${newUser.id}_${Date.now()}`
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
