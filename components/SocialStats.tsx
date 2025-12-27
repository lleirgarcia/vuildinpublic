import { config } from '@/lib/config';
import { prisma } from '@/lib/prisma';

export async function SocialStats() {
  // Obtener estadísticas desde la base de datos
  // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
  const socialStat = await prisma.socialStat.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  // Valores por defecto si no hay datos en la BD
  const totalFollowers = socialStat?.totalFollowers ?? 125000;
  const monthlyGrowth = socialStat?.monthlyGrowth ?? 12.5;
  const weeklyGrowth = socialStat?.weeklyGrowth ?? 3.2;
  const startDate = socialStat?.startDate ?? new Date('2024-01-01');
  
  // Calcular días transcurridos desde la fecha de inicio
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="border-b border-[#1a1a1a] bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Parte izquierda: estadísticas */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#737373]">@vuildinginpublic</span>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Días desde inicio */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737373]">Días online</span>
                <span className="text-sm font-medium text-[#e5e5e5]">
                  {daysSinceStart}
                </span>
              </div>

              {/* Seguidores totales */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737373]">Seguidores totales</span>
                <span className="text-sm font-medium text-[#e5e5e5]">
                  {totalFollowers.toLocaleString()}
                </span>
              </div>

              {/* Crecimiento último mes */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737373]">Último mes</span>
                <span className="text-sm font-medium text-green-500">
                  +{monthlyGrowth}%
                </span>
              </div>

              {/* Crecimiento última semana */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737373]">Última semana</span>
                <span className="text-sm font-medium text-green-500">
                  +{weeklyGrowth}%
                </span>
              </div>
            </div>
          </div>

          {/* Parte derecha: redes sociales */}
          <div className="flex items-center gap-4">
            {/* YouTube */}
            <a
              href={config.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="YouTube"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 7.5C23 6.5 22.5 5.5 21.5 5.3C20 5 12 5 12 5S4 5 2.5 5.3C1.5 5.5 1 6.5 1 7.5V16.5C1 17.5 1.5 18.5 2.5 18.7C4 19 12 19 12 19S20 19 21.5 18.7C22.5 18.5 23 17.5 23 16.5V7.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15L16 12L10 9V15Z"
                  fill="white"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="17"
                  cy="7"
                  r="1"
                  fill="white"
                />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={config.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="TikTok"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="4"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
                <ellipse
                  cx="9.5"
                  cy="8"
                  rx="2"
                  ry="2.5"
                  fill="white"
                />
                <path
                  d="M9.5 10.5C9.5 10.5 10.5 9.5 12 9.5C13.5 9.5 14.5 10.5 14.5 12C14.5 13.5 13.5 14.5 12 14.5C10.5 14.5 9.5 15.5 9.5 17"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 17L17 14.5L17 19.5L14.5 17Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

