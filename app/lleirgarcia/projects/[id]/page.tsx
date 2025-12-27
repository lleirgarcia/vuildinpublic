import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

export default async function BackofficeProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
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
      videos: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!project) {
    redirect('/lleirgarcia/projects');
  }

  const estados = await prisma.estado.findMany({
    orderBy: { name: 'asc' },
  });

  let spec;
  try {
    spec = typeof project.spec === 'string' ? JSON.parse(project.spec) : project.spec;
  } catch {
    spec = {
      objetivo: '',
      criteriosAceptacion: [],
    };
  }

  return (
    <div className="min-h-screen bg-black text-[#e5e5e5]">
      <header className="border-b border-[#1a1a1a] bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/lleirgarcia/projects"
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                ← Volver a Proyectos
              </Link>
              <h1 className="text-xl font-medium">
                Editar Proyecto #{project.number}
              </h1>
            </div>
            <Link
              href="/lleirgarcia/dashboard"
              className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ProjectEditor
          project={project}
          estados={estados}
          initialSpec={spec}
        />
      </main>
    </div>
  );
}

