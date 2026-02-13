import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditPageProps, editorTokens } from './PostEditorContainer';

export function PostEditorPageHeader({ mode }: EditPageProps) {
  return (
    <Box
      sx={{
        padding: {
          xs: '32px 20px 0',
          sm: '40px 28px 0',
          md: '48px 48px 0',
        },
      }}
    >
      {/* Accent marker */}
      <Box
        sx={{
          width: '32px',
          height: '3px',
          backgroundColor: editorTokens.accent,
          borderRadius: '2px',
          mb: 2,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '1.75rem' },
          color: editorTokens.ink,
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
        }}
      >
        {mode === 'edit' ? '포스트 수정' : '새 포스트 작성'}
      </Typography>
    </Box>
  );
}
