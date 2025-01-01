'use client';

import React from 'react';
import { PostPage } from '@/components/pages/post';
import { ErrorComponent } from '@/components/pages/ErrorFoundPage';
import { useSecretPost } from '@/hooks/api/useSecretPost';

type SecretPostWrapperProps = {
  id: number;
};

export default function SecretPostWrapper({ id }: SecretPostWrapperProps) {
  const { data: post, error } = useSecretPost(id);

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
