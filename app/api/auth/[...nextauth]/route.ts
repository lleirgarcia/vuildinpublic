import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import type { Adapter } from 'next-auth/adapters';

// Validar variables de entorno
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.error('❌ ERROR: Google OAuth no configurado.');
  console.error('   Añade al archivo .env.local:');
  console.error('   GOOGLE_CLIENT_ID="tu-client-id"');
  console.error('   GOOGLE_CLIENT_SECRET="tu-client-secret"');
  console.error('   NEXTAUTH_URL="http://localhost:3000"');
  console.error('   NEXTAUTH_SECRET="genera-un-secret"');
}

if (!nextAuthSecret) {
  console.warn('⚠️  NEXTAUTH_SECRET no configurado. Genera uno con: openssl rand -base64 32');
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: googleClientId && googleClientSecret ? [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ] : [],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: nextAuthSecret,
});

export { handler as GET, handler as POST };

