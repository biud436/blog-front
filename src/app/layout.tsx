import React from 'react';
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import type { Metadata } from 'next';
import Providers from './Providers';

const notoSansKR = Noto_Sans_KR({
  weight: '100',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '블로그',
  description: '개발 블로그',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={notoSansKR.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
