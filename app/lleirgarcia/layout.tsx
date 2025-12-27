import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Permitir acceso a la página de login sin autenticación
  // La verificación se hace en cada página individual
  return <>{children}</>;
}

