'use client';

import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { PostsContainer } from '../PostsContainer';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/components/common/utils/Meta';

export const PostsPage = () => {
  return (
    <MainLayout>
      <Meta {...{ title: '포스트 목록', description: '포스트 목록입니다' }} />
      <PostsContainer />
    </MainLayout>
  );
};
