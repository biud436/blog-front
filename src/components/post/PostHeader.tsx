'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { DateUtil, Formatter } from '@/lib/date';
import { Post } from '@/models/Post';
import { Avatar, Divider, Grid2 as Grid, Typography } from '@mui/material';

export type PostHeaderProps = {
  post: Post;
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <>
      <Grid
        size={{ xs: 12 }}
        justifyContent="flex-start"
        sx={{
          display: 'flex',
          mb: 1,
        }}
      >
        <Typography
          variant="h3"
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
        mb={3}
        gap={3}
      >
        <Avatar>{post.user?.profile?.nickname[0]}</Avatar>
        <Typography sx={{ color: 'GrayText', fontWeight: 'bold' }} variant="h6">
          {post.user?.profile?.nickname}
        </Typography>
        <Typography sx={{ color: 'GrayText' }}>
          {DateUtil.ToDateStringBySeoul(post?.uploadDate!, Formatter.DATETIME)}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
    </>
  );
}
