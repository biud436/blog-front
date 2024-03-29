/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { IRequestHandler } from '@/types/IRequest';
import axios, { AxiosInstance } from 'axios';
import { API_URL } from './request';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

type Optional<T> = T | null;

/**
 * @help https://axios-http.com/kr/docs/config_defaults
 */
export namespace AxiosManager {
    let axiosInstance: Optional<AxiosInstance> = null;
    let isReady = false;

    export function createAxiosInstance({
        AUTH_TOKEN,
    }: {
        AUTH_TOKEN: string;
    }) {
        if (!axiosInstance) {
            axiosInstance = axios.create({
                timeout: 3000,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            isReady = true;
        }

        return axiosInstance;
    }

    export function setAccessToken({ token }: { token: string }) {
        if (axiosInstance) {
            // empty
        }
    }

    export function removeAxiossInstance() {
        axiosInstance = null;
        isReady = false;
    }

    export function getAxiosInstance(token: string): Optional<AxiosInstance> {
        if (!isReady) {
            createAxiosInstance({ AUTH_TOKEN: token });
        } else {
            setAccessToken({ token });
        }
        return axiosInstance;
    }
}

/**
 * Create an axios handler using common axios instance.
 *
 * @author Jinseok Eo
 */
export const RequestHandler: IRequestHandler<
    unknown,
    Record<string, unknown>
> = {
    request: async (url, payload) => {
        return (
            await axios.post(url, payload, {
                withCredentials: true,
            })
        ).data;
    },
    auth: {
        logout: async (url, token) => {
            const res = await AxiosManager.getAxiosInstance(token)!.post(
                url,
                null,
                {
                    withCredentials: true,
                },
            );

            return res.data;
        },
    },
    get: async (url, token) => {
        const res = await AxiosManager.getAxiosInstance(token)!.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return res.data;
    },
    post: async (url, token, payload) => {
        const res = await AxiosManager.getAxiosInstance(token)!.post(
            url,
            payload,
            {
                withCredentials: true,
            },
        );

        return res.data;
    },
    getUser: async (url, token) => {
        const res = await AxiosManager.getAxiosInstance(token)!.get(url, {
            withCredentials: true,
        });

        return res.data;
    },
    handlerType: 'axios',
};
