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

/* ── Design Tokens ────────────────────────────────────── */
const tokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  border: 'rgba(28, 25, 23, 0.06)',
  parchment: '#fafaf9',
};

export function PostContent({ post }: PostContentProps) {
  return (
    <Grid
      size={{ xs: 12 }}
      sx={{
        padding: {
          xs: '0 20px',
          sm: '0 28px',
          md: '0 48px',
        },
        '& .toastui-editor-contents': {
          fontSize: '1.0625rem',
          lineHeight: '1.8',
          color: tokens.ink,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',

          // Paragraph spacing
          '& p': {
            marginBottom: '1.5em',
            fontSize: '1.0625rem',
            lineHeight: '1.8',
            letterSpacing: '-0.006em',
            color: tokens.ink,
          },

          // Headings
          '& h1, & h2, & h3': {
            fontWeight: 700,
            lineHeight: 1.3,
            marginTop: '2.5em',
            marginBottom: '0.75em',
            color: tokens.ink,
            letterSpacing: '-0.025em',
          },

          '& h1': {
            fontSize: '1.875rem',
          },

          '& h2': {
            fontSize: '1.5rem',
            paddingBottom: '0.5em',
            borderBottom: `1px solid ${tokens.border}`,
          },

          '& h3': {
            fontSize: '1.25rem',
          },

          // Links
          '& a': {
            color: tokens.accent,
            textDecoration: 'none',
            fontWeight: 500,
            borderBottom: `1px solid transparent`,
            transition: 'border-color 0.2s ease, color 0.2s ease',

            '&:hover': {
              borderBottomColor: tokens.accent,
              color: '#9a3412',
            },
          },

          // Blockquotes
          '& blockquote': {
            borderLeft: `3px solid ${tokens.accent}`,
            paddingLeft: '20px',
            marginLeft: 0,
            marginRight: 0,
            marginBottom: '1.5em',
            fontStyle: 'normal',
            color: tokens.inkSecondary,
            backgroundColor: tokens.accentSoft,
            borderRadius: '0 8px 8px 0',
            padding: '16px 20px',
          },

          // Code blocks
          '& pre': {
            backgroundColor: '#1c1917',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '1.5em',
            overflow: 'auto',
            border: 'none',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',

            '& code': {
              backgroundColor: 'transparent',
              color: '#e7e5e4',
              padding: 0,
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
          },

          // Inline code
          '& code': {
            backgroundColor: tokens.accentSoft,
            color: tokens.accent,
            padding: '2px 8px',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            fontFamily:
              '"SF Mono", "Fira Code", Menlo, Monaco, "Courier New", monospace',
          },

          // Lists
          '& ul, & ol': {
            marginBottom: '1.5em',
            paddingLeft: '24px',
          },

          '& li': {
            marginBottom: '8px',
            lineHeight: '1.8',
            color: tokens.ink,

            '&::marker': {
              color: tokens.inkTertiary,
            },
          },

          // Images
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            margin: '2em 0',
            borderRadius: '12px',
            boxShadow:
              '0 2px 8px rgba(28,25,23,0.06), 0 4px 16px rgba(28,25,23,0.04)',
          },

          // Horizontal rule
          '& hr': {
            border: 'none',
            borderTop: `1px solid ${tokens.border}`,
            margin: '2.5em 0',
          },

          // Tables
          '& table': {
            borderCollapse: 'collapse',
            width: '100%',
            marginBottom: '1.5em',
            fontSize: '0.9375rem',

            '& th': {
              backgroundColor: tokens.parchment,
              fontWeight: 600,
              color: tokens.ink,
              padding: '12px 16px',
              borderBottom: `2px solid rgba(28,25,23,0.1)`,
              textAlign: 'left',
            },

            '& td': {
              padding: '10px 16px',
              borderBottom: `1px solid ${tokens.border}`,
              color: tokens.inkSecondary,
            },

            '& tr:hover td': {
              backgroundColor: tokens.accentSoft,
            },
          },
        },
      }}
    >
      <Viewer content={post.content} />
    </Grid>
  );
}
