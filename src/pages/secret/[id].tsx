/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ErrorBoundary } from '@/blog/components/error/boundary';
import { PostPage } from '@/blog/pages/post';
import axios from 'axios';
import useSWR from 'swr';
import { ErrorComponent } from '@/containers/ErrorFoundPage';
import { useRouter } from 'next/router';

export interface SecretPostProps {
    id: number;
}

const fetcher = (url: string) =>
    axios
        .get(url, {
            withCredentials: true,
        })
        .then(res => res.data.data);

export default function SecretPost() {
    const router = useRouter();
    const { id } = router.query;
    const { data: post, error } = useSWR(id ? `/posts/${id}` : null, fetcher);

    if (error) {
        return (
            <ErrorComponent
                message={'비공개 포스트입니다.'}
                statusCode={error.status ?? 500}
            />
        );
    }

    return (
        <ErrorBoundary>
            {post && (
                <PostPage
                    {...{
                        post: post,
                        id: String(post.id),
                        error: error,
                    }}
                />
            )}
        </ErrorBoundary>
    );
}
