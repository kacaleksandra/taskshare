'use client';

import { useCookies } from 'next-client-cookies';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { getUserInfo } from '../(auth)/sign-in/_api/client';
import { UseStoredUserInfo } from './get-user-info';
import { notRestrictedPaths } from './not-restricted-paths';
import { toast } from './use-toast';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const cookies = useCookies();
  const updateUserInfoStore = UseStoredUserInfo((state) => state.update);

  const isLogged = cookies.get('session') ? true : false;

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    async function fetchData() {
      if (!isLogged && !notRestrictedPaths.includes(currentPath)) {
        router.push('/sign-in');
      } else if (isLogged) {
        const data = await getUserInfo();
        if (!data) {
          toast({ description: 'Your login session expired.' });
          cookies.remove('session');
          router.push('/sign-in');
        }
        if (
          currentPath === '/sign-in' ||
          currentPath === '/sign-up' ||
          currentPath === '/'
        ) {
          router.push('/dashboard');
        }
        updateUserInfoStore(data);
      }
    }
    fetchData();

    return () => {};
  }, [currentPath, isLogged, updateUserInfoStore, router, cookies]);

  return <>{children}</>;
};

export default CheckAuth;
