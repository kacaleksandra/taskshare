'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { getUserInfo } from './get-user-info';
import { notRestrictedPaths } from './not-restricted-paths';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const userInfo = getUserInfo();

  const router = useRouter();
  const currentPath = usePathname();

  if (!userInfo && !notRestrictedPaths.includes(currentPath)) {
    router.push('/sign-in');
    return null;
  }

  return <>{children}</>;
};

export default CheckAuth;
