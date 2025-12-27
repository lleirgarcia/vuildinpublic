import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, url, description } = body;

    const video = await prisma.video.create({
      data: {
        projectId: id,
        title,
        url,
        description: description || null,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Error al crear video' }, { status: 500 });
  }
}

