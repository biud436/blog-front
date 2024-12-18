'use client';

import React from 'react';
// import type { Metadata } from 'next';
import StyledJsxRegistry from '../lib/registry';
// These styles apply to every route in the application
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { GlobalStyle } from '@/styles/global-styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RootProvider } from '@/components/common/RootProvider';
import { ToastContainer } from 'react-toastify';

import useThemeStore from '@/store/theme';
import QueryProvider from '@/providers/QueryProvider';
import { AlertModal } from '@/components/common/AlertModal';

const notoSansKR = Noto_Sans_KR({
  weight: '100',
  display: 'swap',
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const mainTheme = useThemeStore(state => state.getMain());

  return (
    <html lang="en" className={notoSansKR.className}>
      <body>
        <QueryProvider>
          <StyledJsxRegistry>
            <ThemeProvider theme={mainTheme}>
              <CssBaseline />
              <GlobalStyle />
              <RootProvider>{children}</RootProvider>
              <AlertModal />
            </ThemeProvider>
            <ToastContainer />
          </StyledJsxRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
