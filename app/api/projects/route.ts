import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const where: any = {};
    if (status) {
      where.estado = {
        name: status,
      };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { number: 'desc' },
      take: limit,
      include: {
        estado: true,
        comment: {
          select: {
            id: true,
            tiktokHandle: true,
            commentText: true,
            videoUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      projects: projects.map(p => ({
        id: p.id,
        number: p.number,
        title: p.title,
        estado: p.estado,
        createdAt: p.createdAt,
        comment: p.comment,
      })),
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Error al obtener proyectos' },
      { status: 500 }
    );
  }
}

