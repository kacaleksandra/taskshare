export const clientFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const token = sessionStorage.getItem('session');

  const headers: HeadersInit = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    credentials: 'include',
    ...options.headers,
  });

  if (headers.get('Content-Type') === 'multipart/form-data')
    headers.delete('Content-Type');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  return response;
};
