import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateMiniSpec } from '@/lib/spec';

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

    const spec = await generateMiniSpec({
      handle: comment.tiktokHandle,
      commentText: comment.commentText,
    });

    const updated = await prisma.comment.update({
      where: { id },
      data: { spec: JSON.stringify(spec) },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error generating spec:', error);
    return NextResponse.json({ error: 'Error al generar spec' }, { status: 500 });
  }
}

