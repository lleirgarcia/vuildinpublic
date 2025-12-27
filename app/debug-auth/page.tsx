'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">🔐 Debug de Autenticación</h1>
      
      <div className="space-y-6">
        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h2 className="text-lg font-semibold mb-4">Estado de la Sesión</h2>
          <div className="space-y-2">
            <div>
              <span className="text-[#a3a3a3]">Status:</span>{' '}
              <span className={`font-mono ${
                status === 'authenticated' ? 'text-green-500' :
                status === 'unauthenticated' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {status}
              </span>
            </div>
            {session && (
              <>
                <div>
                  <span className="text-[#a3a3a3]">Usuario ID:</span>{' '}
                  <span className="font-mono text-[#e5e5e5]">
                    {session.user?.id || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[#a3a3a3]">Nombre:</span>{' '}
                  <span className="text-[#e5e5e5]">
                    {session.user?.name || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[#a3a3a3]">Email:</span>{' '}
                  <span className="text-[#e5e5e5]">
                    {session.user?.email || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[#a3a3a3]">Imagen:</span>{' '}
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Avatar" 
                      className="w-12 h-12 rounded-full inline-block ml-2"
                    />
                  ) : (
                    <span className="text-[#737373]">N/A</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h2 className="text-lg font-semibold mb-4">Datos de Sesión (JSON)</h2>
          <pre className="text-xs bg-black p-4 rounded overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h2 className="text-lg font-semibold mb-4">Cómo Verificar el Login</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[#a3a3a3]">
            <li>Haz clic en "Iniciar sesión" en el header</li>
            <li>Selecciona tu cuenta de Google</li>
            <li>Después del login, deberías ver "Hola, [tu nombre]" en el header</li>
            <li>En esta página deberías ver tu información de sesión arriba</li>
            <li>Revisa la consola del navegador (F12) para ver logs de debug</li>
            <li>Revisa los logs del servidor para ver callbacks de NextAuth</li>
          </ol>
        </div>

        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h2 className="text-lg font-semibold mb-4">Verificar en Base de Datos</h2>
          <p className="text-sm text-[#a3a3a3] mb-2">
            Si el login funciona, deberías ver un registro en la tabla <code className="bg-black px-1 rounded">User</code>:
          </p>
          <pre className="text-xs bg-black p-4 rounded overflow-auto">
{`npx prisma studio
# O ejecuta:
SELECT * FROM "User" ORDER BY "createdAt" DESC LIMIT 5;`}
          </pre>
        </div>
      </div>
    </div>
  );
}

