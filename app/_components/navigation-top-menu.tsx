'use client';

import {
  CircleUserRound,
  FileStackIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { UseStoredUserInfo } from '../_utils/get-user-info';
import { Button } from './button';

export function NavigationTopMenu() {
  const router = useRouter();
  const cookies = useCookies();

  const isLogged = cookies.get('session') ? true : false;

  const userName = UseStoredUserInfo(
    (state) =>
      (state.loggedUserInfo?.name ?? '') +
      ' ' +
      (state.loggedUserInfo?.lastname ?? ''),
  );

  function logoutUser() {
    sessionStorage.removeItem('session');
    cookies.remove('session');
    router.push('/');
    router.refresh();
  }

  return (
    <nav className='flex flex-row py-1 px-4 shadow-md bg-gradient-to-tl from-blue-500 to-blue-600'>
      <div className='pl-5 flex flex-grow gap-10'>
        {isLogged && (
          <>
            <Link
              href='/dashboard'
              className='text-white text-sm sm:text-base flex items-center hover:bg-blue-600 rounded-md px-2 py-1'
            >
              <LayoutDashboardIcon className='pr-1 hidden sm:block' /> Dashboard
            </Link>
            <Link
              href='/mycourses'
              className='text-white text-sm sm:text-base flex items-center hover:bg-blue-600 rounded-md px-2 py-1'
            >
              <FileStackIcon className='pr-1 hidden sm:block' />
              My repositories
            </Link>
          </>
        )}
      </div>

      <div className='mr-3'>
        {isLogged ? (
          <div className='flex items-center h-full'>
            <span className='text-white text-xs sm:text-base text-center'>
              {userName}
            </span>
            <Button
              variant='link'
              className='text-white'
              onClick={() => {
                logoutUser();
              }}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Link
            href='/sign-in'
            className='flex items-center hover:bg-blue-600 px-2 rounded-md'
          >
            <CircleUserRound className='text-white my-2' />
          </Link>
        )}
      </div>
    </nav>
  );
}
