import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import Link from 'next/link';
import { LogoutButton } from '@/components/admin/LogoutButton';

export default async function BackofficeDashboard() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

  return (
    <div className="min-h-screen bg-black text-[#e5e5e5]">
      <header className="border-b border-[#1a1a1a] bg-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Backoffice - vuilding in public</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/lleirgarcia/projects"
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                Proyectos
              </Link>
              <Link
                href="/lleirgarcia/comments"
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                Comentarios
              </Link>
              <Link
                href="/lleirgarcia/scripts"
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                Scripts
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-medium mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/lleirgarcia/projects"
            className="border border-[#262626] rounded-lg p-6 hover:border-[#404040] transition-colors"
          >
            <h3 className="text-lg font-medium mb-2">Gestionar Proyectos</h3>
            <p className="text-sm text-[#737373]">
              Cambiar estados, editar información, añadir videos
            </p>
          </Link>

          <Link
            href="/lleirgarcia/comments"
            className="border border-[#262626] rounded-lg p-6 hover:border-[#404040] transition-colors"
          >
            <h3 className="text-lg font-medium mb-2">Gestionar Comentarios</h3>
            <p className="text-sm text-[#737373]">
              Ver, editar y gestionar comentarios capturados
            </p>
          </Link>

          <Link
            href="/lleirgarcia/scripts"
            className="border border-[#262626] rounded-lg p-6 hover:border-[#404040] transition-colors"
          >
            <h3 className="text-lg font-medium mb-2">Ejecutar Scripts</h3>
            <p className="text-sm text-[#737373]">
              Recoger comentarios de YouTube, TikTok, etc.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

