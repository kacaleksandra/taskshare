'use client';

import {
  CircleUserRound,
  FileStackIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import Link from 'next/link';
import { create } from 'zustand'

type LoggedUserInfo = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  roleId: 2 | 3;
};

export type UserInfoStore = {
  loggedUserInfo: LoggedUserInfo | null;
  clear: () => void;
  update: (userInfo: LoggedUserInfo) => void;
};

export const useStoredUserInfo = create<UserInfoStore>((set) => ({
  loggedUserInfo: null,
  clear: () => set({ loggedUserInfo: null }),
  update: (newUserInfo) => set({ loggedUserInfo: newUserInfo }),
}));
export function NavigationTopMenu() {
  const userName = useStoredUserInfo((state)=> (state.loggedUserInfo?.name ?? '') + (state.loggedUserInfo?.lastname ?? ''));
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
        <Link href='/sign-in' className='flex items-center'>
          {userName ? (
            <span className='text-white text-sm sm:text-base pr-3'>
              {userName}
            </span>
          ) : null}
          <CircleUserRound className='text-white my-2' />
        </Link>
      </div>
    </nav>
  );
}
