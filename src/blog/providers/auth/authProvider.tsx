import { auth } from '@/blog/api/request';
import * as React from 'react';
import { useEffect } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from 'store/user';
import { toast } from 'react-toastify';
import { AxiosManager, RequestHandler } from '@/blog/api/axios';
import Loading from '../../components/atomic/Loading';
import { LoginResponse } from './LoginResponse';
import { StatusCode } from './StatusCode';
import { AuthContextType } from './AuthContextType';
import { observer } from 'mobx-react-lite';
import { URL_MAP } from '@/common/URL';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = observer(
    ({ children }: { children: React.ReactNode }) => {
        let [user, setUser] = useRecoilState(userState);
        const [cookies, setCookie, removeCookie] = useCookies(['username']);

        /**
         * 로그인 요청
         *
         * @param username
         * @param password
         * @param successCallback
         * @returns
         */
        const login: AuthContextType['login'] = async (
            username: string,
            password: string,
            successCallback: VoidFunction,
        ) => {
            let res: LoginResponse;

            try {
                res = (await RequestHandler.request(`/auth/login`, {
                    username,
                    password,
                })) as LoginResponse;

                if (res!.statusCode >= 400) {
                    throw res;
                }
            } catch (e: any) {
                toast.dismiss();
                toast.error(e.response ? e.response.data.message : e.message, {
                    position: 'top-center',
                });
                return res!;
            }

            toast.dismiss();
            toast.info('프로필 정보를 가져오는 중입니다...', {
                isLoading: true,
                position: 'top-center',
            });

            try {
                const acceptedStatusCode = [
                    StatusCode.SUCCESS,
                    StatusCode.NO_CONTENT,
                ];
                if (acceptedStatusCode.includes(res!.statusCode)) {
                    toast.dismiss();
                    setCookie('username', username);

                    toast.info('정보를 확인하고 있습니다...', {
                        isLoading: true,
                        position: 'top-center',
                    });
                    const profile = await RequestHandler.get(
                        '/auth/profile',
                        '',
                    );
                    setUser(profile.user);
                } else {
                    toast.error(res!.message, {
                        position: 'top-center',
                    });
                }

                successCallback();
            } catch (e: any) {
                toast.error(e.message);
            }

            return res!.data;
        };

        /**
         * 로그아웃 요청
         *
         * @param callback
         */
        const logout: AuthContextType['logout'] = async (
            successCallback: VoidFunction,
            absolutlyExecutor?: () => void,
        ) => {
            try {
                const res = (await auth.logout(
                    `/auth/logout`,
                    '',
                )) as LoginResponse;

                // 로그인 상태 제거
                localStorage.removeItem('isLoggedIn');

                removeCookie('username');
                setUser({
                    username: '',
                    scope: [],
                });
                await RequestHandler.auth.logout(`/auth/logout`, '');
                AxiosManager.removeAxiossInstance();

                successCallback();
            } catch (e: any) {
                if (!absolutlyExecutor) {
                    successCallback();
                } else {
                    absolutlyExecutor();
                }
            }
        };

        /**
         * 인증 처리
         *
         * @param callback
         * @returns
         */
        const refreshAuth: AuthContextType['refreshAuth'] = async (
            successCallback: VoidFunction,
            errorCallback: VoidFunction,
        ) => {
            try {
                const token = '';

                if (token === '') {
                    return false;
                }

                if (!AxiosManager.getAxiosInstance(token)) {
                    AxiosManager.createAxiosInstance({
                        AUTH_TOKEN: token,
                    });
                }

                const profile = await RequestHandler.getUser(
                    '/auth/profile',
                    token,
                );
                if (profile) {
                    setUser(profile.user);
                    // successCallback();
                    return true;
                }
                return false;
            } catch (e: any) {
                // if (errorCallback) {
                //     errorCallback();
                // }
                return false;
            }
        };

        /**
         * 데이터 요청 처리
         *
         * @param method
         * @param fetchUrl
         * @param payload
         * @returns
         */
        const requestData: AuthContextType['requestData'] = async (
            method: HttpMethod,
            fetchUrl: string,
            payload?: Record<string, any> | null,
        ) => {
            const token = '';

            switch (method.toLowerCase()) {
                case 'get':
                    return RequestHandler.get(fetchUrl, token);
                case 'post':
                    return RequestHandler.post(fetchUrl, token, payload!);
                default:
                    throw new Error('Your request method is not supported yet');
            }
        };

        let value = { user, login, logout, refreshAuth, requestData };

        return (
            <CookiesProvider>
                <AuthContext.Provider value={value}>
                    {children}
                </AuthContext.Provider>
            </CookiesProvider>
        );
    },
);

/**
 * AuthContext 사용
 * @returns
 */
export function useAuth() {
    return React.useContext(AuthContext);
}
