import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProjectDetail } from './ProjectDetail';
import Link from 'next/link';

async function getProject(id: string) {
  // Primero intenta buscar por ID de proyecto
  let project = await prisma.project.findUnique({
    where: { id },
    include: {
      estado: true,
      comment: true,
      videos: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  // Si no encuentra, intenta buscar por commentId
  if (!project) {
    project = await prisma.project.findUnique({
      where: { commentId: id },
      include: {
        estado: true,
        comment: true,
        videos: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  return project;
}

async function getComment(id: string) {
  return await prisma.comment.findUnique({
    where: { id },
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const project = await getProject(id);

    if (project) {
      // Asegurar que videos siempre sea un array y que todos los campos estén presentes
      const projectWithVideos = {
        ...project,
        videos: project.videos || [],
        comment: project.comment || {
          tiktokHandle: 'unknown',
          commentText: 'Sin comentario',
          videoUrl: null,
        },
        spec: project.spec || JSON.stringify({
          objetivo: 'No disponible',
          alcance: 'No disponible',
          criteriosAceptacion: [],
          fueraDeAlcance: [],
        }),
      };
      return <ProjectDetail project={projectWithVideos} />;
    }
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="border border-[#262626] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[#e5e5e5] mb-2">Error al cargar proyecto</h2>
          <p className="text-sm text-[#737373] mb-4">
            No se pudo cargar el proyecto con ID: {id}
          </p>
          <Link
            href="/"
            className="inline-block text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Si no hay proyecto, verifica si es un comentario
  const comment = await getComment(id);
  if (comment) {
    // Si el comentario tiene spec, redirige a crear proyecto
    if (comment.spec) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="border border-[#262626] rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#e5e5e5] mb-2">Comentario sin proyecto</h2>
            <p className="text-sm text-[#737373] mb-4">
              Este comentario tiene un spec generado pero aún no se ha creado un proyecto.
            </p>
            <Link
              href="/inbox"
              className="inline-block text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
            >
              Ir al Inbox para crear proyecto
            </Link>
          </div>
        </div>
      );
    }
    // Si no tiene spec, redirige al inbox
    redirect('/inbox');
  }

  notFound();
}

