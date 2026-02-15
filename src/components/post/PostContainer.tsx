/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post } from '@/models/Post';
import {
  Divider,
  Grid2 as Grid,
  Paper,
  Box,
  Theme,
  SxProps,
} from '@mui/material';
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

/* ── Design Tokens (shared with PostsPresent) ────────── */
const tokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  inkMuted: '#d6d3d1',
  parchment: '#fafaf9',
  surface: '#ffffff',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  border: 'rgba(28, 25, 23, 0.06)',
  borderHover: 'rgba(28, 25, 23, 0.12)',
};

export { tokens as postTokens };

const articleCardSx: SxProps<Theme> = {
  maxWidth: '860px',
  margin: '0 auto',
  width: '100%',
  backgroundColor: tokens.surface,
  borderRadius: { xs: 0, md: '16px' },
  boxShadow: {
    xs: 'none',
    md: '0 1px 3px rgba(28,25,23,0.04), 0 4px 16px rgba(28,25,23,0.06)',
  },
  mt: { xs: 0, md: 4 },
  mb: { xs: 0, md: 6 },
  overflow: 'hidden',
} as const;

const pageBackgroundSx: SxProps<Theme> = {
  backgroundColor: tokens.parchment,
  minHeight: '100vh',
} as const;

const contentWrapperSx: SxProps<Theme> = {
  paddingBottom: {
    xs: '48px',
    md: '64px',
  },
} as const;

const commentDividerSx: SxProps<Theme> = {
  margin: {
    xs: '24px 20px',
    sm: '32px 28px',
    md: '40px 48px',
  },
  borderColor: tokens.border,
} as const;

const sectionPaddingSx: SxProps<Theme> = {
  padding: {
    xs: '0 20px 40px',
    sm: '0 28px 48px',
    md: '0 48px 56px',
  },
} as const;

export function PostContainer({ post, goBack }: PostContainerProps) {
  return (
    <Box sx={pageBackgroundSx}>
      {/* Article surface card */}
      <Box component="article" sx={articleCardSx}>
        {/* Header */}
        <PostHeader post={post} />

        {/* Content */}
        <Box sx={contentWrapperSx}>
          <PostContent post={post} />
        </Box>

        {/* Divider before comments */}
        <Divider sx={commentDividerSx} />

        {/* Comments section */}
        <Box sx={sectionPaddingSx}>
          <DisqusThread
            identifier={post.id.toString()}
            url={`https://blog.biud436.com/posts/${post.id}`}
            title={post.title}
          />
        </Box>

        {/* Footer */}
        <Box sx={sectionPaddingSx}>
          <PostFooter post={post} goBack={goBack} />
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}
