import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin-auth';
const COOKIE_VALUE = 'authenticated';

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_NAME);
    return authCookie?.value === COOKIE_VALUE;
  } catch {
    return false;
  }
}

