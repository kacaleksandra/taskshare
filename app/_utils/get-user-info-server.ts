import { serverFetch } from './server-fetch';

export async function getUserInfoServer() {
  const res = await serverFetch('/user/logged');

  if (res && res.ok) {
    const userInfo = await res.json();
    return userInfo;
  } else {
    throw new Error('Failed to fetch user info');
  }
}
