import { prisma } from '../lib/prisma';

/**
 * Script para actualizar las estadísticas sociales calculando
 * el crecimiento mensual y semanal comparando con valores anteriores.
 * 
 * Uso: tsx scripts/update-social-stats.ts <totalFollowers>
 * Ejemplo: tsx scripts/update-social-stats.ts 125000
 */
async function updateSocialStats() {
  // Obtener el valor actual de seguidores desde los argumentos
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Debes proporcionar el número actual de seguidores');
    console.log('Uso: tsx scripts/update-social-stats.ts <totalFollowers>');
    console.log('Ejemplo: tsx scripts/update-social-stats.ts 125000');
    process.exit(1);
  }

  const currentFollowers = parseInt(args[0], 10);
  
  if (isNaN(currentFollowers) || currentFollowers < 0) {
    console.error('❌ Error: El número de seguidores debe ser un número válido');
    process.exit(1);
  }

  console.log(`📊 Actualizando estadísticas sociales...`);
  console.log(`   Seguidores actuales: ${currentFollowers.toLocaleString()}`);

  try {
    // Obtener el registro actual de SocialStat (o crear uno si no existe)
    // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
    let socialStat = await prisma.socialStat.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    const startDate = socialStat?.startDate ?? new Date('2024-01-01');

    // Buscar snapshot del mes anterior (hace ~30 días)
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    
    // @ts-expect-error - socialStatSnapshot existe en Prisma Client pero TypeScript no lo reconoce aún
    const monthlySnapshot = await prisma.socialStatSnapshot.findFirst({
      where: {
        createdAt: {
          lte: oneMonthAgo,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Buscar snapshot de la semana anterior (hace ~7 días)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // @ts-expect-error - socialStatSnapshot existe en Prisma Client pero TypeScript no lo reconoce aún
    const weeklySnapshot = await prisma.socialStatSnapshot.findFirst({
      where: {
        createdAt: {
          lte: oneWeekAgo,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calcular crecimiento mensual
    let monthlyGrowth = 0;
    if (monthlySnapshot && monthlySnapshot.totalFollowers > 0) {
      const difference = currentFollowers - monthlySnapshot.totalFollowers;
      monthlyGrowth = (difference / monthlySnapshot.totalFollowers) * 100;
      console.log(`   Seguidores hace 1 mes: ${monthlySnapshot.totalFollowers.toLocaleString()}`);
      console.log(`   Crecimiento mensual: ${monthlyGrowth.toFixed(2)}%`);
    } else {
      console.log(`   ⚠️  No hay datos del mes anterior, crecimiento mensual será 0%`);
    }

    // Calcular crecimiento semanal
    let weeklyGrowth = 0;
    if (weeklySnapshot && weeklySnapshot.totalFollowers > 0) {
      const difference = currentFollowers - weeklySnapshot.totalFollowers;
      weeklyGrowth = (difference / weeklySnapshot.totalFollowers) * 100;
      console.log(`   Seguidores hace 1 semana: ${weeklySnapshot.totalFollowers.toLocaleString()}`);
      console.log(`   Crecimiento semanal: ${weeklyGrowth.toFixed(2)}%`);
    } else {
      console.log(`   ⚠️  No hay datos de la semana anterior, crecimiento semanal será 0%`);
    }

    // Crear un nuevo snapshot con el valor actual
    // @ts-expect-error - socialStatSnapshot existe en Prisma Client pero TypeScript no lo reconoce aún
    await prisma.socialStatSnapshot.create({
      data: {
        totalFollowers: currentFollowers,
      },
    });
    console.log(`   ✅ Snapshot creado con ${currentFollowers.toLocaleString()} seguidores`);

    // Actualizar o crear el registro principal de SocialStat
    if (socialStat) {
      // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
      await prisma.socialStat.update({
        where: { id: socialStat.id },
        data: {
          totalFollowers: currentFollowers,
          monthlyGrowth: monthlyGrowth,
          weeklyGrowth: weeklyGrowth,
        },
      });
      console.log(`   ✅ Estadísticas actualizadas en la base de datos`);
    } else {
      // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
      await prisma.socialStat.create({
        data: {
          totalFollowers: currentFollowers,
          monthlyGrowth: monthlyGrowth,
          weeklyGrowth: weeklyGrowth,
          startDate: startDate,
        },
      });
      console.log(`   ✅ Nuevo registro de estadísticas creado en la base de datos`);
    }

    console.log(`\n✅ Proceso completado exitosamente`);
    console.log(`   - Seguidores totales: ${currentFollowers.toLocaleString()}`);
    console.log(`   - Crecimiento mensual: ${monthlyGrowth >= 0 ? '+' : ''}${monthlyGrowth.toFixed(2)}%`);
    console.log(`   - Crecimiento semanal: ${weeklyGrowth >= 0 ? '+' : ''}${weeklyGrowth.toFixed(2)}%`);

  } catch (error) {
    console.error('❌ Error al actualizar estadísticas:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
updateSocialStats();

