'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { DateUtil, Formatter } from '@/lib/date';
import { Post } from '@/models/Post';
import { Grid2 as Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

export type PostHeaderProps = {
  post: Post;
};

const CommentCount = dynamic(
  async () => {
    const [mod] = await Promise.all([import('./PostCommentCount')]);

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

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <Stack
      sx={{
        background: 'linear-gradient(to left, #ffffff, #f0f0f0)',
        width: '100%',
        padding: {
          xs: 2,
          sm: 2,
          md: 3,
          lg: 3,
        },
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <Grid
        size={{ xs: 12 }}
        justifyContent={{
          md: 'space-between',
        }}
        sx={{
          display: 'flex',
          mb: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 'bold' }}
        >
          {post.title}
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="flex-start"
        alignItems={'center'}
        flexDirection={{
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
        }}
        flexShrink={{
          xs: 0,
          sm: 0,
          md: 0,
          lg: 1,
        }}
        mb={0}
        gap={3}
      >
        <Typography sx={{ color: 'GrayText', fontWeight: 'bold' }} variant="h6">
          {post.user?.profile?.nickname}
        </Typography>
        <Typography sx={{ color: 'GrayText' }}>
          {DateUtil.ToDateStringBySeoul(post?.uploadDate!, Formatter.DATETIME)}
        </Typography>
      </Grid>
    </Stack>
  );
}
