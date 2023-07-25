import { IRequestHandler } from '@/types/IRequest';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

export const API_URL = config.backendUrl;

export type HttpRawHeader = Record<string, string>;
export interface ICacheControl {
    NoCache: HttpRawHeader;
    NoStore: HttpRawHeader;
    ForceCache: HttpRawHeader;
    Empty: HttpRawHeader;
}

export const CacheControl: ICacheControl = {
    NoCache: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
    },
    NoStore: {
        'Cache-Control': 'no-store',
        Pragma: 'no-cache',
    },
    ForceCache: {
        'Cache-Control': 'no-cache no-store must-revalidate',
        Pragma: 'no-cache',
    },
    Empty: {},
};

// 토큰 캐시
const requestCache: { token?: string | null } = { token: null };

export function request<T = unknown>(
    url: string,
    payload: Record<string, unknown>,
): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export const auth = {
    logout: (url: string) => {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    },
};

/**
 * ! AUTH
 */
export function get<T = Record<string, unknown>>(
    url: string,
    token: string,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

/**
 * ! AUTH
 */
export function post<T = Record<string, unknown>>(
    url: string,
    token: string,
    payload: Record<string, unknown>,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

/**
 * 사용자 정보를 가져옵니다
 *
 * @param url
 * @param token
 * @returns
 */
export function getUser<T = Record<string, unknown>>(
    url: string,
    token: string,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export const RequestHandler: IRequestHandler<
    unknown,
    Record<string, unknown>
> = {
    request,
    auth,
    get,
    post,
    getUser,
    handlerType: 'request',
};
