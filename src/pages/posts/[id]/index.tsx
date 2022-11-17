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

export default function Posts() {
    const router = useRouter();
    const { post, error } = usePost(+(router.query.id as string));

    return (
        <ErrorBoundary>
            <PostPage {...{ post, id: router.query.id as string, error }} />
        </ErrorBoundary>
    );
}
