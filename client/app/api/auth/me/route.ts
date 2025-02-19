import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/lib/jwt';

// Правильная инициализация PrismaClient как глобальной переменной
const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Токен не предоставлен' },
        { status: 401 }
      );
    }

    const payload = await verifyJWT(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return NextResponse.json(
      { error: 'Ошибка авторизации' },
      { status: 401 }
    );
  }
}
