import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../all/route';

export async function POST(req: NextRequest) {
  try {
    const userId = Number(req.headers.get('x-user-id'));
    const { text } = await req.json();
    
    const resPost = await prisma.posts.create({
      data: {
        text,
        userId
      },
    }) as unknown as Post;
    
    return NextResponse.json(resPost);
  } catch (error) {
    console.error('Ошибка при создании заметки:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании заметки' },
      { status: 500 }
    );
  }
}
