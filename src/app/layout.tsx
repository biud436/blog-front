'use client';

import React from 'react';
import StyledJsxRegistry from '../lib/registry';
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { GlobalStyle } from '@/styles/global-styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import useThemeStore from '@/store/theme';
import QueryProvider from '@/lib/QueryProvider';
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
              {children}
              <AlertModal />
            </ThemeProvider>
            <ToastContainer />
          </StyledJsxRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
