import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getUserInfoServer } from './app/_utils/get-user-info-server';
import { notRestrictedPaths } from './app/_utils/not-restricted-paths';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const isLogged = sessionCookie !== undefined;
  const { pathname } = request.nextUrl;

  // If not logged in and trying to access restricted paths, redirect to sign-in
  if (!isLogged && !notRestrictedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If logged in, query the user's info
  if (isLogged) {
    try {
      const data = await getUserInfoServer();

      // If the user is waiting for approval and not already on the /waiting-for-approval page, redirect
      if (
        data.statusId === 2 &&
        data.roleId === 2 &&
        pathname !== '/waiting-for-approval'
      ) {
        return NextResponse.redirect(
          new URL('/waiting-for-approval', request.url),
        );
      }

      // If the user is logged in and tries to access public paths, redirect to dashboard
      if (['/sign-in', '/sign-up', '/'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // If no redirect is needed, just continue to the requested path
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|ui).*)'],
};
