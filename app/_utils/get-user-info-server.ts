import { serverFetch } from './server-fetch';

interface GetUserInfoResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roleId: number;
}

export async function getUserInfoServer() {
  const res = await serverFetch('/user/logged');

  if (res && res.ok) {
    const userInfo = await res.json();
    return userInfo as GetUserInfoResponse;
  } else {
    throw new Error('Failed to fetch user info');
  }
}
