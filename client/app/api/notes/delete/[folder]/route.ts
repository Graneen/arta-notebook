import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../../all/route';


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.posts.delete({
        where: { id: Number(id) },
      }) as Post;
      return NextResponse.json(id)
    } 
  catch (error) {
    console.error('Ошибка при удалении заметки:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при удалении заметки: ' + error,
      },
      { status: 500 },
    );
  }
}