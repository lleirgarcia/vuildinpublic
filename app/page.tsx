import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { config } from '@/lib/config';
import { ConstructionIcon } from '@/components/ConstructionIcon';
import { ShippedIcon } from '@/components/ShippedIcon';
import { PollSection } from '@/components/PollSection';
import { ProjectCard } from '@/components/ProjectCard';

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { number: 'desc' },
    include: {
      // @ts-expect-error - estado existe en el schema pero TypeScript no lo reconoce aún
      estado: true,
      comment: {
        select: {
          tiktokHandle: true,
          commentText: true,
        },
      },
      messages: {
        orderBy: { likes: 'desc' },
        take: 1,
      },
    },
  });
}

async function getTopUsers() {
  // Obtener todos los comentarios y mensajes para contar interacciones por usuario
  const comments = await prisma.comment.findMany({
    select: { tiktokHandle: true },
  });
  
  const messages = await prisma.message.findMany({
    select: { tiktokHandle: true, likes: true },
  });

  // Contar interacciones por usuario
  const userInteractions: Record<string, number> = {};
  
  // Cada comentario cuenta como 1 interacción
  comments.forEach(comment => {
    userInteractions[comment.tiktokHandle] = (userInteractions[comment.tiktokHandle] || 0) + 1;
  });
  
  // Cada like en mensajes cuenta como 1 interacción
  messages.forEach(message => {
    userInteractions[message.tiktokHandle] = (userInteractions[message.tiktokHandle] || 0) + message.likes;
  });

  // Convertir a array y ordenar
  const topUsers = Object.entries(userInteractions)
    .map(([handle, count]) => ({ handle, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return topUsers;
}

async function getPolls() {
  return await prisma.poll.findMany({
    where: { isActive: true },
    include: {
      comment: true,
      _count: {
        select: { votes: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
}

type ProjectWithEstado = Awaited<ReturnType<typeof getProjects>>[0];

export default async function Home() {
  const projects = await getProjects();
  const topUsers = await getTopUsers();
  const polls = await getPolls();
  
  const buildingProjects = projects.filter((p: ProjectWithEstado) => 
    (p as any).estado.name === 'brainstorming' || 
    (p as any).estado.name === 'in progress' || 
    (p as any).estado.name === 'testing'
  );
  const preparedProjects = projects.filter((p: ProjectWithEstado) => (p as any).estado.name === 'prepared');
  const shippedProjects = projects.filter((p: ProjectWithEstado) => (p as any).estado.name === 'shipped');

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Introducción y Participar */}
      <div className="pt-8 pb-10 border-b border-[#1a1a1a]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Parte izquierda: ¿Qué es vuild in public? */}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-[#a3a3a3] mb-4 tracking-wide uppercase">
              ¿Qué es vuild in public?
            </h2>
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6 flex-1">
              <p className="text-sm text-[#e5e5e5] leading-relaxed">
                Construimos software basado en feedback de redes sociales (Youtube, Instagram, TikTok) usando IA. 
                Cada episodio nace de propuestas de la comunidad. Puedes ver lo que estamos construyendo, votar por próximos proyectos y seguir el progreso en tiempo real. 
                Proyectos pequeños, no grandes aplicaciones.
              </p>
              <p className="text-sm text-[#e5e5e5] leading-relaxed mt-4">
                Síguenos, aprende y mira lo que creamos.
              </p>
            </div>
          </div>

          {/* Parte derecha: ¿Quieres formar parte? */}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-[#a3a3a3] mb-4 tracking-wide uppercase">
              ¿Quieres formar parte?
            </h2>
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6 flex-1">
              <p className="text-sm text-[#e5e5e5] leading-relaxed">
                Para participar, necesitas dejar un comentario en el{' '}
                <a 
                  href={config.lastTikTokVideoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#a3a3a3] hover:text-white underline transition-colors"
                >
                  último video de TikTok
                </a>
                . El comentario debe empezar por <span className="font-mono font-semibold text-white">{config.commentPrefix}</span> seguido de lo que te gustaría que construyamos.
              </p>
              <p className="text-xs text-[#737373] mt-3 leading-relaxed">
                Ejemplo: <span className="font-mono text-[#a3a3a3]">{config.commentPrefix} Una aplicación para gestionar mis tareas diarias</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16">
        {/* Columna principal - En construcción y Votar proyecto */}
        <div className="lg:col-span-2 space-y-16">
          {/* 1. Proyecto en construcción */}
              {buildingProjects.length > 0 && (
                <div className="pt-4">
                  <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase flex items-center gap-2">
                    <ConstructionIcon />
                    En construcción
                  </h2>
                  <div className="space-y-6">
                    {buildingProjects.map((project) => {
                      const projectWithRelations = project as any;
                      return (
                        <ProjectCard
                          key={project.id}
                          id={project.id}
                          title={project.title}
                          tiktokHandle={projectWithRelations.comment.tiktokHandle}
                          estado={projectWithRelations.estado}
                          showStatus={true}
                          href={`/projects/${project.id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

          {/* 2. Proyectos preparados */}
              {preparedProjects.length > 0 && (
                <div className="pt-4">
                  <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase flex items-center gap-2">
                    Preparados
                  </h2>
                  <div className="space-y-6">
                    {preparedProjects.map((project) => {
                      const projectWithRelations = project as any;
                      return (
                        <ProjectCard
                          key={project.id}
                          id={project.id}
                          title={project.title}
                          tiktokHandle={projectWithRelations.comment.tiktokHandle}
                          estado={projectWithRelations.estado}
                          showStatus={true}
                          href={`/projects/${project.id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

          {/* 3. Votar proyecto - mismo ancho que En construcción */}
          <div className="pt-4">
            <PollSection polls={polls} />
          </div>
        </div>

        {/* Sidebar - Top 10 y Terminados */}
        <div className="lg:col-span-1">
          <div className="sticky space-y-16" style={{ top: '56px' }}>
            {/* Top 10 */}
            <div className="pt-4">
              <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">Top 10 interacciones</h2>
              {topUsers.length === 0 ? (
                <p className="text-sm text-[#737373]">
                  Aún no hay interacciones registradas.
                </p>
              ) : (
                <div className="space-y-1">
                  {topUsers.map((user, index) => (
                    <div
                      key={user.handle}
                      className="flex items-center justify-between py-2 px-1 hover:bg-[#0a0a0a] transition-colors rounded"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-[#404040] w-4 text-right">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-[#a3a3a3]">
                          @{user.handle}
                        </span>
                      </div>
                      <span className="text-xs text-[#404040]">
                        {user.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terminados */}
            {shippedProjects.length > 0 && (
              <div className="pt-4">
                <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase flex items-center gap-2">
                  <ShippedIcon />
                  Terminados
                </h2>
                <div className="space-y-4">
                  {shippedProjects.map((project) => {
                    const projectWithRelations = project as any;
                    const estado = projectWithRelations.estado;
                    return (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block group"
                      >
                        <div className="pb-4 border-b border-[#1a1a1a]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-[#737373]">#{project.number}</span>
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
                          <p className="text-sm font-medium text-[#e5e5e5] mb-1 group-hover:text-white transition-colors">
                            {project.title}
                          </p>
                          <p className="text-xs text-[#737373]">
                            @{projectWithRelations.comment.tiktokHandle}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
