'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  tiktokHandle: string;
  commentText: string;
  videoUrl: string | null;
  isCandidateToday: boolean;
  createdAt: Date;
  user: {
    email: string | null;
    name: string | null;
  } | null;
}

export function CommentsManager({
  initialComments,
}: {
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const toggleCandidate = async (commentId: string, currentValue: boolean) => {
    setLoading(commentId);
    try {
      const res = await fetch(`/api/comments/${commentId}/toggle-candidate`, {
        method: 'POST',
      });

      if (res.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, isCandidateToday: !currentValue }
              : c
          )
        );
        router.refresh();
      } else {
        alert('Error al actualizar el comentario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el comentario');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">
          Comentarios ({comments.length})
        </h2>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-[#262626] rounded-lg p-6 bg-[#0a0a0a]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">{comment.tiktokHandle}</span>
                  {comment.isCandidateToday && (
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded border border-yellow-500/30">
                      Candidato de hoy
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#a3a3a3] mb-2">
                  {comment.commentText}
                </p>
                {comment.videoUrl && (
                  <a
                    href={comment.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#737373] hover:text-[#a3a3a3] underline"
                  >
                    {comment.videoUrl}
                  </a>
                )}
                <p className="text-xs text-[#404040] mt-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleCandidate(comment.id, comment.isCandidateToday)}
                disabled={loading === comment.id}
                className={`px-4 py-2 rounded text-sm transition-colors disabled:opacity-50 ${
                  comment.isCandidateToday
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-500 border border-green-500/30 hover:bg-green-500/30'
                }`}
              >
                {loading === comment.id
                  ? '...'
                  : comment.isCandidateToday
                  ? 'Quitar Candidato'
                  : 'Marcar Candidato'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

