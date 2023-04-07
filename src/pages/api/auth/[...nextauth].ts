/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

interface User {
    username: string;
    scope: string[];
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Insert your username',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(
                credentials:
                    | Record<'username' | 'password', string>
                    | undefined,
                req: Pick<
                    RequestInternal,
                    'body' | 'query' | 'headers' | 'method'
                >,
            ) {
                try {
                    if (!credentials) throw new Error('Invalid credentials');

                    const { username, password } = credentials;

                    // 로그인
                    const res = await axios.post('/auth/login', {
                        username,
                        password,
                    });

                    // 브라우저에서는 쿠키가 자동으로 설정되지만 NextAuth에서는 설정되지 않는다.
                    // 커스텀 쿠키를 직접 설정을 해야 프로필을 가져올 수 있는데, 이렇게 하면 NextAuth를 사용하는 의미가 없어진다.
                    // 이 라이브러리는 구글 로그인이나 깃허브 로그인 등 소셜 로그인 등을 제공할 때 사용하면 좋을 것 같다.
                    const cookie = req.headers!.cookie;

                    if (res.data.statusCode >= 400) {
                        throw res;
                    }

                    const { data: profile } = await axios.get('/auth/profile', {
                        headers: {
                            Cookie: cookie,
                        },
                    });

                    return {
                        id: profile.id,
                        name: profile.username,
                    };
                } catch (error: AxiosError | unknown) {
                    if (axios.isAxiosError(error)) {
                        const response = error.response! as Record<string, any>;

                        if (response.data.statusCode === 401) {
                            const UNKNOWN_ERROR = 'Invalid credentials';
                            throw new Error(
                                response.data.message ?? UNKNOWN_ERROR,
                            );
                        }
                    }

                    throw new Error((error as any)?.message);
                }
            },
        }),
    ],
    cookies: {},
    callbacks: {
        async jwt({ token }) {
            return token;
        },
    },
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
};

export default NextAuth(authOptions);
