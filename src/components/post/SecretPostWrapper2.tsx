'use client';

import React from 'react';
import { PostPage } from '@/components/pages/post';
import { ErrorComponent } from '@/components/pages/ErrorFoundPage';
import { useSecretPost } from '@/hooks/api/useSecretPost';
import { MainLayout } from '@/layouts/BlogMainLayout';

type SecretPostWrapperProps = {
  id: number;
};

export default function SecretPostWrapper({ id }: SecretPostWrapperProps) {
  const { data: post, error, isLoading } = useSecretPost(id);

  if (error) {
    return <ErrorComponent message="비공개 포스트입니다" statusCode={403} />;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div
          className="b-post-head"
          aria-busy="true"
          aria-label="글을 불러오는 중"
        >
          <div
            className="b-skeleton"
            style={{ height: 28, width: 90, borderRadius: 999 }}
          />
          <div
            className="b-skeleton"
            style={{ height: 44, width: '85%', marginTop: 20 }}
          />
          <div
            className="b-skeleton"
            style={{ height: 16, width: '40%', marginTop: 28 }}
          />
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return <ErrorComponent message="비공개 포스트입니다" statusCode={404} />;
  }

  return (
    <MainLayout>
      <PostPage
        {...{
          post: post,
          id: String(post.id),
          error: error,
        }}
      />
    </MainLayout>
  );
}
