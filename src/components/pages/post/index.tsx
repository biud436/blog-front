/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { MainLayout } from '@/layouts/BlogMainLayout';
import { URL_MAP } from '@/common/URL';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PostContainer } from '../../post/PostContainer';
import { useRouter } from 'next/navigation';

export interface PostsProps {
  post: any;
  error: any;
  id: string;
}

export const PostPage = ({ post, error, id: postId }: PostsProps) => {
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

  return <PostContainer post={post} goBack={goBack} />;
};
