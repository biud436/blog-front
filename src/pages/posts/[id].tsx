/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ErrorBoundary } from '@/blog/components/error/ErrorBoundary';
import { PostPage } from '@/blog/pages/post';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { Post } from '@/models/Post';
import { ErrorComponent } from '@/containers/ErrorFoundPage';
import { API_URL, CacheControl } from '@/blog/api/request';

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

    return (
        <ErrorBoundary>
            <PostPage
                {...{
                    post: post,
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

    /**
     * Extract thumbnail from post.images
     * @param post
     */
    const extractThumbnail = (post: Post) => {
        if (post.images && post.images.length > 0) {
            post.thumbnail = post.images[0].path;
        }
    };

    const requestDataUsingFetch = async () => {
        const hasCookie = !!context.req.headers.cookie;

        try {
            const res = await fetch(API_URL + '/posts/' + id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    ...CacheControl.NoCache,
                    ...(hasCookie
                        ? { Cookie: context.req.headers.cookie }
                        : {}),
                },
            });

            if (res.ok) {
                const data = await res.json();
                post = data.data as Post;
                extractThumbnail(post);
            }
        } catch (e: any) {
            error = {
                message: 'Error occurred while fetching data',
                status: 500,
            };
        }
    };

    await requestDataUsingFetch();

    return {
        props: {
            post,
            error,
        },
    };
};
