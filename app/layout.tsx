import { QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import { Noto_Sans } from 'next/font/google';

import { NavigationTopMenu } from './_components/navigation-top-menu';
import { Toaster } from './_components/toaster';
import CheckAuth from './_utils/check-auth';
import ReactQueryProvider from './_utils/react-query-provider';
import './globals.css';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TaskShare',
  description: 'Your platform for task sharing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang='en'>
      <body className={noto_sans.className}>
        <ReactQueryProvider>
          <CookiesProvider>
            <div className='flex flex-col h-screen'>
              <NavigationTopMenu />
              <div className='grow'>
                <CheckAuth>{children}</CheckAuth>
              </div>
              <div className='w-full bg-gradient-to-tr from-blue-700 to-blue-500 h-12'>
                <div className='flex justify-center items-center h-full py-4 '>
                  <p className='text-white text-sm '>
                    &copy; TaskShare {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
            <Toaster />
          </CookiesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
