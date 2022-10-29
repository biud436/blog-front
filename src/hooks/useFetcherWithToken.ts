import { useCookies } from 'react-cookie';
import useSWR, { Key } from 'swr';
import { HttpMethod, fetcherWithAuth } from './useSWRUtility';

export const useFetcherWithToken = (
    method: HttpMethod,
    key: Key,
    body?: Record<string, any> | undefined,
) => {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const { data, error, mutate } = useSWR(
        [key, method, accessToken, body],
        fetcherWithAuth,
    );

    return {
        data,
        error,
        mutate,
    };
};
