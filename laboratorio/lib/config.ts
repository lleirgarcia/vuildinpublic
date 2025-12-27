/**
 * Configuración centralizada de la aplicación
 */

export const config = {
  // Prefijo para comentarios de participación
  commentPrefix: '_VP_',
  
  // URLs de redes sociales
  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '#',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || '#',
  },
  
  // URL del último video de TikTok (puede venir de la BD o ser estático)
  lastTikTokVideoUrl: process.env.NEXT_PUBLIC_LAST_TIKTOK_VIDEO_URL || '#',
} as const;

