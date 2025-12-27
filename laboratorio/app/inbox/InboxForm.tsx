'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function InboxForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tiktokHandle: '',
    commentText: '',
    videoUrl: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ tiktokHandle: '', commentText: '', videoUrl: '' });
        router.refresh();
      }
    } catch (error) {
      console.error('Error al guardar comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div>
          <label htmlFor="handle" className="block text-sm font-medium mb-1">
            TikTok Handle
          </label>
          <input
            type="text"
            id="handle"
            required
            value={formData.tiktokHandle}
            onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
            placeholder="@pepe"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Comentario
          </label>
          <textarea
            id="comment"
            required
            rows={4}
            value={formData.commentText}
            onChange={(e) => setFormData({ ...formData, commentText: e.target.value })}
            placeholder="Pega aquí el comentario de TikTok..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
            URL del video (opcional)
          </label>
          <input
            type="url"
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://tiktok.com/..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar en Inbox'}
        </button>
      </div>
    </form>
  );
}

