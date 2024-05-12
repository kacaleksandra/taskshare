'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { notRestrictedPaths } from './not-restricted-paths';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const isLogged = sessionStorage.getItem('token');

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (!isLogged && !notRestrictedPaths.includes(currentPath)) {
      router.push('/sign-in');
    }

    return () => {};
  }, [currentPath, isLogged, router]);

  return <>{children}</>;
};

export default CheckAuth;
