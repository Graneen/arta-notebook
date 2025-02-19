import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const userId = Number(req.headers.get('x-user-id'));
    const { id } = await req.json();

    const post = await prisma.posts.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Заметка не найдена или у вас нет прав на её удаление' },
        { status: 404 }
      );
    }
    await prisma.posts.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json(id);
  } catch (error) {
    console.error('Ошибка при удалении заметки:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении заметки' },
      { status: 500 }
    );
  }
}