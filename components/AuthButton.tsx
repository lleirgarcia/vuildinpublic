'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('google', { 
        redirect: true,
        callbackUrl: '/',
      });
      if (result?.error) {
        setError('Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error('Error signing in:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="text-xs text-[#737373] px-3 py-1.5">
        Cargando...
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'Usuario'}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className="text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Iniciar sesión
      </button>
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

