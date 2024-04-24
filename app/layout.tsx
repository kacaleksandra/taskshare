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
        <NavigationTopMenu />
        <div>{children}</div>
      </body>
    </html>
  );
}
