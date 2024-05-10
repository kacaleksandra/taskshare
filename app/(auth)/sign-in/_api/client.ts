import { clientFetch } from '@/app/_utils/client-fetch';

interface LoginUser {
  email: string;
  password: string;
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
