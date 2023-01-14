import { ErrorBoundary } from '@/blog/components/error/boundary';
import { PostPage } from '@/blog/pages/post';

import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import { Post } from '@/store/post';
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
        const { data: res } = await axios.get('/posts/' + id);

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
