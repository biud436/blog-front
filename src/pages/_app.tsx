import React from 'react';
import { GlobalStyle } from '@/styles/global-styles';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { Noto_Sans_KR } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RootProvider } from '../blog/components/common/RootProvider';
import '../styles/globals.css';
import { rootStore } from '@/store';

const notoSansKR = Noto_Sans_KR({
    weight: '100',
    display: 'swap',
    subsets: ['latin'],
});

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={notoSansKR.className}>
            <RecoilRoot>
                <ThemeProvider theme={rootStore.themeStore.main}>
                    <CssBaseline />
                    <GlobalStyle />
                    <RootProvider>
                        <Component {...pageProps} />
                    </RootProvider>
                </ThemeProvider>
                <ToastContainer />
            </RecoilRoot>
        </main>
    );
}
