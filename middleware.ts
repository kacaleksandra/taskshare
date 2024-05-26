import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { notRestrictedPaths } from './app/_utils/not-restricted-paths';

export async function middleware(request: NextRequest) {
  const isLogged = request.cookies.get('session') ? true : false;

  if (!isLogged && !notRestrictedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  } else if (isLogged) {
    if (
      request.nextUrl.pathname === '/sign-in' ||
      request.nextUrl.pathname === '/sign-up' ||
      request.nextUrl.pathname === '/'
    )
      return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|ui|).*)'],
};
