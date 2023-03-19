/* eslint-disable @typescript-eslint/no-explicit-any */
export type IRequest<T = unknown> = (
    url: string,
    payload: Record<string, any>,
) => Promise<T>;

export type IAuth<T> = {
    logout: (url: string, token: string) => Promise<T>;
};

export type IGet<T = Record<string, any>> = (
    url: string,
    token: string,
) => Promise<T>;

export type IPost<T = Record<string, any>> = (
    url: string,
    token: string,
    payload: Record<string, any>,
) => Promise<T>;

export type IGetUser<T = Record<string, any>> = (
    url: string,
    token: string,
) => Promise<T>;

export type IRequestHandler<T = unknown, R = Record<string, any>> = {
    request: IRequest<T>;
    auth: IAuth<T>;
    get: IGet<R>;
    post: IPost<R>;
    getUser: IGetUser<R>;
    handlerType: 'axios' | 'request';
};
