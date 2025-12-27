import { prisma } from './lib/prisma';

async function verificar() {
  try {
    console.log('🔍 Verificando conexión a la base de datos...');
    
    // Verificar conexión
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');
    
    // Verificar tablas de NextAuth
    const users = await prisma.user.findMany({ take: 1 });
    console.log(`✅ Tabla User existe (${users.length} usuarios encontrados)`);
    
    try {
      const sessions = await prisma.session.findMany({ take: 1 });
      console.log(`✅ Tabla Session existe (${sessions.length} sesiones encontradas)`);
    } catch (e) {
      console.error('❌ Tabla Session no existe o hay un error:', e);
    }
    
    try {
      const accounts = await prisma.account.findMany({ take: 1 });
      console.log(`✅ Tabla Account existe (${accounts.length} cuentas encontradas)`);
    } catch (e) {
      console.error('❌ Tabla Account no existe o hay un error:', e);
    }
    
    // Verificar usuarios recientes
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    
    console.log('\n📋 Usuarios recientes:');
    if (recentUsers.length === 0) {
      console.log('   No hay usuarios en la base de datos');
    } else {
      recentUsers.forEach((user, i) => {
        console.log(`   ${i + 1}. ${user.name || user.email || 'Sin nombre'} (${user.email || 'Sin email'}) - ${user.createdAt.toISOString()}`);
      });
    }
    
    // Verificar sesiones recientes
    try {
      const recentSessions = await prisma.session.findMany({
        orderBy: { expires: 'desc' },
        take: 5,
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      
      console.log('\n📋 Sesiones recientes:');
      if (recentSessions.length === 0) {
        console.log('   No hay sesiones en la base de datos');
      } else {
        recentSessions.forEach((session, i) => {
          const expires = session.expires < new Date() ? 'EXPIRADA' : session.expires.toISOString();
          console.log(`   ${i + 1}. Usuario: ${session.user.name || session.user.email} - Expira: ${expires}`);
        });
      }
    } catch (e) {
      console.log('\n❌ No se pudo consultar sesiones:', e);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verificar();

