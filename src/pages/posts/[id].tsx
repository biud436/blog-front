/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ErrorBoundary } from '@/blog/components/error/boundary';
import { PostPage } from '@/blog/pages/post';

import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { Post } from '@/store/post';
import { API_URL } from '@/blog/api/request';
export interface PostsProps {
    id: string;
    post: Post;
    error: any;
}

export default function Posts({ post, error }: { post: Post; error: any }) {
    return (
        <ErrorBoundary>
            <PostPage {...{ post, id: String(post.id), error: error }} />
        </ErrorBoundary>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const { id } = context.query;
    let post = {} as Post;
    let error = null;

    try {
        // 쿠키가 있는지 확인
        const hasCookie = !!context.req.headers.cookie;

        const { data: res } = await axios.get(API_URL + '/posts/' + id, {
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

        if (post.images && post.images.length > 0) {
            post.thumbnail = post.images[0].path;
        }
    } catch (e: any) {
        error = e;
    }

    return {
        props: {
            post,
            error,
        },
    };
};
