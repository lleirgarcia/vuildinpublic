import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'p4p4LL0n4';
const COOKIE_NAME = 'admin-auth';
const COOKIE_VALUE = 'authenticated';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 horas

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Contraseña incorrecta' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al autenticar' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);

  if (authCookie?.value === COOKIE_VALUE) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);

  return NextResponse.json({ success: true });
}

