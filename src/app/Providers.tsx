'use client';

import React from 'react';
import StyledJsxRegistry from '../lib/registry';
import { GlobalStyle } from '@/styles/global-styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import useThemeStore from '@/store/theme';
import QueryProvider from '@/lib/QueryProvider';
import { AlertModal } from '@/components/common/AlertModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  const mainTheme = useThemeStore(state => state.getMain());

  return (
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
  );
}
