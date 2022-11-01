import { API_URL } from '@/app/api/request';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

export type Nullable<T> = T | null;

let _axiosInstance: Nullable<AxiosInstance> = null;
let _axiosInterceptor = {
    requestId: 0,
    responseId: 0,
};

/**
 * 인스턴스를 생성합니다.
 */
export function getAxiosInstance(): AxiosInstance {
    if (_axiosInstance === null) {
        _axiosInstance = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return _axiosInstance;
}

/**
 * 헤더에 토큰을 자동으로 추가하는 인터셉터 처리를 합니다.
 */
export function useAxiosRequestInterceptor() {
    const axiosInstance = getAxiosInstance();
    const cookie = document.cookie;
    const accessToken = cookie
        .split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith('access_token='))[0]
        .split('=')[1];

    _axiosInterceptor.requestId = axiosInstance.interceptors.request.use(
        config => {
            const token = accessToken;
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );
}

/**
 * 401 권한 오류 인터셉터를 전역적으로 설정합니다.
 */
export function useAxiosResponseInterceptor() {
    if (_axiosInstance === null) return;

    if (_axiosInterceptor.responseId > 0) {
        console.warn('Axios interceptor가 이미 설정되었습니다.');
    }

    _axiosInterceptor.responseId = _axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response.status === 401) {
                toast.error('로그인이 필요합니다.');
            }
            return Promise.reject(error);
        },
    );
}

/**
 * 인터셉터를 제거합니다.
 */
export function removeAxiosInterceptor() {
    if (_axiosInstance === null) return;

    if (_axiosInterceptor.responseId > 0) {
        _axiosInstance.interceptors.response.eject(
            _axiosInterceptor.responseId,
        );
        _axiosInterceptor.responseId = 0;
    }
}

/**
 * 액세스 토큰을 HTTP 헤더 Authorization에 설정합니다.
 */
export function setToken(token: string) {
    if (_axiosInstance) {
        _axiosInstance.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${token}`;
    }
}

/**
 * 설정된 액세스 토큰을  HTTP 헤더 Authorization에서 제거합니다.
 */
export function removeToken() {
    if (_axiosInstance) {
        _axiosInstance.defaults.headers.common['Authorization'] = '';
    }
}

/**
 * HTTP GET 요청을 보냅니다.
 *
 * @param url 요청 URL
 */
export function fetcher(url: string): Promise<any> {
    const axiosInstance = getAxiosInstance();

    return axiosInstance
        .get(url)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}

/**
 * HTTP POST 요청을 보냅니다.
 *
 * @param url
 * @param data
 * @returns
 */
export function sumitter(url: string, data: any): Promise<any> {
    const axiosInstance = getAxiosInstance();

    return axiosInstance
        .post(url, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        });
}
