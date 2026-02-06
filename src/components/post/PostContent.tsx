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
        maxWidth: '680px',
        margin: '0 auto',
        padding: {
          xs: '0 24px',
          sm: '0 32px',
          md: '0',
        },
        '& .toastui-editor-contents': {
          fontSize: '20px',
          lineHeight: '1.8',
          color: '#242424',
          fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',

          // Paragraph spacing
          '& p': {
            marginBottom: '32px',
            fontSize: '20px',
            lineHeight: '1.8',
          },

          // Headings
          '& h1, & h2, & h3': {
            fontWeight: 700,
            lineHeight: 1.3,
            marginTop: '48px',
            marginBottom: '16px',
            color: '#242424',
          },

          '& h1': {
            fontSize: '36px',
          },

          '& h2': {
            fontSize: '28px',
          },

          '& h3': {
            fontSize: '24px',
          },

          // Links
          '& a': {
            color: '#242424',
            textDecoration: 'underline',
            textDecorationColor: '#242424',
            textUnderlineOffset: '2px',
            transition: 'all 0.2s ease',

            '&:hover': {
              textDecorationColor: '#6B6B6B',
            },
          },

          // Blockquotes
          '& blockquote': {
            borderLeft: '3px solid #242424',
            paddingLeft: '24px',
            marginLeft: 0,
            marginRight: 0,
            fontStyle: 'italic',
            color: '#6B6B6B',
          },

          // Code blocks
          '& pre': {
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
            padding: '20px',
            marginBottom: '32px',
            overflow: 'auto',
          },

          // Inline code
          '& code': {
            backgroundColor: '#f7f7f7',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '18px',
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          },

          // Lists
          '& ul, & ol': {
            marginBottom: '32px',
            paddingLeft: '24px',
          },

          '& li': {
            marginBottom: '8px',
            lineHeight: '1.8',
          },

          // Images
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            margin: '32px 0',
            borderRadius: '4px',
          },
        },
      }}
    >
      <Viewer content={post.content} />
    </Grid>
  );
}
