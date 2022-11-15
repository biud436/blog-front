import { API_URL } from '@/app/api/request';
import { useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from '../useSWRUtility';

export default (postId: number) => {
    const random = useRef(Date.now());
    const { data: raw, error } = useSWR(
        [`${API_URL}/posts/` + postId, random],
        fetcher,
        {
            refreshInterval: 1000 * 60 * 1, // 1분
        },
    );

    return { raw, error };
};
