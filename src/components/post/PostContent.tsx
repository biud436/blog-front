'use client';
import React from 'react';
import { Post } from '@/models/Post';
import { Grid2 as Grid } from '@mui/material';

import dynamic from 'next/dynamic';

const Viewer = dynamic(
  async () => {
    const [mod] = await Promise.all([import('./viewer/TuiEditorViewer')]);

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

export type PostContentProps = {
  post: Post;
};

export function PostContent({ post }: PostContentProps) {
  return (
    <Grid
      size={{ xs: 12 }}
      sx={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: {
          xs: '0 20px',
          sm: '0 28px',
          md: '0',
        },
        '& .toastui-editor-contents': {
          fontSize: '17px',
          lineHeight: '1.75',
          color: '#1a1a1a',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',

          // Paragraph spacing
          '& p': {
            marginBottom: '24px',
            fontSize: '17px',
            lineHeight: '1.75',
            letterSpacing: '-0.004em',
          },

          // Headings
          '& h1, & h2, & h3': {
            fontWeight: 700,
            lineHeight: 1.35,
            marginTop: '40px',
            marginBottom: '12px',
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          },

          '& h1': {
            fontSize: '30px',
          },

          '& h2': {
            fontSize: '24px',
          },

          '& h3': {
            fontSize: '20px',
          },

          // Links
          '& a': {
            color: '#0969da',
            textDecoration: 'none',
            transition: 'color 0.15s ease',

            '&:hover': {
              textDecoration: 'underline',
              color: '#0550ae',
            },
          },

          // Blockquotes
          '& blockquote': {
            borderLeft: '4px solid #d0d7de',
            paddingLeft: '20px',
            marginLeft: 0,
            marginRight: 0,
            fontStyle: 'normal',
            color: '#57606a',
          },

          // Code blocks
          '& pre': {
            backgroundColor: '#f6f8fa',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '24px',
            overflow: 'auto',
            border: '1px solid #d0d7de',
          },

          // Inline code
          '& code': {
            backgroundColor: '#eff1f3',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '14.5px',
            fontFamily:
              '"SF Mono", "Fira Code", Menlo, Monaco, "Courier New", monospace',
          },

          // Lists
          '& ul, & ol': {
            marginBottom: '24px',
            paddingLeft: '24px',
          },

          '& li': {
            marginBottom: '6px',
            lineHeight: '1.75',
          },

          // Images
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            margin: '24px 0',
            borderRadius: '6px',
          },
        },
      }}
    >
      <Viewer content={post.content} />
    </Grid>
  );
}
