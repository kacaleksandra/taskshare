'use client';

import {
  CircleUserRound,
  FileStackIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import Link from 'next/link';

import { UseStoredUserInfo } from '../_utils/get-user-info';

export function NavigationTopMenu() {
  const userName = UseStoredUserInfo(
    (state) =>
      (state.loggedUserInfo?.name ?? '') +
      ' ' +
      (state.loggedUserInfo?.lastname ?? ''),
  );

  console.log(userName);

  return (
    <nav className='flex flex-row py-1 px-4 shadow-md bg-gradient-to-tl from-blue-500 to-blue-600'>
      <div className='pl-5 flex flex-grow gap-10'>
        {userName && (
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

      <div className='hover:bg-blue-600 px-2 rounded-md'>
        {userName === '' ? (
          <div className='flex items-center h-full'>
            <span className='text-white text-sm sm:text-base pr-3 text-center'>
              {userName}
            </span>
          </div>
        ) : (
          <Link href='/sign-in' className='flex items-center'>
            <CircleUserRound className='text-white my-2' />
          </Link>
        )}
      </div>
    </nav>
  );
}
