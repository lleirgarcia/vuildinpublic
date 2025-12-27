'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      router.push('/lleirgarcia');
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors disabled:opacity-50"
    >
      {loading ? 'Saliendo...' : 'Salir'}
    </button>
  );
}

