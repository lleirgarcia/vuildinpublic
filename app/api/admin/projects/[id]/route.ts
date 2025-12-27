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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { estadoId, title, changelog } = body;

    const updateData: any = {};
    if (estadoId) updateData.estadoId = estadoId;
    if (title !== undefined) updateData.title = title;
    if (changelog !== undefined) updateData.changelog = changelog;
    if (body.spec) updateData.spec = body.spec;

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
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
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Error al actualizar proyecto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;

    // Eliminar el proyecto (esto también eliminará el comentario asociado si está configurado con onDelete: Cascade)
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el proyecto' },
      { status: 500 }
    );
  }
}

