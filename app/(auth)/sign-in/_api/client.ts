import { clientFetch } from '@/app/_utils/client-fetch';

interface LoginUser {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roleId: number;
  statusId: number;
}

export const loginUserClient = async (body: LoginUser) => {
  const res = await clientFetch('/account/login/', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  } else {
    return res.text();
  }
};

export const getUserInfo = async () => {
  const res = await clientFetch('/user/logged', {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('User not logged in');
  } else {
    return res.json() as Promise<UserInfo>;
  }
};
