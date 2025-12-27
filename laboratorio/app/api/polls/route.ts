import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      where: { isActive: true },
      include: {
        comment: {
          select: {
            tiktokHandle: true,
            commentText: true,
          },
        },
        _count: {
          select: { votes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      polls: polls.map(poll => ({
        id: poll.id,
        title: poll.title,
        description: poll.description,
        comment: poll.comment,
        voteCount: poll._count.votes,
        createdAt: poll.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json(
      { error: 'Error al obtener polls' },
      { status: 500 }
    );
  }
}

