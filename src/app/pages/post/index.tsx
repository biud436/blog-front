import { PageWrapper } from '@/layouts/PageWrapper';
import { URL_MAP } from '@/common/URL';
import { usePost } from '@/hooks/usePost';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { PostPresent } from '../../components/post/PostPresent';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Post } from '@/store/post';
import { PostsProps } from '@/pages/posts/[id]';
import { Meta } from '@/app/components/utils/Meta';
import { GlobalStyle } from '@/styles/global-styles';

export const PostPage = observer(({ post, error, id: postId }: PostsProps) => {
    const router = useRouter();

    useEffect(() => {
        if (error) {
            router.push('/404');
            toast.error(error.message, {
                position: 'top-center',
            });
        }
    }, [post, error]);

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(URL_MAP.MAIN);
        }
    };

    return (
        <PageWrapper name={post.title}>
            <Meta
                {...{
                    title: post.title,
                    description: post.content,
                    url: `https://blog.biud436.com/posts/${postId}`,
                    image: post.thumbnail,
                    nickname: post?.user?.profile?.nickname,
                }}
            />
            <GlobalStyle />
            <PostPresent post={post} goBack={goBack} />
        </PageWrapper>
    );
});
