import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.posts.create({
    data: {
                        id: 555,
                        text: 'ну что тут',
                        createdAt: '2024-11-22 10:23:48',
                        updatedAt: '2024-11-22 10:23:48',
                      },
  });

  console.log('Seeding successful');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
