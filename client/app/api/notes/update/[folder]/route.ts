import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../../all/route';

export async function PUT(req: NextRequest) {
  try {
    const userId = Number(req.headers.get('x-user-id'));
    const { id, text } = await req.json();

    const post = await prisma.posts.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Заметка не найдена или у вас нет прав на её редактирование' },
        { status: 404 }
      );
    }

    const updatedRecord = await prisma.posts.update({
      where: { id: Number(id) },
      data: { text }
    }) as unknown as Post;

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error('Ошибка при редактировании заметки:', error);
    return NextResponse.json(
      { error: 'Ошибка при редактировании заметки' },
      { status: 500 }
    );
  }
}