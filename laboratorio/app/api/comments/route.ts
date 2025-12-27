import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isCandidateToday = searchParams.get('isCandidateToday');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const where: any = {};
    if (isCandidateToday !== null) {
      where.isCandidateToday = isCandidateToday === 'true';
    }

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        project: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json({
      comments: comments.map(c => ({
        id: c.id,
        tiktokHandle: c.tiktokHandle,
        commentText: c.commentText,
        videoUrl: c.videoUrl,
        isCandidateToday: c.isCandidateToday,
        createdAt: c.createdAt,
        hasSpec: c.spec !== null,
        hasProject: c.project !== null,
      })),
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Error al obtener comentarios' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tiktokHandle, commentText, videoUrl } = body;

    const comment = await prisma.comment.create({
      data: {
        tiktokHandle,
        commentText,
        videoUrl: videoUrl || null,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Error al crear comentario' }, { status: 500 });
  }
}
