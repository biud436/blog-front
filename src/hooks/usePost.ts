import { API_URL } from '@/blog/api/request';
import { PostContext } from '@/services/PostService';
import { Post } from '@/store/post';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import useSWR, { Key, Fetcher } from 'swr';
import usePosts from './api/usePosts';
import { usePostService } from './usePostService';
import { fetcher } from './useSWRUtility';

export function usePost(postId: number) {
    const [post, setPost] = useState<Post>(Object.create(null));
    const service = usePostService();
    const { raw, error } = usePosts(postId);

    if (service === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }

    useEffect(() => {
        if (error) {
            console.log(error);
        }

        if (raw) {
            const res = raw;
            const message = res.message;
            const statusCode = res.statusCode;
            const result = res.result;
            const data = res.data as Post;

            setPost(data);
            service.setData(data);
        }
    }, [raw, error]);

    return { post, error };
}
