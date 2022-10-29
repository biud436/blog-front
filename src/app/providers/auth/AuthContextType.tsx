import { User } from 'store/types';
import { HttpMethod } from './authProvider';

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
