'use client';

import { useCookies } from 'next-client-cookies';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { getUserInfo } from '../(auth)/sign-in/_api/client';
import { UseStoredUserInfo } from './zustand';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const updateUserInfoStore = UseStoredUserInfo((state) => state.update);
  const pathName = usePathname();
  const router = useRouter();
  const cookies = useCookies();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserInfo();
        updateUserInfoStore(data);
      } catch (e) {
        cookies.remove('session');
      }
    }
    fetchData();

    return () => {};
  }, [updateUserInfoStore, router, pathName, cookies]);

  return <>{children}</>;
};

export default CheckAuth;
