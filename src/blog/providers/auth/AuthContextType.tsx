/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserPayload } from '@/models/UserPayload';
import { HttpMethod } from './authProvider';

export interface AuthContextType {
    user: UserPayload;
    login: (
        username: string,
        password: string,
        successCallback: VoidFunction,
    ) => Promise<any>;
    logout: (
        successCallback: VoidFunction,
        absolutlyExecutor?: () => void,
    ) => void;
    refreshAuth: (
        successCallback: VoidFunction,
        errorCallback: VoidFunction,
    ) => Promise<boolean>;
    requestData: (
        method: HttpMethod,
        fetchUrl: string,
        payload?: Record<string, any> | null,
    ) => Promise<any>;
}
