import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Foydalanuvchi ID talab qilinadi" },
        { status: 400 }
      );
    }

    const updatedUser = db.updateUser(id, updates);
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profil muvaffaqiyatli yangilandi",
      user: updatedUser
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
