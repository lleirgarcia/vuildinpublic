'use client';

import { useState } from 'react';

export function ScriptsRunner() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [output, setOutput] = useState<string>('');

  const runScript = async (scriptType: 'youtube' | 'tiktok', url: string) => {
    if (!url.trim()) {
      alert('Por favor, ingresa una URL');
      return;
    }

    setLoading(scriptType);
    setOutput('Ejecutando script...\n');

    try {
      const res = await fetch(`/api/admin/scripts/${scriptType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        setOutput(
          `✅ Script ejecutado correctamente\n\n${data.output || 'Sin salida'}\n${
            data.commentsCollected
              ? `\n📊 Comentarios recogidos: ${data.commentsCollected}`
              : ''
          }`
        );
      } else {
        setOutput(`❌ Error: ${data.error || 'Error desconocido'}\n${data.stderr || ''}`);
      }
    } catch (error: any) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Scripts de Recogida de Comentarios</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h3 className="text-lg font-medium mb-4">YouTube</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#a3a3a3] mb-2">
                URL del Video
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              />
            </div>
            <button
              onClick={() => runScript('youtube', youtubeUrl)}
              disabled={loading === 'youtube' || !youtubeUrl.trim()}
              className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === 'youtube' ? 'Ejecutando...' : 'Recoger Comentarios de YouTube'}
            </button>
          </div>
        </div>

        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h3 className="text-lg font-medium mb-4">TikTok</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#a3a3a3] mb-2">
                URL del Video
              </label>
              <input
                type="text"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@user/video/..."
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              />
            </div>
            <button
              onClick={() => runScript('tiktok', tiktokUrl)}
              disabled={loading === 'tiktok' || !tiktokUrl.trim()}
              className="w-full px-4 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === 'tiktok' ? 'Ejecutando...' : 'Recoger Comentarios de TikTok'}
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
          <h3 className="text-lg font-medium mb-4">Salida del Script</h3>
          <pre className="text-sm text-[#a3a3a3] whitespace-pre-wrap font-mono">
            {output}
          </pre>
        </div>
      )}

      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h3 className="text-lg font-medium mb-4">Notas</h3>
        <ul className="text-sm text-[#737373] space-y-2 list-disc list-inside">
          <li>Los scripts recogerán comentarios de la URL proporcionada</li>
          <li>Los comentarios se guardarán automáticamente en la base de datos</li>
          <li>Puedes ver los comentarios recogidos en la sección "Comentarios"</li>
          <li>Los scripts pueden tardar varios segundos en ejecutarse</li>
        </ul>
      </div>
    </div>
  );
}

