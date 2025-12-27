import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import type { Adapter } from 'next-auth/adapters';

// Validar variables de entorno
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.error('❌ ERROR: Google OAuth no configurado.');
  console.error('   Añade al archivo .env.local:');
  console.error('   GOOGLE_CLIENT_ID="tu-client-id"');
  console.error('   GOOGLE_CLIENT_SECRET="tu-client-secret"');
  console.error('   NEXTAUTH_URL="http://localhost:3001"');
  console.error('   NEXTAUTH_SECRET="genera-un-secret"');
}

if (!nextAuthSecret) {
  console.warn('⚠️  NEXTAUTH_SECRET no configurado. Genera uno con: openssl rand -base64 32');
}

// Log de configuración al iniciar
console.log('🔧 NextAuth Config:', {
  hasClientId: !!googleClientId,
  hasClientSecret: !!googleClientSecret,
  hasSecret: !!nextAuthSecret,
  nextAuthUrl,
  providersCount: googleClientId && googleClientSecret ? 1 : 0,
});

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: googleClientId && googleClientSecret ? [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          redirect_uri: `${nextAuthUrl}/api/auth/callback/google`,
        },
      },
    }),
  ] : [],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Permitir siempre el sign in
      // El PrismaAdapter maneja automáticamente:
      // - Crear usuario si no existe
      // - Vincular cuenta si no está vinculada
      // - Crear sesión
      console.log('🔐 SignIn callback:', {
        email: user.email,
        name: user.name,
        provider: account?.provider,
      });
      return true;
    },
    async session({ session, user }) {
      // Añadir el ID del usuario a la sesión
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      console.log('✅ Usuario creado:', { id: user.id, email: user.email, name: user.name });
    },
    async linkAccount({ account, user }) {
      console.log('✅ Cuenta vinculada:', { userId: user.id, provider: account.provider });
    },
    async signIn({ user, account, isNewUser }) {
      if (isNewUser) {
        console.log('🆕 Nuevo usuario iniciando sesión:', { userId: user.id, email: user.email });
      } else {
        console.log('👤 Usuario existente iniciando sesión:', { userId: user.id, email: user.email });
      }
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: nextAuthSecret,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
});

export { handler as GET, handler as POST };

