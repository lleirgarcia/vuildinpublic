import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comentario no encontrado' }, { status: 404 });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { isCandidateToday: !comment.isCandidateToday },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error toggling candidate:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

