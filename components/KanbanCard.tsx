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
}

interface KanbanCardProps {
  project: Project;
}

export function KanbanCard({ project }: KanbanCardProps) {
  return (
    <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-3 hover:border-[#404040] transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-xs font-medium text-[#e5e5e5] flex-1 leading-tight">
          {project.title}
        </h3>
        <span 
          className="text-xs font-medium px-1.5 py-0.5 border rounded flex-shrink-0"
          style={{
            color: project.estado.color,
            borderColor: project.estado.borderColor,
          }}
        >
          #{project.number}
        </span>
      </div>
      <p className="text-xs text-[#737373]">
        @{project.comment.tiktokHandle}
      </p>
    </div>
  );
}

