import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ProjectManager } from '@/components/admin/ProjectManager';
import { LogoutButton } from '@/components/admin/LogoutButton';

export default async function BackofficeProjectsPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

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

  const estados = await prisma.estado.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-black text-[#e5e5e5]">
      <header className="border-b border-[#1a1a1a] bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/lleirgarcia/dashboard"
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                ← Dashboard
              </Link>
              <h1 className="text-xl font-medium">Gestionar Proyectos</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ProjectManager initialProjects={projects} estados={estados} />
      </main>
    </div>
  );
}

