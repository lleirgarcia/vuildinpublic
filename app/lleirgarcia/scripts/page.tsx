import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import Link from 'next/link';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { ScriptsRunner } from '@/components/admin/ScriptsRunner';

export default async function BackofficeScriptsPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/lleirgarcia');
  }

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
              <h1 className="text-xl font-medium">Ejecutar Scripts</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ScriptsRunner />
      </main>
    </div>
  );
}

