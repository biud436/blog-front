/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post } from '@/models/Post';
import { Divider, Grid2 as Grid, Paper, Box } from '@mui/material';
import { PostFooter } from './PostFooter';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import dynamic from 'next/dynamic';

export type PostContainerProps = {
  /**
   * 포스트 데이터
   */
  post: Post;
  /**
   * 뒤로가기
   */
  goBack: () => void;
};

const DisqusThread = dynamic(
  async () => {
    const [mod] = await Promise.all([import('./PostComment')]);

    return mod.default;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-5 m-5 text-lg bg-gray-100 rounded-md">
        로딩중...
      </div>
    ),
  },
);

export function PostContainer({ post, goBack }: PostContainerProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      {/* Main article container - Medium style: centered with max-width */}
      <Box
        component="article"
        sx={{
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Header */}
        <PostHeader post={post} />

        {/* Content */}
        <Box
          sx={{
            paddingBottom: {
              xs: '48px',
              md: '64px',
            },
          }}
        >
          <PostContent post={post} />
        </Box>

        {/* Divider before comments */}
        <Divider
          sx={{
            maxWidth: '860px',
            margin: {
              xs: '40px 20px',
              sm: '48px 28px',
              md: '56px auto',
            },
            borderColor: '#e6e6e6',
          }}
        />

        {/* Comments section */}
        <Box
          sx={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: {
              xs: '0 20px 40px',
              sm: '0 28px 48px',
              md: '0 0 56px',
            },
          }}
        >
          <DisqusThread
            identifier={post.id.toString()}
            url={`https://blog.biud436.com/posts/${post.id}`}
            title={post.title}
          />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: {
              xs: '0 20px 40px',
              sm: '0 28px 48px',
              md: '0 0 56px',
            },
          }}
        >
          <PostFooter post={post} goBack={goBack} />
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
