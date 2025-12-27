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

    console.log('Fetching comments with filters:', { isCandidateToday, limit });

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

    console.log(`Found ${comments.length} comments`);

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
      { 
        error: 'Error al obtener comentarios',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tiktokHandle, commentText, videoUrl } = body;

    console.log('Creating comment:', { tiktokHandle, commentText: commentText?.substring(0, 50), videoUrl });

    const comment = await prisma.comment.create({
      data: {
        tiktokHandle,
        commentText,
        videoUrl: videoUrl || null,
      },
    });

    console.log('Comment created successfully:', comment.id);

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { 
        error: 'Error al crear comentario',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
