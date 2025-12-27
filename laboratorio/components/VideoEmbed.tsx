'use client';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export function VideoEmbed({ url, title }: VideoEmbedProps) {
  // Detectar tipo de plataforma
  const getVideoType = (url: string): 'youtube' | 'tiktok' | 'instagram' | 'unknown' => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('instagram.com')) return 'instagram';
    return 'unknown';
  };

  const videoType = getVideoType(url);

  // Extraer ID de YouTube
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Extraer ID de TikTok
  const getTikTokId = (url: string): string | null => {
    const match = url.match(/tiktok\.com\/.+\/video\/(\d+)/);
    return match ? match[1] : null;
  };

  // Extraer shortcode de Instagram
  const getInstagramShortcode = (url: string): string | null => {
    const match = url.match(/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/);
    return match ? match[2] : null;
  };

  if (videoType === 'youtube') {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    
    return (
      <div className="w-full">
        {title && (
          <h3 className="text-sm font-medium text-[#e5e5e5] mb-3">{title}</h3>
        )}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full border border-[#262626] rounded"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || 'YouTube video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (videoType === 'tiktok') {
    const videoId = getTikTokId(url);
    if (!videoId) return null;

    return (
      <div className="w-full">
        {title && (
          <h3 className="text-sm font-medium text-[#e5e5e5] mb-3">{title}</h3>
        )}
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={videoId}
          style={{ maxWidth: '100%', minWidth: '325px' }}
        >
          <section>
            <a
              target="_blank"
              title={`@tiktok`}
              href={url}
              rel="noopener noreferrer"
            >
              {title || 'Ver en TikTok'}
            </a>
          </section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js"></script>
      </div>
    );
  }

  if (videoType === 'instagram') {
    const shortcode = getInstagramShortcode(url);
    if (!shortcode) return null;

    return (
      <div className="w-full">
        {title && (
          <h3 className="text-sm font-medium text-[#e5e5e5] mb-3">{title}</h3>
        )}
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#000',
            border: '1px solid #262626',
            borderRadius: '4px',
            margin: '0 auto',
            maxWidth: '100%',
            minWidth: '326px',
            padding: 0,
            width: 'calc(100% - 2px)',
          }}
        >
          <div style={{ padding: '16px' }}>
            <a
              href={url}
              style={{
                background: '#000',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title || 'Ver en Instagram'}
            </a>
          </div>
        </blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
      </div>
    );
  }

  // Fallback para URLs desconocidas
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-medium text-[#e5e5e5] mb-3">{title}</h3>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] rounded p-4"
      >
        {title || 'Ver video'} →
      </a>
    </div>
  );
}

