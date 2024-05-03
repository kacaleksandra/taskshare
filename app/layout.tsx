import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { NavigationTopMenu } from './_components/navigation-top-menu';
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
  return (
    <html lang='en'>
      <body className={noto_sans.className}>
        <div className='flex flex-col h-screen'>
          <NavigationTopMenu />
          <div className='grow'>{children}</div>
          <div className='w-full bg-gradient-to-tr from-blue-700 to-blue-500 h-12'>
            <div className='flex justify-center items-center h-full'>
              <p className='text-white text-sm'>
                &copy; TaskShare {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
