import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin-auth';
const COOKIE_VALUE = 'authenticated';

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_NAME);
    return authCookie?.value === COOKIE_VALUE;
  } catch {
    return false;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 403 }
    );
  }

  try {
    const { type } = await params;
    const { url } = await request.json();

    // Por ahora, retornamos un mensaje de que el script está en desarrollo
    // Aquí puedes integrar tus scripts reales de recogida de comentarios

    if (type === 'youtube') {
      // TODO: Integrar script de YouTube
      return NextResponse.json({
        success: true,
        output: `Script de YouTube en desarrollo.\nURL recibida: ${url}\n\nPara implementar, crea el script en scripts/collect-youtube.ts`,
        commentsCollected: 0,
      });
    }

    if (type === 'tiktok') {
      // TODO: Integrar script de TikTok
      return NextResponse.json({
        success: true,
        output: `Script de TikTok en desarrollo.\nURL recibida: ${url}\n\nPara implementar, crea el script en scripts/collect-tiktok.ts`,
        commentsCollected: 0,
      });
    }

    return NextResponse.json(
      { error: 'Tipo de script no válido' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error running script:', error);
    return NextResponse.json(
      { error: 'Error al ejecutar el script' },
      { status: 500 }
    );
  }
}

