import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { CommentsManager } from '@/components/admin/CommentsManager';

export default async function BackofficeCommentsPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
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
              <h1 className="text-xl font-medium">Gestionar Comentarios</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <CommentsManager initialComments={comments} />
      </main>
    </div>
  );
}

