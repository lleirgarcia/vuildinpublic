'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  isCandidateToday: boolean;
  spec: string | null;
}

export function CommentActions({ comment }: { comment: Comment }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function toggleCandidate() {
    setIsLoading('candidate');
    try {
      await fetch(`/api/comments/${comment.id}/toggle-candidate`, {
        method: 'POST',
      });
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(null);
    }
  }

  async function generateSpec() {
    setIsLoading('spec');
    try {
      await fetch(`/api/comments/${comment.id}/generate-spec`, {
        method: 'POST',
      });
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(null);
    }
  }

  async function createProject() {
    setIsLoading('project');
    try {
      const response = await fetch(`/api/comments/${comment.id}/create-project`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        router.push(`/projects/${data.projectId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={toggleCandidate}
        disabled={isLoading !== null}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          comment.isCandidateToday
            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        } disabled:opacity-50`}
      >
        {comment.isCandidateToday ? 'Quitar candidato' : 'Marcar candidato de hoy'}
      </button>
      <button
        onClick={generateSpec}
        disabled={isLoading !== null || comment.spec !== null}
        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 transition-colors"
      >
        {comment.spec ? 'Spec generado ✓' : isLoading === 'spec' ? 'Generando...' : 'Generar spec'}
      </button>
      <button
        onClick={createProject}
        disabled={isLoading !== null || !comment.spec}
        className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {isLoading === 'project' ? 'Creando...' : 'Crear proyecto'}
      </button>
    </div>
  );
}

