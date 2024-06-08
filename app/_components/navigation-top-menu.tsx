'use client';

import {
  CircleUserRound,
  FileStackIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getUserInfo } from '../(auth)/sign-in/_api/client';
import { UseStoredUserInfo } from '../_utils/zustand';
import { Button } from './button';

export function NavigationTopMenu() {
  const router = useRouter();
  const cookies = useCookies();
  const [isTeacher, setIsTeacher] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const isLogged = cookies.get('session') ? true : false;

  useEffect(() => {
    const checkIfTeacher = async () => {
      if (isLogged) {
        const user = await getUserInfo();
        if (user.roleId === 2) {
          setIsTeacher(true);
          if (user.statusId === 2) setIsVerified(false);
          else setIsVerified(true);
        } else {
          setIsTeacher(false);
          setIsVerified(true);
        }
      }
    };
    checkIfTeacher();
  }, [isLogged]);

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
      <div className='pl-3 flex flex-grow gap-4'>
        {isLogged && (
          <>
            {isVerified && (
              <>
                {isTeacher && (
                  <Link
                    href='/teacher-dashboard'
                    className='text-white text-center text-sm sm:text-base flex items-center hover:bg-blue-600 rounded-md pr-2 py-1'
                  >
                    <GraduationCapIcon className='pr-1 hidden sm:block' />{' '}
                    Teacher zone
                  </Link>
                )}
                <Link
                  href='/dashboard'
                  className='text-white text-sm sm:text-base flex items-center hover:bg-blue-600 rounded-md px-2 py-1'
                >
                  <LayoutDashboardIcon className='pr-1 hidden sm:block' />{' '}
                  Dashboard
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
          </>
        )}
      </div>

      <div className='mr-2'>
        {isLogged ? (
          <div className='flex items-center h-full'>
            <span className='text-white text-xs sm:text-base text-center hidden md:block'>
              {userName}
            </span>
            <Button variant='link' className='text-white' onClick={logoutUser}>
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
