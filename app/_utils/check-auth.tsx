'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { getUserInfo } from '../(auth)/sign-in/_api/client';
import { toast } from './use-toast';
import { UseStoredUserInfo } from './zustand';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const updateUserInfoStore = UseStoredUserInfo((state) => state.update);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (
        pathName === '/sign-in' ||
        pathName === '/sign-up' ||
        pathName === '/'
      )
        return;
      const data = await getUserInfo();
      if (!data) {
        toast({ description: 'Your login session expired.' });
        router.push('/sign-in');
      }
      updateUserInfoStore(data);
    }
    fetchData();

    return () => {};
  }, [updateUserInfoStore, router, pathName]);

  return <>{children}</>;
};

export default CheckAuth;
