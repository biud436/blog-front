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
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto',
        padding: {
          xs: '48px 24px 32px',
          sm: '56px 32px 40px',
          md: '64px 0 48px',
        },
      }}
    >
      {/* Title - Medium style: large serif font */}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: '32px',
            sm: '40px',
            md: '48px',
          },
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#242424',
          marginBottom: '16px',
          fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
        }}
      >
        {post.title}
      </Typography>

      {/* Meta information - author and date */}
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{
          marginTop: '24px',
          paddingBottom: '32px',
          borderBottom: '1px solid #e6e6e6',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            color: '#242424',
            fontWeight: 500,
          }}
        >
          {post.user?.profile?.nickname}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#6B6B6B',
          }}
        >
          ·
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#6B6B6B',
          }}
        >
          {DateUtil.ToDateStringBySeoul(post?.uploadDate!, Formatter.DATETIME)}
        </Typography>
      </Stack>
    </Stack>
  );
}
