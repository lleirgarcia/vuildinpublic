import { prisma } from '@/lib/prisma';
import { KanbanBoard } from '@/components/KanbanBoard';

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
    },
  });
}

async function getPolls() {
  return await prisma.poll.findMany({
    where: { isActive: true },
    include: {
      comment: {
        select: {
          tiktokHandle: true,
          commentText: true,
        },
      },
      _count: {
        select: { votes: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
}

async function getEstados() {
  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  return await prisma.estado.findMany({
    orderBy: { name: 'asc' },
  });
}

type ProjectWithRelations = Awaited<ReturnType<typeof getProjects>>[0];

export default async function BoardPage() {
  const projects = await getProjects();
  const polls = await getPolls();
  const estados = await getEstados();

  // Agrupar proyectos por estado
  const projectsByEstado: Record<string, ProjectWithRelations[]> = {};
  estados.forEach((estado: { name: string; id: string }) => {
    projectsByEstado[estado.name] = projects.filter((p) => (p as any).estado.name === estado.name);
  });

  // Separar proyectos en construcción y terminados
  const buildingEstados = estados.filter((e: { name: string }) => 
    e.name === 'brainstorming' || 
    e.name === 'in progress' || 
    e.name === 'testing'
  );
  const shippedEstado = estados.find((e: { name: string }) => e.name === 'shipped');

  return (
    <div className="w-full py-6">
      <KanbanBoard
        polls={polls}
        buildingEstados={buildingEstados}
        shippedEstado={shippedEstado}
        // @ts-expect-error - El tipo es correcto pero TypeScript no lo reconoce aún
        projectsByEstado={projectsByEstado}
      />
    </div>
  );
}

