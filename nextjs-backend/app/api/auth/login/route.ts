import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email va parol kiritilishi shart" },
        { status: 400 }
      );
    }

    const user = db.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    if (user.password && user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Email yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirdingiz",
      user: safeUser,
      token: `token_${safeUser.id}_${Date.now()}`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
