import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const postsData = [
            {
                id: 555,
                text: 'ну что тут',
                createdAt: '2024-11-22 10:23:48',
                updatedAt: '2024-11-22 10:23:48',
              },
              {
                id: 556,
                text: 'с какой целью интересуешься?',
                createdAt: '2024-11-22 10:23:48',
                updatedAt: '2024-11-22 10:23:48',
              },
  ];

  try {
    await prisma.posts.upsert({
      data: postsData,
    });
    
    console.log('Posts seeded successfully.');
  } catch (error) {
    console.error('There was an error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error).finally(() => process.exit());