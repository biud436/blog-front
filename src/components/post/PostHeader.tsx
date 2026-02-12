'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { DateUtil, Formatter } from '@/lib/date';
import { Post } from '@/models/Post';
import { Box, Stack, Typography } from '@mui/material';
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

/* ── Design Tokens ────────────────────────────────────── */
const tokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  border: 'rgba(28, 25, 23, 0.06)',
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <Stack
      sx={{
        width: '100%',
        padding: {
          xs: '40px 20px 28px',
          sm: '48px 28px 36px',
          md: '56px 48px 40px',
        },
      }}
    >
      {/* Category badge */}
      {post.category && (
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: tokens.accent,
            mb: 2,
          }}
        >
          {post.category.name}
        </Typography>
      )}

      {/* Title */}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: '1.75rem',
            sm: '2.25rem',
            md: '2.75rem',
          },
          fontWeight: 750,
          lineHeight: 1.2,
          letterSpacing: '-0.03em',
          color: tokens.ink,
          marginBottom: '16px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {post.title}
      </Typography>

      {/* Meta information */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{
          marginTop: '20px',
          paddingBottom: '28px',
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        {/* Author avatar circle */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: tokens.accentSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: tokens.accent,
            flexShrink: 0,
          }}
        >
          {post.user?.profile?.nickname?.charAt(0) ?? 'U'}
        </Box>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: tokens.ink,
            fontWeight: 500,
          }}
        >
          {post.user?.profile?.nickname}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: tokens.inkTertiary,
          }}
        >
          ·
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: tokens.inkTertiary,
            fontFeatureSettings: '"tnum"',
          }}
        >
          {DateUtil.ToDateStringBySeoul(post?.uploadDate!, Formatter.DATETIME)}
        </Typography>
      </Stack>
    </Stack>
  );
}
