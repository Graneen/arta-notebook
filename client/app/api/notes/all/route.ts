import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export interface Post {
  id: number;
  text: string;
}


export async function GET() {
  try {
    const posts = (await prisma.posts.findMany({
      select: {
        id: true,
        text: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as Post[];

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Ошибка при получении списка заметок:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении списка заметок: ' + error },
      { status: 500 },
    );
  }

}
