import { prisma } from '@/lib/prisma';

async function getTopInteracciones() {
  // Obtener todos los comentarios y mensajes para contar interacciones por usuario
  const comments = await prisma.comment.findMany({
    select: { tiktokHandle: true },
  });
  
  const messages = await prisma.message.findMany({
    select: { tiktokHandle: true, likes: true },
  });

  // Contar interacciones por usuario
  const userInteractions: Record<string, number> = {};
  
  // Cada comentario cuenta como 1 interacción
  comments.forEach(comment => {
    userInteractions[comment.tiktokHandle] = (userInteractions[comment.tiktokHandle] || 0) + 1;
  });
  
  // Cada like en mensajes cuenta como 1 interacción
  messages.forEach(message => {
    userInteractions[message.tiktokHandle] = (userInteractions[message.tiktokHandle] || 0) + message.likes;
  });

  // Convertir a array y ordenar
  const topInteracciones = Object.entries(userInteractions)
    .map(([handle, count]) => ({ handle, count }))
    .sort((a, b) => b.count - a.count);

  return topInteracciones;
}

async function getTopComentariosTikTok() {
  // Contar comentarios por usuario
  const comments = await prisma.comment.findMany({
    select: { tiktokHandle: true },
  });

  const commentCounts: Record<string, number> = {};
  
  comments.forEach(comment => {
    commentCounts[comment.tiktokHandle] = (commentCounts[comment.tiktokHandle] || 0) + 1;
  });

  // Convertir a array y ordenar
  const topComentarios = Object.entries(commentCounts)
    .map(([handle, count]) => ({ handle, count }))
    .sort((a, b) => b.count - a.count);

  return topComentarios;
}

async function getTopSeguimiento() {
  // Personas que dejan feedback: mensajes + votos
  const messages = await prisma.message.findMany({
    select: { tiktokHandle: true },
  });
  
  const votes = await prisma.vote.findMany({
    select: { tiktokHandle: true },
  });

  const feedbackCounts: Record<string, number> = {};
  
  // Cada mensaje cuenta como 1
  messages.forEach(message => {
    feedbackCounts[message.tiktokHandle] = (feedbackCounts[message.tiktokHandle] || 0) + 1;
  });
  
  // Cada voto cuenta como 1
  votes.forEach(vote => {
    feedbackCounts[vote.tiktokHandle] = (feedbackCounts[vote.tiktokHandle] || 0) + 1;
  });

  // Convertir a array y ordenar
  const topSeguimiento = Object.entries(feedbackCounts)
    .map(([handle, count]) => ({ handle, count }))
    .sort((a, b) => b.count - a.count);

  return topSeguimiento;
}

export default async function InteraccionesPage() {
  const topInteracciones = await getTopInteracciones();
  const topComentarios = await getTopComentariosTikTok();
  const topSeguimiento = await getTopSeguimiento();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#e5e5e5] mb-2">Interacciones</h1>
        <p className="text-sm text-[#737373]">
          Rankings de participación en la comunidad
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Interacciones */}
        <div>
          <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">
            Top interacciones
          </h2>
          {topInteracciones.length === 0 ? (
            <p className="text-sm text-[#737373]">
              Aún no hay interacciones registradas.
            </p>
          ) : (
            <div className="space-y-1">
              {topInteracciones.map((user, index) => (
                <div
                  key={user.handle}
                  className="flex items-center justify-between py-2 px-1 hover:bg-[#0a0a0a] transition-colors rounded"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#404040] w-4 text-right">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[#a3a3a3]">
                      @{user.handle}
                    </span>
                  </div>
                  <span className="text-xs text-[#404040]">
                    {user.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Comentarios en TikTok */}
        <div>
          <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">
            Top comentarios en TikTok
          </h2>
          {topComentarios.length === 0 ? (
            <p className="text-sm text-[#737373]">
              Aún no hay comentarios registrados.
            </p>
          ) : (
            <div className="space-y-1">
              {topComentarios.map((user, index) => (
                <div
                  key={user.handle}
                  className="flex items-center justify-between py-2 px-1 hover:bg-[#0a0a0a] transition-colors rounded"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#404040] w-4 text-right">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[#a3a3a3]">
                      @{user.handle}
                    </span>
                  </div>
                  <span className="text-xs text-[#404040]">
                    {user.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Seguimiento */}
        <div>
          <h2 className="text-sm font-medium text-[#a3a3a3] mb-6 tracking-wide uppercase">
            Top seguimiento
          </h2>
          {topSeguimiento.length === 0 ? (
            <p className="text-sm text-[#737373]">
              Aún no hay feedback registrado.
            </p>
          ) : (
            <div className="space-y-1">
              {topSeguimiento.map((user, index) => (
                <div
                  key={user.handle}
                  className="flex items-center justify-between py-2 px-1 hover:bg-[#0a0a0a] transition-colors rounded"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#404040] w-4 text-right">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[#a3a3a3]">
                      @{user.handle}
                    </span>
                  </div>
                  <span className="text-xs text-[#404040]">
                    {user.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

