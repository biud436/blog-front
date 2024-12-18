/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import { MainLayout } from '@/layouts/BlogMainLayout';
import { URL_MAP } from '@/common/URL';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PostPresent } from '../../post/PostPresent';
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

  return <PostPresent post={post} goBack={goBack} />;
});
