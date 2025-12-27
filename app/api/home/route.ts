import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener proyectos
    const projects = await prisma.project.findMany({
      orderBy: { number: 'desc' },
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

    // Separar proyectos por estado
    const buildingProjects = projects
      .filter(p => 
        p.estado.name === 'brainstorming' || 
        p.estado.name === 'in progress' || 
        p.estado.name === 'testing'
      )
      .map(p => ({
        id: p.id,
        number: p.number,
        title: p.title,
        estado: p.estado,
        comment: p.comment,
      }));

    const shippedProjects = projects
      .filter(p => p.estado.name === 'shipped')
      .map(p => ({
        id: p.id,
        number: p.number,
        title: p.title,
        estado: p.estado,
        comment: p.comment,
      }));

    const preparedProjects = projects
      .filter(p => p.estado.name === 'prepared')
      .map(p => ({
        id: p.id,
        number: p.number,
        title: p.title,
        estado: p.estado,
        comment: p.comment,
      }));

    // Obtener top 10 usuarios
    const comments = await prisma.comment.findMany({
      select: { tiktokHandle: true },
    });
    
    const messages = await prisma.message.findMany({
      select: { tiktokHandle: true, likes: true },
    });

    const userInteractions: Record<string, number> = {};
    
    comments.forEach(comment => {
      userInteractions[comment.tiktokHandle] = (userInteractions[comment.tiktokHandle] || 0) + 1;
    });
    
    messages.forEach(message => {
      userInteractions[message.tiktokHandle] = (userInteractions[message.tiktokHandle] || 0) + message.likes;
    });

    const topUsers = Object.entries(userInteractions)
      .map(([handle, count]) => ({ handle, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Obtener polls activos
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
      take: 5,
    });

    const pollsWithVoteCount = polls.map(poll => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      comment: poll.comment,
      voteCount: poll._count.votes,
    }));

    return NextResponse.json({
      buildingProjects,
      shippedProjects,
      preparedProjects,
      topUsers,
      polls: pollsWithVoteCount,
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}

