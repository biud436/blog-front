/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ErrorBoundary } from '@/blog/components/error/boundary';
import { PostPage } from '@/blog/pages/post';

import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { Post } from '@/store/post';
import useSWR, { unstable_serialize } from 'swr';
import { ErrorComponent } from '@/containers/ErrorFoundPage';

export interface ServerError {
    message: string;
    status: number;
}

export interface PostsProps {
    id: string;
    post: Post;
    error: ServerError;
}

export default function Posts({
    post,
    error,
}: {
    post: Post;
    error: ServerError;
}) {
    if (error) {
        return (
            <ErrorComponent
                message={error.message}
                statusCode={error.status ?? 500}
            />
        );
    }

    const { data: postFromSWR } = useSWR(['/posts', post.id], () =>
        axios.get(`/posts/${post.id}`).then(res => res.data.data),
    );

    return (
        <ErrorBoundary>
            <PostPage
                {...{
                    post: postFromSWR || post,
                    id: String(post.id),
                    error: error,
                }}
            />
        </ErrorBoundary>
    );
}

/**
 * Next에서는 미리 텍스트를 HTML로 내보내고, 자바스크립트는 이후에 hydrated 됩니다.
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const { id } = context.query;
    let post = {} as Post;
    let error: ServerError | null = null;

    const extractThumbnail = (post: Post) => {
        if (post.images && post.images.length > 0) {
            post.thumbnail = post.images[0].path;
        }
    };

    try {
        // 쿠키가 있는지 확인
        const hasCookie = !!context.req.headers.cookie;

        const { data: res } = await axios.get('/posts/' + id, {
            withCredentials: true,
            headers: {
                ...(hasCookie
                    ? {
                          Cookie: context.req.headers.cookie,
                      }
                    : {}),
            },
        });

        post = res.data as Post;

        extractThumbnail(post);
    } catch (e: any) {
        error = {
            message: e.response.data.message,
            status: e.response.status,
        };
    }

    return {
        props: {
            post,
            error,
            [unstable_serialize(['posts', id])]: post,
        },
    };
};
