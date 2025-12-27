import { config } from '@/lib/config';

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4 mt-4">
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
          {/* Cuadrado con borde blanco (simula el cuadrado negro del logo) */}
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
          {/* Nota musical blanca - forma de S más precisa */}
          {/* Cabeza de la nota (oval superior izquierdo) */}
          <ellipse
            cx="9.5"
            cy="8"
            rx="2"
            ry="2.5"
            fill="white"
          />
          {/* Tallo curvo en forma de S */}
          <path
            d="M9.5 10.5C9.5 10.5 10.5 9.5 12 9.5C13.5 9.5 14.5 10.5 14.5 12C14.5 13.5 13.5 14.5 12 14.5C10.5 14.5 9.5 15.5 9.5 17"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Flag de la nota (triángulo apuntando a la derecha) */}
          <path
            d="M14.5 17L17 14.5L17 19.5L14.5 17Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  );
}

