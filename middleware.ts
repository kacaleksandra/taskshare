import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { notRestrictedPaths } from './app/_utils/not-restricted-paths';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const isLogged = sessionCookie !== undefined;

  const { pathname } = request.nextUrl;

  if (!isLogged && !notRestrictedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isLogged && ['/sign-in', '/sign-up', '/'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If no redirect is needed, just continue to the requested path
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|ui).*)'],
};
