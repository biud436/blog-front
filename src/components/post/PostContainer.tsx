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
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '98vh',
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 11,
            lg: 11,
          }}
        >
          <Box
            sx={{
              marginBottom: 3,
              padding: {
                xs: 2,
                sm: 2,
                md: 3,
                lg: 3,
              },
              width: '100%',
            }}
            key={post.id}
          >
            <Grid container gap={2}>
              <PostHeader post={post} />
              <PostContent post={post} />
            </Grid>
          </Box>
          <DisqusThread
            identifier={post.id.toString()}
            url={`https://blog.biud436.com/posts/${post.id}`}
            title={post.title}
          />

          <PostFooter post={post} goBack={goBack} />
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
}
