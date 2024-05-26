import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const serverFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const cookieStore = cookies();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'localhost:3000';
  const session = cookieStore.get('session');

  const headers: HeadersInit = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    credentials: 'include',
    ...options.headers,
  });

  if (session) {
    headers.set('Authorization', `Bearer ${session.value}`);
  }

  let redirectPath: string | null = null;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store',
    });

    if (response.status === 401) {
      redirectPath = `/`;
    }

    return response;
  } catch (e) {
    console.error(e);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
};
