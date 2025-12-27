'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VoteIcon } from '@/components/VoteIcon';
import { ProjectCard } from '@/components/ProjectCard';

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

export function PollSection({ polls }: { polls: Poll[] }) {
  const router = useRouter();
  const [voting, setVoting] = useState<string | null>(null);

  async function handleVote(pollId: string) {
    setVoting(pollId);
    try {
      const response = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVoting(null);
    }
  }

  if (polls.length === 0) {
    return (
      <div>
        <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase flex items-center gap-2">
          <VoteIcon />
          Votar proyecto
        </h2>
        <div className="text-center py-8">
          <p className="text-xs text-[#737373]">
            No hay proyectos para votar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase flex items-center gap-2">
        <VoteIcon />
        Votar proyecto
      </h2>
      <div className="space-y-6">
        {polls.map((poll) => {
          const voteCount = poll._count.votes;
          
          return (
            <ProjectCard
              key={poll.id}
              id={poll.id}
              title={poll.title}
              tiktokHandle={poll.comment.tiktokHandle}
              showStatus={false}
              showVoteButton={true}
              voteCount={voteCount}
              onVote={() => handleVote(poll.id)}
              isVoting={voting === poll.id}
            />
          );
        })}
      </div>
    </div>
  );
}

