import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '../all/route';


export async function POST(req: NextRequest) {
  try {
    const postData = await req.json();
    console.log(postData)
      const resPost = (await prisma.posts.create({
        data: postData,
      })) as Post;
      return NextResponse.json(resPost)
    }
  catch (error) {
    console.error('Ошибка при создании заметки:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при создании заметки: ' + error,
      },
      { status: 500 },
    );
  }
}
