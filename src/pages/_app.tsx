import { AuthProvider } from '@/app/providers/auth/authProvider';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { PostServiceProvider } from '@/services/PostService';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <CategoryServiceProvider>
                <PostServiceProvider>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </PostServiceProvider>
            </CategoryServiceProvider>
        </RecoilRoot>
    );
}
