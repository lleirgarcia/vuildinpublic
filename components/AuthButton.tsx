'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { LogoutIcon } from './LogoutIcon';

export function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug: Log session status
  if (typeof window !== 'undefined') {
    console.log('🔐 Auth Status:', status);
    console.log('👤 Session:', session ? {
      user: session.user?.name || session.user?.email,
      id: session.user?.id,
    } : 'No session');
  }

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
    const userName = session.user.name || session.user.email || 'Usuario';
    
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#a3a3a3]">
          Hola, <span className="text-[#e5e5e5]">{userName}</span>
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="p-1.5 hover:opacity-70 transition-opacity"
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogoutIcon />
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

