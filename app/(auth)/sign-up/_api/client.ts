import { clientFetch } from '@/app/_utils/client-fetch';

interface RegisterUser {
  email: string;
  name: string;
  lastname: string;
  password: string;
  confirmedPassword: string;
  roleId: number;
}

export const registerUserClient = async (body: RegisterUser) => {
  const res = await clientFetch('/account/register/', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    return err;
  }
};
