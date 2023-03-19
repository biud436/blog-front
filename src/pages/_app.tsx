import React from 'react';
import { AuthProvider } from '@/blog/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostServiceProvider } from '@/services/PostService';
import { GlobalStyle } from '@/styles/global-styles';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Noto_Sans_KR } from '@next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline } from '@mui/material';

const notoSansKR = Noto_Sans_KR({
    weight: '100',
    display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={notoSansKR.className}>
            <RecoilRoot>
                <CssBaseline />
                <GlobalStyle />
                <CategoryServiceProvider>
                    <PostServiceProvider>
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </PostServiceProvider>
                </CategoryServiceProvider>
                <ToastContainer />
            </RecoilRoot>
        </main>
    );
}
