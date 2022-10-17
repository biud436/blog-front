import { auth } from 'app/api/request';
import * as React from 'react';
import { useEffect } from 'react';
import { useCookies, CookiesProvider } from 'react-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from 'store/user';
import { toast } from 'react-toastify';
import { AxiosManager, RequestHandler } from 'app/api/axios';
import { User } from 'store/types';
import Loading from '../components/Loading';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface AuthContextType {
    user: User;
    login: (
        username: string,
        password: string,
        successCallback: VoidFunction,
    ) => Promise<any>;
    logout: (
        successCallback: VoidFunction,
        absolutlyExecutor?: () => void,
    ) => void;
    refreshAuth: (successCallback: VoidFunction) => Promise<boolean>;
    requestData: (
        method: HttpMethod,
        fetchUrl: string,
        payload?: Record<string, any> | null,
    ) => Promise<any>;
}

export interface LoginResponse {
    message: string;
    statusCode: number;
    result: 'success' | 'failure';
    data: {
        access_token: string;
        refresh_token: string;
    };
}

export enum StatusCode {
    SUCCESS = 200,
    NO_CONTENT = 204,
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = useRecoilState(userState);
    const [cookies, setCookie, removeCookie] = useCookies([
        'access_token',
        'username',
    ]);

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
                throw new Error(res.message);
            }
        } catch (e: any) {
            toast.error(e.message);
            return res!;
        }

        try {
            const acceptedStatusCode = [
                StatusCode.SUCCESS,
                StatusCode.NO_CONTENT,
            ];
            if (acceptedStatusCode.includes(res!.statusCode)) {
                const { access_token } = res!.data as any;

                setCookie('access_token', access_token);
                setCookie('username', username);

                const profile = await RequestHandler.get(
                    '/auth/profile',
                    access_token,
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
            const token = cookies.access_token;
            const res = (await auth.logout(
                `/auth/logout`,
                token,
            )) as LoginResponse;
            removeCookie('access_token');

            // 로그인 상태 제거
            localStorage.removeItem('isLoggedIn');

            removeCookie('username');
            setUser({
                username: '',
                scope: [],
            });
            await RequestHandler.auth.logout(`/auth/logout`, token);
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
        errorCallback?: VoidFunction,
    ) => {
        try {
            const token = cookies.access_token;

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
            setUser(profile.user);

            successCallback();

            return true;
        } catch (e: any) {
            if (errorCallback) {
                errorCallback();
            }
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
        const token = cookies.access_token;

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
}

/**
 * AuthContext 사용
 * @returns
 */
export function useAuth() {
    return React.useContext(AuthContext);
}

/**
 * 인증 필드 설정
 *
 * @param param0
 * @returns
 */
export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [user] = useRecoilState(userState);
    const [isReady, setIsReady] = React.useState(false);
    const [cookies] = useCookies(['access_token', 'username']);

    useEffect(() => {
        const storedUserName = cookies.username;
        if (storedUserName) {
            auth.refreshAuth(() => {
                setIsReady(true);
                navigate(location.pathname);
            });
        }
    }, [cookies.username]);

    if (!user || !isReady) {
        return cookies.username ? (
            <Loading />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    }

    if (user.username === '') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
