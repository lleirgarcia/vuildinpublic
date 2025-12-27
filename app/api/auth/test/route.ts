import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    
    // Verificar tablas
    const userCount = await prisma.user.count();
    const sessionCount = await prisma.session.count();
    const accountCount = await prisma.account.count();
    
    // Obtener sesiones recientes
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
    
    // Obtener usuarios recientes
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
    
    return NextResponse.json({
      status: 'ok',
      database: {
        connected: true,
        counts: {
          users: userCount,
          sessions: sessionCount,
          accounts: accountCount,
        },
      },
      recentSessions: recentSessions.map(s => ({
        id: s.id,
        userId: s.userId,
        userEmail: s.user.email,
        userName: s.user.name,
        expires: s.expires,
        isExpired: s.expires < new Date(),
      })),
      recentUsers: recentUsers.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
}

