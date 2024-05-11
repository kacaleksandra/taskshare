'use client';

import {
  CircleUserRound,
  FileStackIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import Link from 'next/link';

export function NavigationTopMenu() {
  return (
    <nav className='flex flex-row py-1 px-4 shadow-md bg-gradient-to-tl from-blue-500 to-blue-600'>
      <div className='pl-5 flex flex-grow gap-10'>
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
      </div>
      <div className='hover:bg-blue-600 px-2 rounded-md'>
        <Link href='/sign-in'>
          <CircleUserRound className='text-white my-2' />
        </Link>
      </div>
    </nav>
  );
}
