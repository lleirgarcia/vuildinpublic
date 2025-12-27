import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { NewProjectForm } from '@/components/admin/NewProjectForm';

export default async function BackofficeNewProjectPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      tiktokHandle: true,
      commentText: true,
      videoUrl: true,
      createdAt: true,
    },
  });

  const estados = await prisma.estado.findMany({
    orderBy: { name: 'asc' },
  });

  // Obtener el siguiente número de proyecto
  const lastProject = await prisma.project.findFirst({
    orderBy: { number: 'desc' },
    select: { number: true },
  });

  const nextNumber = (lastProject?.number || 0) + 1;

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
              <h1 className="text-xl font-medium">Crear Nuevo Proyecto</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <NewProjectForm
          comments={comments}
          estados={estados}
          nextNumber={nextNumber}
        />
      </main>
    </div>
  );
}

