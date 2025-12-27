import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener todos los comentarios y mensajes para contar interacciones por usuario
    const comments = await prisma.comment.findMany({
      select: { tiktokHandle: true },
    });
    
    const messages = await prisma.message.findMany({
      select: { tiktokHandle: true, likes: true },
    });

    // Contar interacciones por usuario
    const userInteractions: Record<string, number> = {};
    
    // Cada comentario cuenta como 1 interacción
    comments.forEach(comment => {
      userInteractions[comment.tiktokHandle] = (userInteractions[comment.tiktokHandle] || 0) + 1;
    });
    
    // Cada like en mensajes cuenta como 1 interacción
    messages.forEach(message => {
      userInteractions[message.tiktokHandle] = (userInteractions[message.tiktokHandle] || 0) + message.likes;
    });

    // Convertir a array y ordenar
    const topUsers = Object.entries(userInteractions)
      .map(([handle, count]) => ({ handle, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      users: topUsers,
    });
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json(
      { error: 'Error al obtener top usuarios' },
      { status: 500 }
    );
  }
}

