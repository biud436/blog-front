import { useAuth } from '@/app/providers/authProvider';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

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

export const fetcherWithAuth = (
    method: HttpMethod,
    url: string,
    data: Record<string, any> | undefined,
) => {
    const { user } = useAuth();
    const [cookies] = useCookies(['access_token']);

    const accessToken = cookies.access_token;

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

export const useFetcher = (method: HttpMethod) => {
    const { user } = useAuth();
    const [cookies, setCookie, removeCookie] = useCookies([
        'access_token',
        'username',
    ]);
    const [headers, setHeaders] = useState({
        headers: {
            Authorization: `Bearer ${cookies.access_token}`,
        },
    });

    return async (
        method: 'get' | 'post' | 'patch' | 'delete',
        url: string,
        params: Record<string, any>,
    ) => {
        const res = await axios.get(url, {
            params: {},
        });
    };
};
