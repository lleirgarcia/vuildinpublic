'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BackofficeLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password === 'p4p4LL0n4') {
      // Guardar autenticación en cookie
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/lleirgarcia/dashboard');
      } else {
        setError('Error al autenticar');
      }
    } else {
      setError('Contraseña incorrecta');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-[#e5e5e5] flex items-center justify-center">
      <div className="border border-[#262626] rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-medium mb-6">Backoffice - vuilding in public</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm text-[#a3a3a3] mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              placeholder="Ingresa la contraseña"
              autoFocus
            />
          </div>
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

