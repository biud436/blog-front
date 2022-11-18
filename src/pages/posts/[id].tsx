import { ErrorBoundary } from '@/app/components/error/boundary';
import { PostPage } from '@/app/pages/post';
import { usePost } from '@/hooks/usePost';

import axios from 'axios';
import { useRouter } from 'next/router';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next/types';
import { useState } from 'react';
import { Post } from '@/store/post';
export interface PostsProps {
    id: string;
    post: Post;
    error: any;
}

export default function Posts({ post, error }: { post: Post; error: any }) {
    const router = useRouter();

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
    let post = {};
    let error = null;

    try {
        const { data: res } = await axios.get('/posts/' + id);

        post = res.data;
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
