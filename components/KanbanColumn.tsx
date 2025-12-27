interface KanbanColumnProps {
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}

export function KanbanColumn({ title, count, color, children }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-64">
      <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-3 min-h-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1a1a1a]">
          <h2 
            className="text-xs font-medium tracking-wide uppercase"
            style={{ color }}
          >
            {title}
          </h2>
          <span 
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{ 
              color,
              backgroundColor: `${color}15`, // 15% opacity
            }}
          >
            {count}
          </span>
        </div>

        {/* Cards */}
        <div className="space-y-0">
          {children}
        </div>
      </div>
    </div>
  );
}

