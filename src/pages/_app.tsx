import { AuthProvider } from '@/app/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostServiceProvider } from '@/services/PostService';
import { GlobalStyle } from '@/styles/global-styles';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Noto_Sans_KR } from '@next/font/google';

const notoSansKR = Noto_Sans_KR({
    weight: '100',
    display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={notoSansKR.className}>
            <RecoilRoot>
                <GlobalStyle />
                <CategoryServiceProvider>
                    <PostServiceProvider>
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </PostServiceProvider>
                </CategoryServiceProvider>
            </RecoilRoot>
        </main>
    );
}
