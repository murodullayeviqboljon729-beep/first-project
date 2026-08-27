import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'usr-1';
    
    const user = db.getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
