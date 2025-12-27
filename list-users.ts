import { prisma } from './lib/prisma';

async function listUsers() {
  try {
    console.log('🔍 Buscando usuarios en la base de datos...\n');
    
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        accounts: {
          select: {
            id: true,
            provider: true,
            providerAccountId: true,
            type: true,
          },
        },
        sessions: {
          select: {
            id: true,
            expires: true,
            sessionToken: true,
          },
          orderBy: { expires: 'desc' },
          take: 1, // Solo la sesión más reciente
        },
        _count: {
          select: {
            accounts: true,
            sessions: true,
            comments: true,
            messages: true,
            votes: true,
          },
        },
      },
    });

    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos.\n');
      return;
    }

    console.log(`✅ Encontrados ${users.length} usuario(s):\n`);
    console.log('═'.repeat(80));

    users.forEach((user, index) => {
      console.log(`\n👤 Usuario #${index + 1}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email || 'Sin email'}`);
      console.log(`   Nombre: ${user.name || 'Sin nombre'}`);
      console.log(`   Username: ${user.username || 'Sin username'}`);
      console.log(`   Creado: ${user.createdAt.toISOString()}`);
      console.log(`   Actualizado: ${user.updatedAt.toISOString()}`);
      
      if (user.accounts.length > 0) {
        console.log(`\n   🔗 Cuentas OAuth (${user.accounts.length}):`);
        user.accounts.forEach((account, i) => {
          console.log(`      ${i + 1}. ${account.provider} (${account.type}) - ID: ${account.providerAccountId}`);
        });
      } else {
        console.log(`\n   🔗 Cuentas OAuth: Ninguna`);
      }

      if (user.sessions.length > 0) {
        const latestSession = user.sessions[0];
        const isExpired = latestSession.expires < new Date();
        console.log(`\n   📋 Sesión más reciente:`);
        console.log(`      ID: ${latestSession.id}`);
        console.log(`      Token: ${latestSession.sessionToken.substring(0, 20)}...`);
        console.log(`      Expira: ${latestSession.expires.toISOString()} ${isExpired ? '(EXPIRADA)' : '(ACTIVA)'}`);
      } else {
        console.log(`\n   📋 Sesiones: Ninguna`);
      }

      console.log(`\n   📊 Estadísticas:`);
      console.log(`      - Cuentas: ${user._count.accounts}`);
      console.log(`      - Sesiones: ${user._count.sessions}`);
      console.log(`      - Comentarios: ${user._count.comments}`);
      console.log(`      - Mensajes: ${user._count.messages}`);
      console.log(`      - Votos: ${user._count.votes}`);

      if (index < users.length - 1) {
        console.log('\n' + '─'.repeat(80));
      }
    });

    console.log('\n' + '═'.repeat(80));
    console.log(`\n✅ Total: ${users.length} usuario(s)\n`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack:', error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();

