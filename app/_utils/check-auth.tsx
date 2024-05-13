'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { getUserInfo } from '../(auth)/sign-in/_api/client';
import { UseStoredUserInfo } from './get-user-info';
import { notRestrictedPaths } from './not-restricted-paths';
import { toast } from './use-toast';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const updateUserInfoStore = UseStoredUserInfo((state) => state.update);

  const isLogged = sessionStorage.getItem('token');

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
          sessionStorage.removeItem('token');
          router.push('/sign-in');
        }
        updateUserInfoStore(data);
      }
    }

    fetchData();

    return () => {};
  }, [currentPath, isLogged, updateUserInfoStore, router]);

  return <>{children}</>;
};

export default CheckAuth;
