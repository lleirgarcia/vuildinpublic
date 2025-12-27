'use client';

import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  title: string;
  tiktokHandle: string;
  status?: string;
  showStatus?: boolean;
  showVoteButton?: boolean;
  voteCount?: number;
  onVote?: () => void;
  isVoting?: boolean;
  href?: string;
}

const statusLabels: Record<string, string> = {
  brainstorming: 'Brainstorming',
  'in progress': 'In Progress',
  testing: 'Testing',
  shipped: 'Shipped',
};

export function ProjectCard({
  id,
  title,
  tiktokHandle,
  status,
  showStatus = false,
  showVoteButton = false,
  voteCount,
  onVote,
  isVoting = false,
  href,
}: ProjectCardProps) {
  const content = (
    <div className="pb-6 border-b border-[#1a1a1a]">
      <div className="flex items-center gap-3 mb-2">
        <p className="text-lg font-medium text-[#e5e5e5] group-hover:text-white transition-colors">
          {title}
        </p>
        {showStatus && status && (
          <span className="text-xs font-medium text-[#737373] px-2 py-0.5 border border-[#262626] rounded">
            {statusLabels[status] || status}
          </span>
        )}
      </div>
      <p className="text-xs text-[#737373] mb-3">
        @{tiktokHandle}
      </p>
      {showVoteButton && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#737373]">
            {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onVote?.();
            }}
            disabled={isVoting}
            className={`text-xs font-medium px-2 py-1 border rounded transition-colors ${
              isVoting
                ? 'text-[#737373] border-[#262626] cursor-wait'
                : 'text-[#a3a3a3] border-[#262626] hover:border-[#404040] hover:text-[#e5e5e5]'
            }`}
          >
            {isVoting ? 'Votando...' : 'Votar'}
          </button>
        </div>
      )}
    </div>
  );

  if (href && !showVoteButton) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return <div className="block group">{content}</div>;
}

