/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { MainLayout } from '@/layouts/BlogMainLayout';
import { URL_MAP } from '@/common/URL';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PostPresent } from '../../components/post/PostPresent';
import { Meta } from '@/blog/components/utils/Meta';
import { GlobalStyle } from '@/styles/global-styles';
import { PostServiceProvider } from '@/services/PostService';
import { useRouter } from 'next/navigation';

export interface PostsProps {
    post: any;
    error: any;
    id: string;
}

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
        <PostServiceProvider>
            <MainLayout name={post.title}>
                <Meta
                    {...{
                        title: post.title,
                        description: post.previewContent!,
                        url: `https://blog.biud436.com/posts/${postId}`,
                        image: post.thumbnail,
                        nickname: post?.user?.profile?.nickname,
                    }}
                />
                <GlobalStyle />
                <PostPresent post={post} goBack={goBack} />
            </MainLayout>
        </PostServiceProvider>
    );
});
