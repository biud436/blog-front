import axios, { AxiosResponse } from 'axios';
import useSWR, { mutate } from 'swr';

const getPost = (url: string) => {
    return axios.get(url).then(res => res.data);
};

export function useTempPostList() {
    const { data, mutate, error } = useSWR('/admin/temp/post', getPost);

    return {
        posts: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

export interface TempPost {
    id: number;
    title: string;
    content: string;
    checksum: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export function useTempPost(selectedId: number) {
    const {
        data,
        mutate: postMutate,
        error,
    } = useSWR(() => '/admin/temp/post/' + selectedId, getPost);

    return {
        post: data as AxiosResponse<TempPost>,
        isLoading: !error && !data,
        isError: error,
        postMutate,
    };
}
