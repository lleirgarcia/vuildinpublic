import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Primero intenta buscar por ID de proyecto
    let project = await prisma.project.findUnique({
      where: { id },
      include: {
        comment: {
          select: {
            id: true,
            tiktokHandle: true,
            commentText: true,
            videoUrl: true,
          },
        },
        videos: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            url: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });

    // Si no encuentra, intenta buscar por commentId
    if (!project) {
      project = await prisma.project.findUnique({
        where: { commentId: id },
        include: {
          comment: {
            select: {
              id: true,
              tiktokHandle: true,
              commentText: true,
              videoUrl: true,
            },
          },
          videos: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              title: true,
              url: true,
              description: true,
              createdAt: true,
            },
          },
        },
      });
    }

    if (!project) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    // Parsear spec
    let spec;
    try {
      spec = typeof project.spec === 'string' ? JSON.parse(project.spec) : project.spec;
    } catch (error) {
      spec = {
        objetivo: 'No disponible',
        alcance: 'No disponible',
        criteriosAceptacion: [],
        fueraDeAlcance: [],
      };
    }

    return NextResponse.json({
      id: project.id,
      number: project.number,
      title: project.title,
      status: project.status,
      createdAt: project.createdAt,
      changelog: project.changelog,
      spec,
      comment: project.comment,
      videos: project.videos || [],
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Error al obtener proyecto' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { changelog, status } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        changelog: changelog || null,
        status: status || 'brainstorming',
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Error al actualizar proyecto' }, { status: 500 });
  }
}
