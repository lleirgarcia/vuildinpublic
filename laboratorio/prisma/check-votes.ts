import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verificando votos en la base de datos...\n');

  try {
    const votes = await prisma.vote.findMany({
      include: {
        poll: {
          include: {
            comment: true,
          },
        },
      },
    });

    console.log(`Total de votos: ${votes.length}\n`);

    if (votes.length > 0) {
      console.log('Votos encontrados:');
      votes.forEach((vote, index) => {
        console.log(`\n${index + 1}. Voto ID: ${vote.id}`);
        console.log(`   Poll: ${vote.poll.title}`);
        console.log(`   Usuario: @${vote.tiktokHandle}`);
        console.log(`   Fecha: ${vote.createdAt}`);
      });
    } else {
      console.log('✅ No hay votos en la base de datos');
    }

    // También verificar polls
    const polls = await prisma.poll.findMany({
      include: {
        _count: {
          select: { votes: true },
        },
      },
    });

    console.log(`\n\nTotal de polls: ${polls.length}`);
    polls.forEach((poll) => {
      console.log(`\n- ${poll.title}: ${poll._count.votes} votos`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

