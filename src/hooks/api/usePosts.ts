import { API_URL } from '@/blog/api/request';
import { useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from '../useSWRUtility';

export const EVERY_1_MINUTE = 1000 * 60 * 1;
export default (postId: number) => {
    const random = useRef(Date.now());
    const { data: raw, error } = useSWR(
        [`${API_URL}/posts/` + postId, random],
        fetcher,
        {
            refreshInterval: EVERY_1_MINUTE, // 1분
        },
    );

    return { raw, error };
};
