import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'admin-auth';
const COOKIE_VALUE = 'authenticated';

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_NAME);
    return authCookie?.value === COOKIE_VALUE;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { commentId, title, estadoId, spec } = body;

    let finalCommentId = commentId;

    // Si no se proporciona comentario, crear uno vacío
    if (!commentId) {
      const emptyComment = await prisma.comment.create({
        data: {
          tiktokHandle: 'admin',
          commentText: 'Proyecto creado manualmente desde el backoffice',
        },
      });
      finalCommentId = emptyComment.id;
    } else {
      // Validar que el comentario existe
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        return NextResponse.json(
          { error: 'Comentario no encontrado' },
          { status: 404 }
        );
      }

      // Verificar que el comentario no tenga ya un proyecto asociado
      const existingProject = await prisma.project.findUnique({
        where: { commentId },
      });

      if (existingProject) {
        return NextResponse.json(
          { error: 'Este comentario ya tiene un proyecto asociado' },
          { status: 400 }
        );
      }
    }

    // Obtener el siguiente número de proyecto
    const lastProject = await prisma.project.findFirst({
      orderBy: { number: 'desc' },
      select: { number: true },
    });

    const nextNumber = (lastProject?.number || 0) + 1;

    // Crear el proyecto
    const project = await prisma.project.create({
      data: {
        number: nextNumber,
        title,
        estadoId,
        commentId: finalCommentId,
        spec: JSON.stringify(spec || {
          objetivo: '',
        }),
      },
      include: {
        estado: true,
        comment: {
          select: {
            tiktokHandle: true,
            commentText: true,
          },
        },
      },
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error('Error creating project:', error);
    
    // Manejar errores de constraint único
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un proyecto con este número o comentario' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al crear el proyecto' },
      { status: 500 }
    );
  }
}

