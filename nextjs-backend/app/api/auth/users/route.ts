import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = db.getUsers();
    return NextResponse.json({
      success: true,
      users
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
