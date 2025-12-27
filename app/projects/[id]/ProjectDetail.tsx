'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import Link from 'next/link';
import { VideoEmbed } from '@/components/VideoEmbed';

interface MiniSpec {
  objetivo: string;
  alcance: string;
  criteriosAceptacion: string[];
  fueraDeAlcance: string[];
}

interface Estado {
  id: string;
  name: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface Project {
  id: string;
  number: number;
  estado: Estado;
  title: string;
  changelog: string | null;
  spec: string | MiniSpec;
  comment: {
    tiktokHandle: string;
    commentText: string;
    videoUrl: string | null;
  };
  videos?: Array<{
    id: string;
    title: string;
    url: string;
    description: string | null;
  }>;
}

export function ProjectDetail({ project }: { project: Project }) {
  // Validación temprana
  if (!project || !project.comment) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="border border-[#262626] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[#e5e5e5] mb-2">Error: Datos incompletos</h2>
          <p className="text-sm text-[#737373]">
            {!project ? 'Proyecto no encontrado' : 'Falta información del comentario'}
          </p>
        </div>
      </div>
    );
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const estado = project.estado;

  // Parsear spec de forma segura
  let spec: MiniSpec;
  try {
    if (!project.spec) {
      throw new Error('Spec no disponible');
    }
    spec = typeof project.spec === 'string' ? JSON.parse(project.spec) : project.spec;
    // Validar que spec tenga las propiedades necesarias
    if (!spec.objetivo) spec.objetivo = 'No disponible';
    if (!spec.alcance) spec.alcance = 'No disponible';
    if (!spec.criteriosAceptacion) spec.criteriosAceptacion = [];
    if (!spec.fueraDeAlcance) spec.fueraDeAlcance = [];
  } catch (error) {
    console.error('Error parsing spec:', error, project.spec);
    spec = {
      objetivo: 'No disponible',
      alcance: 'No disponible',
      criteriosAceptacion: [],
      fueraDeAlcance: [],
    };
  }

  async function handleCopyText() {
    const text = `Proyecto #${project.number} - ${project.comment.commentText}

Propuesto por @${project.comment.tiktokHandle}

Estado: ${estado.label}`;

    await navigator.clipboard.writeText(text);
  }

  async function handleExportPNG() {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#000000',
      });

      const link = document.createElement('a');
      link.download = `proyecto-${project.number}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Error al exportar la imagen');
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header con breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-xs text-[#737373] hover:text-[#a3a3a3] transition-colors mb-4 inline-block">
          ← Volver
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-[#737373]">#{project.number}</span>
          <span 
            className="text-xs font-medium px-2 py-0.5 border rounded"
            style={{
              color: estado.color,
              borderColor: estado.borderColor,
            }}
          >
            {estado.label}
          </span>
        </div>
        <h1 className="text-2xl font-medium text-[#e5e5e5] mb-3">
          {project.comment.commentText}
        </h1>
        <p className="text-sm text-[#737373]">
          Propuesto por <span className="text-[#a3a3a3]">@{project.comment.tiktokHandle}</span>
        </p>
      </div>

      {/* Contenido encapsulado */}
      <div className="border border-[#262626] rounded-lg p-8 space-y-12">
        {/* Requisitos técnicos */}
        <div>
          <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">Requisitos técnicos</h2>
          <div className="space-y-6">
            <div className="pb-6 border-b border-[#1a1a1a]">
              <h3 className="text-sm font-medium text-[#a3a3a3] mb-3">Objetivo</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{spec.objetivo}</p>
            </div>
            <div className="pb-6 border-b border-[#1a1a1a]">
              <h3 className="text-sm font-medium text-[#a3a3a3] mb-3">Alcance</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{spec.alcance}</p>
            </div>
            <div className="pb-6 border-b border-[#1a1a1a]">
              <h3 className="text-sm font-medium text-[#a3a3a3] mb-3">Criterios de aceptación</h3>
              <ul className="space-y-2">
                {spec.criteriosAceptacion.map((criterio, idx) => (
                  <li key={idx} className="text-sm text-[#737373] flex items-start gap-2">
                    <span className="text-[#404040] mt-1">•</span>
                    <span>{criterio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#a3a3a3] mb-3">Fuera de alcance</h3>
              <ul className="space-y-2">
                {spec.fueraDeAlcance.map((item, idx) => (
                  <li key={idx} className="text-sm text-[#737373] flex items-start gap-2">
                    <span className="text-[#404040] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Videos */}
        {project.videos && project.videos.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">Videos</h2>
            <div className="space-y-8">
              {project.videos.map((video) => (
                <div key={video.id} className="pb-8 border-b border-[#1a1a1a] last:border-0">
                  <VideoEmbed url={video.url} title={video.title} />
                  {video.description && (
                    <p className="text-xs text-[#737373] mt-3">{video.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tarjeta shareable */}
        <div>
          <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">Tarjeta shareable</h2>
          <div className="flex justify-center mb-4">
            <div
              ref={cardRef}
              className="bg-black border border-[#1a1a1a] rounded-lg p-12 max-w-2xl w-full text-center"
            >
              <div className="text-5xl font-bold mb-4 text-[#e5e5e5]">
                Proyecto #{project.number}
              </div>
              <div className="text-2xl font-medium mb-6 text-[#a3a3a3]">
                {project.comment.commentText}
              </div>
              <div className="text-base mb-4 text-[#737373]">
                Propuesto por <span className="font-medium text-[#a3a3a3]">@{project.comment.tiktokHandle}</span>
              </div>
              <div 
                className="inline-block px-4 py-1.5 rounded text-sm font-medium mb-6 border"
                style={{
                  color: estado.color,
                  borderColor: estado.borderColor,
                }}
              >
                {estado.label}
              </div>
              <div className="text-base text-[#404040] italic">
                Mañana elegimos el siguiente.
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleCopyText}
              className="text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
            >
              Copiar texto
            </button>
            <button
              onClick={handleExportPNG}
              className="text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
            >
              Exportar PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

