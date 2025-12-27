'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  tiktokHandle: string;
  commentText: string;
  videoUrl: string | null;
  createdAt: Date;
}

interface Estado {
  id: string;
  name: string;
  label: string;
}

export function NewProjectForm({
  comments,
  estados,
  nextNumber,
}: {
  comments: Comment[];
  estados: Estado[];
  nextNumber: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    commentId: '',
    title: '',
    estadoId: estados.find((e) => e.name === 'brainstorming')?.id || estados[0]?.id || '',
    spec: {
      objetivo: '',
      criteriosAceptacion: [] as string[],
    },
  });

  const [newCriterio, setNewCriterio] = useState('');

  const selectedComment = comments.find((c) => c.id === formData.commentId);

  const addCriterio = () => {
    if (newCriterio.trim()) {
      setFormData({
        ...formData,
        spec: {
          ...formData.spec,
          criteriosAceptacion: [...formData.spec.criteriosAceptacion, newCriterio.trim()],
        },
      });
      setNewCriterio('');
    }
  };

  const removeCriterio = (index: number) => {
    setFormData({
      ...formData,
      spec: {
        ...formData.spec,
        criteriosAceptacion: formData.spec.criteriosAceptacion.filter((_, i) => i !== index),
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId: formData.commentId,
          title: formData.title,
          estadoId: formData.estadoId,
          spec: formData.spec,
        }),
      });

      if (res.ok) {
        // Redirigir y luego refrescar para cargar el nuevo proyecto
        router.push('/lleirgarcia/projects');
        // Pequeño delay para asegurar que la navegación se complete antes del refresh
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Error al crear el proyecto'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el proyecto');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]">
        <h2 className="text-lg font-medium mb-4">Información Básica</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Número de Proyecto
            </label>
            <input
              type="text"
              value={`#${nextNumber}`}
              disabled
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#737373] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Comentario Original (Opcional)
            </label>
            <select
              value={formData.commentId}
              onChange={(e) => setFormData({ ...formData, commentId: e.target.value })}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            >
              <option value="">Sin comentario asociado</option>
              {comments.map((comment) => (
                <option key={comment.id} value={comment.id}>
                  {comment.tiktokHandle} - {comment.commentText.substring(0, 50)}...
                </option>
              ))}
            </select>
            {selectedComment && (
              <div className="mt-2 p-3 bg-black rounded border border-[#262626]">
                <p className="text-sm text-[#a3a3a3]">
                  <span className="font-medium">{selectedComment.tiktokHandle}:</span>{' '}
                  {selectedComment.commentText}
                </p>
                {selectedComment.videoUrl && (
                  <a
                    href={selectedComment.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#737373] hover:text-[#a3a3a3] underline mt-1 block"
                  >
                    {selectedComment.videoUrl}
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Título del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Ej: Sistema de comentarios con IA"
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#a3a3a3] mb-2">
              Estado Inicial <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.estadoId}
              onChange={(e) => setFormData({ ...formData, estadoId: e.target.value })}
              required
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
            >
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.label}
                </option>
              ))}
            </select>
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
            value={formData.spec.objetivo}
            onChange={(e) =>
              setFormData({
                ...formData,
                spec: { ...formData.spec, objetivo: e.target.value },
              })
            }
            rows={6}
            placeholder="Describe el objetivo principal del proyecto..."
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

          {formData.spec.criteriosAceptacion.length > 0 && (
            <div className="space-y-2">
              {formData.spec.criteriosAceptacion.map((criterio, index) => (
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

          {formData.spec.criteriosAceptacion.length === 0 && (
            <p className="text-sm text-[#737373] italic">
              No hay criterios de aceptación añadidos
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !formData.title}
          className="px-6 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando...' : 'Crear Proyecto'}
        </button>
      </div>
    </form>
  );
}

