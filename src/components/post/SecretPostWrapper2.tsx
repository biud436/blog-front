'use client';

import React from 'react';
import { PostPage } from '@/components/pages/post';
import axios from 'axios';
import useSWR from 'swr';
import { ErrorComponent } from '@/components/pages/ErrorFoundPage';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then(res => res.data.data);

export default function SecretPostWrapper({ id }: { id: number }) {
  const { data: post, error } = useSWR(id ? `/posts/${id}` : null, fetcher);

  if (error) {
    return <ErrorComponent message="비공개 포스트입니다" statusCode={403} />;
  }

  if (!post) {
    return <ErrorComponent message="비공개 포스트입니다" statusCode={404} />;
  }

  return (
    <PostPage
      {...{
        post: post,
        id: String(post.id),
        error: error,
      }}
    />
  );
}
