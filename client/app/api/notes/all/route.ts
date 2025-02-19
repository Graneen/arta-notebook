import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface Post {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET(req: NextRequest) {
  try {
    const userId = Number(req.headers.get('x-user-id'));
    
    const posts = await prisma.posts.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Ошибка при получении списка заметок:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении списка заметок' },
      { status: 500 }
    );
  }
}
