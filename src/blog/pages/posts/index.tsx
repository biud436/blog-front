'use client';

import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { observer } from 'mobx-react-lite';
import { PostsContainer } from '../../../containers/PostsContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '@/blog/components/common/utils/Meta';
import { GlobalStyle } from '@/styles/global-styles';

export const PostsPage = observer(() => {
  return (
    <MainLayout name="어진석의 블로그">
      <Meta {...{ title: '포스트 목록', description: '포스트 목록입니다' }} />
      <GlobalStyle />
      <PostsContainer />
      <ToastContainer />
    </MainLayout>
  );
});
