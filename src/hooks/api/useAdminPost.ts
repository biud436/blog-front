import { API_URL } from '@/blog/api/request';
import { BlogServerResponse } from '@/models/BlogServerResponse';
import { Post } from '@/models/Post';
import { postsStore } from '@/store';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useAdminPost() {
    const pageNumber = postsStore.getPageNumber();
    const pageSize = postsStore.getPageSize();

    const { data, error } = useSWR<BlogServerResponse<Post>['data']>(
        `${API_URL}/api/post?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        fetcher,
    );

    return {
        data,
        error,
    };
}
