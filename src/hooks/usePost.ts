import { API_URL } from '@/app/api/request';
import { PostContext } from '@/services/PostService';
import { Post } from '@/store/post';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import useSWR, { Key, Fetcher } from 'swr';

const fetcher = url =>
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

export function usePost(postId: number) {
    const [post, setPost] = useState<Post>(Object.create(null));
    const service = useContext(PostContext);
    const { data: raw, error } = useSWR(`${API_URL}/posts/` + postId, fetcher);

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
