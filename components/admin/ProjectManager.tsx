'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: string;
  number: number;
  title: string;
  estado: {
    id: string;
    name: string;
    label: string;
    color: string;
  };
  comment: {
    tiktokHandle: string;
    commentText: string;
  };
}

interface Estado {
  id: string;
  name: string;
  label: string;
  color: string;
}

export function ProjectManager({
  initialProjects,
  estados,
}: {
  initialProjects: Project[];
  estados: Estado[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const updateProjectState = async (projectId: string, estadoId: string) => {
    setLoading(projectId);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoId }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updated.project : p))
        );
        router.refresh();
      } else {
        alert('Error al actualizar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el proyecto');
    } finally {
      setLoading(null);
    }
  };

  const updateProjectInfo = async (
    projectId: string,
    data: { title?: string; changelog?: string }
  ) => {
    setLoading(projectId);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updated.project : p))
        );
        router.refresh();
      } else {
        alert('Error al actualizar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el proyecto');
    } finally {
      setLoading(null);
    }
  };

  const deleteProject = async (projectId: string, projectTitle: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el proyecto "${projectTitle}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setLoading(projectId);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error al eliminar el proyecto: ${error.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el proyecto');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Proyectos ({projects.length})</h2>
        <Link
          href="/lleirgarcia/projects/new"
          className="px-4 py-2 bg-[#262626] border border-[#404040] rounded text-[#e5e5e5] hover:bg-[#333333] transition-colors text-sm"
        >
          + Crear Proyecto
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a] relative"
          >
            <button
              onClick={() => deleteProject(project.id, project.title)}
              disabled={loading === project.id}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center bg-red-500/20 border border-red-500/50 rounded text-red-500 hover:bg-red-500/30 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Eliminar proyecto"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex justify-between items-start mb-4 pr-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-[#737373]">#{project.number}</span>
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      color: project.estado.color,
                      backgroundColor: project.estado.bgColor,
                      border: `1px solid ${project.estado.borderColor}`,
                    }}
                  >
                    {project.estado.label}
                  </span>
                  <h3 className="text-lg font-medium">{project.title}</h3>
                </div>
                <p className="text-sm text-[#a3a3a3] mb-2">
                  Propuesto por: {project.comment.tiktokHandle}
                </p>
                <p className="text-sm text-[#737373] line-clamp-2">
                  {project.comment.commentText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-2">
                  Cambiar Estado
                </label>
                <select
                  value={project.estado.id}
                  onChange={(e) => updateProjectState(project.id, e.target.value)}
                  disabled={loading === project.id}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040] disabled:opacity-50"
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
                  Título del Proyecto
                </label>
                <input
                  type="text"
                  defaultValue={project.title}
                  onBlur={(e) => {
                    if (e.target.value !== project.title) {
                      updateProjectInfo(project.id, { title: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded text-[#e5e5e5] focus:outline-none focus:border-[#404040]"
                />
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/lleirgarcia/projects/${project.id}`}
                className="text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
              >
                Editar completo →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

