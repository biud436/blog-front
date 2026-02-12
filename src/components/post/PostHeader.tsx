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
        maxWidth: '860px',
        margin: '0 auto',
        padding: {
          xs: '40px 20px 28px',
          sm: '48px 28px 36px',
          md: '56px 0 40px',
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
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          marginBottom: '16px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
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
