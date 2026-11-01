import React from 'react';
import './globals.css';
import '../styles/blog.css';
import { JetBrains_Mono, Noto_Sans_KR } from 'next/font/google';
import type { Metadata } from 'next';
import Providers from './Providers';
import { themeInitScript } from '@/components/blog/theme';

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${jetbrainsMono.variable} ${notoSansKR.className}`}
      suppressHydrationWarning
    >
      <head>
        {/* 첫 페인트 전에 라이트/다크 테마를 적용해 깜빡임을 막습니다. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
