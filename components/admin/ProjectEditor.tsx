'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  number: number;
  title: string;
  changelog: string | null;
  estado: {
    id: string;
    name: string;
    label: string;
  };
  comment: {
    id: string;
    tiktokHandle: string;
    commentText: string;
    videoUrl: string | null;
  };
  videos: Array<{
    id: string;
    title: string;
    url: string;
    description: string | null;
  }>;
}

interface Estado {
  id: string;
  name: string;
  label: string;
}

export function ProjectEditor({
  project,
  estados,
  initialSpec,
}: {
  project: Project;
  estados: Estado[];
  initialSpec: any;
}) {
  const [title, setTitle] = useState(project.title);
  const [changelog, setChangelog] = useState(project.changelog || '');
  const [estadoId, setEstadoId] = useState(project.estado.id);
  const [objetivo, setObjetivo] = useState(initialSpec?.objetivo || '');
  const [criteriosAceptacion, setCriteriosAceptacion] = useState(
    initialSpec?.criteriosAceptacion || []
  );
  const [newCriterio, setNewCriterio] = useState('');
  const [videos, setVideos] = useState(project.videos);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState<string | null>(null);
  const router = useRouter();

  const addCriterio = () => {
    if (newCriterio.trim()) {
      setCriteriosAceptacion([...criteriosAceptacion, newCriterio.trim()]);
      setNewCriterio('');
    }
  };

  const removeCriterio = (index: number) => {
    setCriteriosAceptacion(criteriosAceptacion.filter((_, i) => i !== index));
  };

  const addVideo = async () => {
    if (!newVideo.title.trim() || !newVideo.url.trim()) {
      alert('Título y URL son requeridos');
      return;
    }

    setVideoLoading('creating');
    try {
      const res = await fetch(`/api/projects/${project.id}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo),
      });

      if (res.ok) {
        const createdVideo = await res.json();
        setVideos([...videos, createdVideo]);
        setNewVideo({ title: '', url: '', description: '' });
        router.refresh();
      } else {
        alert('Error al crear video');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear video');
    } finally {
      setVideoLoading(null);
    }
  };

  const deleteVideo = async (videoId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este video?')) {
      return;
    }

    setVideoLoading(videoId);
    try {
      const res = await fetch(`/api/projects/${project.id}/videos/${videoId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setVideos(videos.filter((v) => v.id !== videoId));
        router.refresh();
      } else {
        alert('Error al eliminar video');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar video');
    } finally {
      setVideoLoading(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          changelog,
          estadoId,
          spec: JSON.stringify({ objetivo, criteriosAceptacion }),
        }),
      });

      if (res.ok) {
        router.refresh();
        alert('Proyecto actualizado correctamente');
      } else {
        alert('Error al actualizar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Información Básica</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Título del Proyecto
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Estado
            </label>
            <select
              value={estadoId}
              onChange={(e) => setEstadoId(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            >
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Changelog
            </label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            />
          </div>
        </div>
      </div>

      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Descripción del Objetivo</h2>

        <div>
          <label className="block text-sm text-[#a3a3a3] mb-2">
            Objetivo del Proyecto
          </label>
          <textarea
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
          />
        </div>
      </div>

      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Criterios de Aceptación</h2>

        <div>
          <label className="block text-sm text-[#a3a3a3] mb-2">
            Añadir Criterio
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCriterio}
              onChange={(e) => setNewCriterio(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCriterio();
                }
              }}
              placeholder="Ej: El usuario puede hacer login con Google"
              className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            />
            <button
              type="button"
              onClick={addCriterio}
              className="px-4 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors"
            >
              Añadir
            </button>
          </div>

          {criteriosAceptacion.length > 0 && (
            <div className="space-y-2">
              {criteriosAceptacion.map((criterio, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-black rounded border border-[#262626]"
                >
                  <span className="text-sm text-[#a3a3a3] flex-1">{criterio}</span>
                  <button
                    type="button"
                    onClick={() => removeCriterio(index)}
                    className="text-xs text-red-500 hover:text-red-400 ml-2"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          {criteriosAceptacion.length === 0 && (
            <p className="text-sm text-[#737373] italic">
              No hay criterios de aceptación añadidos
            </p>
          )}
        </div>
      </div>

      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Información del Comentario Original</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-[#a3a3a3]">Handle:</span>{' '}
            {project.comment.tiktokHandle}
          </p>
          <p>
            <span className="text-[#a3a3a3]">Comentario:</span>{' '}
            {project.comment.commentText}
          </p>
          {project.comment.videoUrl && (
            <p>
              <span className="text-[#a3a3a3]">Video URL:</span>{' '}
              <a
                href={project.comment.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a3a3a3] hover:text-[#e5e5e5] underline"
              >
                {project.comment.videoUrl}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Videos Relacionados ({videos.length})</h2>
        
        {/* Formulario para añadir video */}
        <div className="mb-6 p-4 bg-black rounded border border-[#262626]">
          <h3 className="text-sm font-medium mb-3 text-[#a3a3a3]">Añadir Nuevo Video</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-[#737373] mb-1">Título *</label>
              <input
                type="text"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                placeholder="Ej: Demo del proyecto"
                className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#262626] rounded text-sm text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#737373] mb-1">URL *</label>
              <input
                type="url"
                value={newVideo.url}
                onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#262626] rounded text-sm text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#737373] mb-1">Descripción (opcional)</label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                placeholder="Descripción del video"
                rows={2}
                className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#262626] rounded text-sm text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
              />
            </div>
            <button
              type="button"
              onClick={addVideo}
              disabled={videoLoading === 'creating'}
              className="px-4 py-2 bg-[#262626] border border-[#404040] rounded text-sm text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {videoLoading === 'creating' ? 'Añadiendo...' : 'Añadir Video'}
            </button>
          </div>
        </div>

        {/* Lista de videos */}
        {videos.length > 0 ? (
          <div className="space-y-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-3 bg-black rounded border border-[#262626]"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{video.title}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#a3a3a3] hover:text-[#e5e5e5] underline"
                  >
                    {video.url}
                  </a>
                  {video.description && (
                    <p className="text-xs text-[#737373] mt-1">{video.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => deleteVideo(video.id)}
                  disabled={videoLoading === video.id}
                  className="ml-4 p-1.5 bg-red-500/20 border border-red-500/50 rounded text-red-400 hover:bg-red-500/40 hover:border-red-500/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Eliminar video"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#737373]">No hay videos relacionados</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
}

