import Link from 'next/link';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

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
  title: string;
  estado: Estado;
  comment: {
    tiktokHandle: string;
    commentText: string;
  };
  createdAt?: Date;
  changelog?: string | null;
  spec?: string;
  commentId?: string;
}

interface Poll {
  id: string;
  title: string;
  description: string | null;
  comment: {
    tiktokHandle: string;
    commentText: string;
  };
  _count: {
    votes: number;
  };
}

interface KanbanBoardProps {
  polls: Poll[];
  buildingEstados: Estado[];
  shippedEstado: Estado | undefined;
  projectsByEstado: Record<string, Project[]>;
}

export function KanbanBoard({
  polls,
  buildingEstados,
  shippedEstado,
  projectsByEstado,
}: KanbanBoardProps) {
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-6">
        <h1 className="text-xl font-medium text-[#e5e5e5]">Board</h1>
        <Link
          href="/"
          className="text-xs font-medium px-3 py-1.5 border border-[#262626] rounded text-[#a3a3a3] hover:border-[#404040] hover:text-[#e5e5e5] transition-colors"
        >
          ← Vista principal
        </Link>
      </div>

      {/* Kanban Columns - puede exceder márgenes */}
      <div className="flex gap-4 overflow-x-auto pb-4 items-start w-full">
        {/* Columna: En Votación */}
        {polls.length > 0 && (
          <KanbanColumn
            title="En Votación"
            count={polls.length}
            color="#a3a3a3"
          >
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-3 mb-2 hover:border-[#404040] transition-colors"
              >
                <h3 className="text-xs font-medium text-[#e5e5e5] mb-1.5 leading-tight">
                  {poll.title}
                </h3>
                <p className="text-xs text-[#737373] mb-2">
                  @{poll.comment.tiktokHandle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737373]">
                    {poll._count.votes} {poll._count.votes === 1 ? 'voto' : 'votos'}
                  </span>
                </div>
              </div>
            ))}
            {polls.length === 0 && (
              <div className="text-xs text-[#404040] text-center py-6">
                Sin proyectos en votación
              </div>
            )}
          </KanbanColumn>
        )}

        {/* Columnas: Estados en construcción */}
        {buildingEstados.map((estado) => {
          const estadoProjects = projectsByEstado[estado.name] || [];
          return (
            <KanbanColumn
              key={estado.id}
              title={estado.label}
              count={estadoProjects.length}
              color={estado.color}
            >
              {estadoProjects.map((project) => (
                <div key={project.id} className="mb-2">
                  <Link href={`/projects/${project.id}`} className="block">
                    <KanbanCard project={project} />
                  </Link>
                </div>
              ))}
              {estadoProjects.length === 0 && (
                <div className="text-xs text-[#404040] text-center py-6">
                  Sin proyectos
                </div>
              )}
            </KanbanColumn>
          );
        })}

        {/* Columna: Terminados */}
        {shippedEstado && (
          <KanbanColumn
            title={shippedEstado.label}
            count={projectsByEstado[shippedEstado.name]?.length || 0}
            color={shippedEstado.color}
          >
            {projectsByEstado[shippedEstado.name]?.map((project) => (
              <div key={project.id} className="mb-2">
                <Link href={`/projects/${project.id}`} className="block">
                  <KanbanCard project={project} />
                </Link>
              </div>
            ))}
            {(!projectsByEstado[shippedEstado.name] || projectsByEstado[shippedEstado.name].length === 0) && (
              <div className="text-xs text-[#404040] text-center py-6">
                Sin proyectos
              </div>
            )}
          </KanbanColumn>
        )}
      </div>
    </div>
  );
}

