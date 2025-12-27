'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorMessages: Record<string, string> = {
    OAuthCreateAccount: 'No se pudo crear la cuenta en la base de datos. Verifica que las tablas de NextAuth existan y que la base de datos esté conectada.',
    Configuration: 'Hay un problema con la configuración de NextAuth. Verifica las variables de entorno.',
    AccessDenied: 'Acceso denegado. No tienes permiso para acceder.',
    Verification: 'El token de verificación no es válido o ha expirado.',
    Default: 'Hubo un error desconocido al intentar autenticarte.',
  };

  const errorMessage = errorMessages[error || ''] || errorMessages.Default;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="border border-[#262626] rounded-lg p-8">
        <h1 className="text-xl font-medium text-[#e5e5e5] mb-4">
          Error de autenticación
        </h1>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-4 mb-6">
          <p className="text-sm text-red-400 mb-2 font-medium">Error: {error || 'Desconocido'}</p>
          <p className="text-sm text-[#a3a3a3]">{errorMessage}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#262626] rounded p-4 mb-6">
          <p className="text-xs text-[#a3a3a3] mb-2 font-medium">Pasos para solucionar:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-[#737373]">
            <li>Verifica que Docker/PostgreSQL esté corriendo: <code className="text-[#a3a3a3]">docker ps</code></li>
            <li>Verifica que las tablas existan: <code className="text-[#a3a3a3">npx prisma db push</code></li>
            <li>Revisa los logs del servidor para ver el error específico</li>
            <li>Verifica que las variables de entorno estén en <code className="text-[#a3a3a3]">.env.local</code></li>
          </ol>
        </div>
        <Link
          href="/"
          className="text-xs font-medium px-4 py-2 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

