/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export type AuthSwrType = {
    METHODS: 'GET' | 'POST' | 'PATCH' | 'DELETE';
};
export type HttpMethod = AuthSwrType['METHODS'];

export const fetcher = url =>
    axios.get(url).then(res => {
        const result = res.data.result;

        if (result !== 'success') {
            const error = {
                message: res.data.message,
                status: res.status,
            };
            throw error;
        }

        return res.data;
    });

/**
 * 인증 처리를 위한 SWR
 * @param method
 * @param url
 * @param data
 * @returns
 */
export const fetcherWithAuth = (
    url: string,
    method: HttpMethod,
    accessToken: string,
    data?: Record<string, any> | undefined,
) => {
    if (method === 'GET' && data) {
        throw new Error('GET method cannot have a body content');
    }

    return axios.request({
        url,
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data,
    });
};
