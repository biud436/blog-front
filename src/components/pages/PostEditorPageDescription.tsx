import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditPageProps, editorTokens } from './PostEditorContainer';

export function PostEditorPageDescription({ mode }: EditPageProps) {
  return (
    <Box
      sx={{
        padding: {
          xs: '8px 20px 24px',
          sm: '8px 28px 28px',
          md: '8px 48px 32px',
        },
        borderBottom: `1px solid ${editorTokens.border}`,
      }}
    >
      <Typography
        sx={{
          fontSize: '0.875rem',
          color: editorTokens.inkTertiary,
          lineHeight: 1.5,
        }}
      >
        {mode === 'edit'
          ? '기존 포스트의 내용을 수정합니다.'
          : '마크다운 또는 위지윅 에디터로 새 포스트를 작성합니다.'}
      </Typography>
    </Box>
  );
}
