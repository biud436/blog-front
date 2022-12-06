import axios from 'axios';
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

export function useTempPost(selectedId: number) {
    const {
        data,
        mutate: postMutate,
        error,
    } = useSWR(() => '/admin/temp/post/' + selectedId, getPost);

    return {
        post: data,
        isLoading: !error && !data,
        isError: error,
        postMutate,
    };
}
