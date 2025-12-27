import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="border border-[#262626] rounded-lg p-8">
        <h1 className="text-xl font-medium text-[#e5e5e5] mb-4">
          Error de autenticación
        </h1>
        <p className="text-sm text-[#737373] mb-6">
          Hubo un problema al intentar iniciar sesión con Google. Esto puede deberse a:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#737373] mb-6">
          <li>Las credenciales de Google OAuth no están configuradas</li>
          <li>El redirect URI no coincide con la configuración en Google Console</li>
          <li>Las variables de entorno no están configuradas correctamente</li>
        </ul>
        <div className="bg-[#0a0a0a] border border-[#262626] rounded p-4 mb-6">
          <p className="text-xs text-[#a3a3a3] mb-2 font-medium">Para configurar Google OAuth:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-[#737373]">
            <li>Crea un archivo <code className="text-[#a3a3a3]">.env.local</code> en la raíz del proyecto</li>
            <li>Añade las variables: <code className="text-[#a3a3a3]">GOOGLE_CLIENT_ID</code>, <code className="text-[#a3a3a3]">GOOGLE_CLIENT_SECRET</code>, <code className="text-[#a3a3a3]">NEXTAUTH_URL</code>, <code className="text-[#a3a3a3]">NEXTAUTH_SECRET</code></li>
            <li>Consulta <code className="text-[#a3a3a3]">AUTH_SETUP.md</code> para más detalles</li>
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

