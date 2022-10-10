import { IRequestHandler } from '@/types/IRequest';

export const API_URL = 'http://localhost:3000';

// 토큰 캐시
const requestCache: { token?: string | null } = { token: null };

export function request<T = unknown>(
    url: string,
    payload: Record<string, any>,
): Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export const auth = {
    logout: (url: string, token: string) => {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
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
export function get<T = Record<string, any>>(
    url: string,
    token: string,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

/**
 * ! AUTH
 */
export function post<T = Record<string, any>>(
    url: string,
    token: string,
    payload: Record<string, any>,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
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
export function getUser<T = Record<string, any>>(
    url: string,
    token: string,
): Promise<T> {
    return new Promise((resolve, reject) => {
        requestCache.token = token;

        fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export const RequestHandler: IRequestHandler<unknown, Record<string, any>> = {
    request,
    auth,
    get,
    post,
    getUser,
    handlerType: 'request',
};
