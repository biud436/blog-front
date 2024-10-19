'use client';

import React from 'react';
// import type { Metadata } from 'next';
import StyledJsxRegistry from '../lib/registry';
// These styles apply to every route in the application
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { GlobalStyle } from '@/styles/global-styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RootProvider } from '@/blog/components/common/RootProvider';
import { ToastContainer } from 'react-toastify';
import { rootStore } from '@/store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const notoSansKR = Noto_Sans_KR({
    weight: '100',
    display: 'swap',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                    },
                },
            }),
    );

    return (
        <html lang="en" className={notoSansKR.className}>
            <body>
                <QueryClientProvider client={queryClient}>
                    <StyledJsxRegistry>
                        <ThemeProvider theme={rootStore.themeStore.main}>
                            <CssBaseline />
                            <GlobalStyle />
                            <RootProvider>{children}</RootProvider>
                        </ThemeProvider>
                        <ToastContainer />
                    </StyledJsxRegistry>
                </QueryClientProvider>
            </body>
        </html>
    );
}
