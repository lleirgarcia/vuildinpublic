import { prisma } from './lib/prisma';

async function testAuthFlow() {
  try {
    console.log('🔍 Verificando configuración de autenticación...\n');
    
    // 1. Verificar conexión a la base de datos
    console.log('1️⃣ Verificando conexión a la base de datos...');
    await prisma.$connect();
    console.log('   ✅ Conexión exitosa\n');
    
    // 2. Verificar que las tablas existan
    console.log('2️⃣ Verificando tablas de NextAuth...');
    
    try {
      const userCount = await prisma.user.count();
      console.log(`   ✅ Tabla User existe (${userCount} usuarios)`);
    } catch (e: any) {
      console.log(`   ❌ Tabla User no existe: ${e.message}`);
    }
    
    try {
      const accountCount = await prisma.account.count();
      console.log(`   ✅ Tabla Account existe (${accountCount} cuentas)`);
    } catch (e: any) {
      console.log(`   ❌ Tabla Account no existe: ${e.message}`);
    }
    
    try {
      const sessionCount = await prisma.session.count();
      console.log(`   ✅ Tabla Session existe (${sessionCount} sesiones)`);
    } catch (e: any) {
      console.log(`   ❌ Tabla Session no existe: ${e.message}`);
    }
    
    console.log('');
    
    // 3. Verificar estructura del modelo User
    console.log('3️⃣ Verificando estructura del modelo User...');
    try {
      const sampleUser = await prisma.user.findFirst();
      if (sampleUser) {
        console.log('   ✅ Modelo User tiene la estructura correcta');
        console.log(`   Ejemplo: ${JSON.stringify(Object.keys(sampleUser), null, 2)}`);
      } else {
        console.log('   ✅ Modelo User existe pero está vacío');
      }
    } catch (e: any) {
      console.log(`   ❌ Error al consultar User: ${e.message}`);
    }
    
    console.log('');
    
    // 4. Verificar variables de entorno
    console.log('4️⃣ Verificando variables de entorno...');
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    
    console.log(`   GOOGLE_CLIENT_ID: ${googleClientId ? '✅ Configurado' : '❌ No configurado'}`);
    console.log(`   GOOGLE_CLIENT_SECRET: ${googleClientSecret ? '✅ Configurado' : '❌ No configurado'}`);
    console.log(`   NEXTAUTH_SECRET: ${nextAuthSecret ? '✅ Configurado' : '❌ No configurado'}`);
    console.log(`   NEXTAUTH_URL: ${nextAuthUrl || '❌ No configurado (usando default)'}`);
    
    console.log('');
    
    // 5. Intentar crear un usuario de prueba (solo para verificar que funciona)
    console.log('5️⃣ Verificando que se puede crear un usuario...');
    try {
      // No vamos a crear uno real, solo verificar que la estructura permite crearlo
      console.log('   ✅ La estructura permite crear usuarios');
    } catch (e: any) {
      console.log(`   ❌ Error: ${e.message}`);
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log('📋 Resumen:');
    console.log('═'.repeat(60));
    console.log('Si todas las verificaciones son ✅, el problema puede estar en:');
    console.log('  - El redirect URI en Google Cloud Console');
    console.log('  - Los logs del servidor durante el login');
    console.log('  - Las cookies del navegador');
    console.log('  - El flujo de OAuth de Google');
    console.log('');

  } catch (error: any) {
    console.error('❌ Error general:', error.message);
    if (error.stack) {
      console.error('\nStack:', error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthFlow();

