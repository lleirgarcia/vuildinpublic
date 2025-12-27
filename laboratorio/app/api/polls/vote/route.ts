import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollId } = body;

    // Por ahora usamos un handle genérico, en producción vendría de la sesión
    const tiktokHandle = 'voter_' + Date.now();

    // Verificar si ya votó (por ahora solo verificamos por poll, no por usuario)
    // En producción deberías verificar por usuario autenticado

    const vote = await prisma.vote.create({
      data: {
        pollId,
        tiktokHandle,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json({ error: 'Error al votar' }, { status: 500 });
  }
}

