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

    if (!comment.spec) {
      return NextResponse.json({ error: 'El comentario debe tener un spec generado' }, { status: 400 });
    }

    // Verificar si ya existe un proyecto para este comentario
    const existingProject = await prisma.project.findUnique({
      where: { commentId: id },
    });

    if (existingProject) {
      return NextResponse.json({ projectId: existingProject.id });
    }

    // Obtener el siguiente número de proyecto
    const lastProject = await prisma.project.findFirst({
      orderBy: { number: 'desc' },
    });

    const nextNumber = lastProject ? lastProject.number + 1 : 1;

    // Crear título corto del comentario
    const title = comment.commentText.length > 60
      ? comment.commentText.substring(0, 60) + '...'
      : comment.commentText;

    // Obtener el estado por defecto (brainstorming)
    const defaultEstado = await prisma.estado.findUnique({
      where: { name: 'brainstorming' },
    });

    if (!defaultEstado) {
      return NextResponse.json({ error: 'Estado por defecto no encontrado' }, { status: 500 });
    }

    const project = await prisma.project.create({
      data: {
        number: nextNumber,
        title,
        commentId: id,
        spec: comment.spec,
        estadoId: defaultEstado.id,
      },
    });

    return NextResponse.json({ projectId: project.id });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 });
  }
}

