import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpiando votos de proyectos...\n');

  try {
    // Contar votos antes de eliminar
    const voteCount = await prisma.vote.count();
    console.log(`   - Votos encontrados: ${voteCount}`);

    if (voteCount === 0) {
      console.log('   ℹ️  No hay votos para eliminar');
      return;
    }

    // Mostrar detalles de los votos antes de eliminar
    const votes = await prisma.vote.findMany({
      include: {
        poll: {
          select: { title: true },
        },
      },
    });

    console.log('\n   Votos a eliminar:');
    votes.forEach((vote, index) => {
      console.log(`   ${index + 1}. Poll: "${vote.poll.title}" - Usuario: @${vote.tiktokHandle}`);
    });

    // Eliminar todos los votos
    const result = await prisma.vote.deleteMany({});

    console.log(`\n✅ ${result.count} votos eliminados exitosamente`);

    // Verificar que se eliminaron
    const remainingVotes = await prisma.vote.count();
    if (remainingVotes === 0) {
      console.log('✅ Confirmado: No quedan votos en la base de datos');
    } else {
      console.log(`⚠️  Advertencia: Aún quedan ${remainingVotes} votos`);
    }
  } catch (error) {
    console.error('❌ Error limpiando votos:', error);
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

