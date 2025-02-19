import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const testUser = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: await bcrypt.hash('test123', 10),
        name: 'Тестовый пользователь',
      },
    });

    await prisma.posts.deleteMany();

    const mockNotes = [
      {
        text: 'Купить продукты на неделю',
        createdAt: new Date('2024-03-20 10:00:00'),
        updatedAt: new Date('2024-03-20 10:00:00'),
        userId: testUser.id,
      },
      {
        text: 'Позвонить маме',
        createdAt: new Date('2024-03-20 11:15:00'),
        updatedAt: new Date('2024-03-20 11:15:00'),
        userId: testUser.id,
      },
      {
        text: 'Записаться к врачу',
        createdAt: new Date('2024-03-20 12:30:00'),
        updatedAt: new Date('2024-03-20 12:30:00'),
        userId: testUser.id,
      },
      {
        text: 'Оплатить счета',
        createdAt: new Date('2024-03-20 14:45:00'),
        updatedAt: new Date('2024-03-20 14:45:00'),
        userId: testUser.id,
      },
      {
        text: 'Подготовить отчет',
        createdAt: new Date('2024-03-20 16:00:00'),
        updatedAt: new Date('2024-03-20 16:00:00'),
        userId: testUser.id,
      }
    ];

    for (const note of mockNotes) {
      await prisma.posts.create({
        data: note,
      });
    }
  } catch (error) {
    console.error('Ошибка при сидировании:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
