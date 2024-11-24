import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../../all/route';


export async function PUT(req: NextRequest) {
  try {
    const { id, text } = await req.json();
    const updatedRecord = await prisma.posts.update({
        where: { id: Number(id) },
        data: { text },
      }) as Post;
      return NextResponse.json(updatedRecord)
    } 
  catch (error) {
    console.error('Ошибка при редактировании заметки:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при редактировании заметки: ' + error,
      },
      { status: 500 },
    );
  }
}