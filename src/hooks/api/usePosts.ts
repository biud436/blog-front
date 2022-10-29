import { API_URL } from '@/app/api/request';
import useSWR from 'swr';
import { fetcher } from '../useSWRUtility';

export default (postId: number) => {
    const { data: raw, error } = useSWR(`${API_URL}/posts/` + postId, fetcher);

    return { raw, error };
};
