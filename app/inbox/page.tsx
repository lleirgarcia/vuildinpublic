import { prisma } from '@/lib/prisma';
import { InboxForm } from './InboxForm';
import { CommentActions } from './CommentActions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getComments() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`[InboxPage] Found ${comments.length} comments`);
    return comments;
  } catch (error) {
    console.error('[InboxPage] Error fetching comments:', error);
    return [];
  }
}

export default async function InboxPage() {
  const comments = await getComments();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Inbox (copy/paste)</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Pega aquí los comentarios de TikTok que quieras considerar para el Laboratorio.
        </p>
      </div>

      <div className="mb-8">
        <InboxForm />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Comentarios guardados</h3>
        {comments.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No hay comentarios guardados aún.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      @{comment.tiktokHandle}
                    </span>
                    {comment.isCandidateToday && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium">
                        Candidato de hoy
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {comment.commentText}
                  </p>
                  {comment.videoUrl && (
                    <a
                      href={comment.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                    >
                      Ver video →
                    </a>
                  )}
                </div>
                <CommentActions comment={comment} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

