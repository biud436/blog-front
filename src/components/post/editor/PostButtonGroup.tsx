import { EditPageProps } from '@/components/pages/PostEditorContainer';
import { editorTokens } from '@/components/pages/PostEditorContainer';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface PostButtonGroupProps {
  mode: EditPageProps['mode'];
  handleWrite: () => Promise<void>;
  handleCancel: () => void;
}

export function PostButtonGroup({
  mode,
  handleWrite,
  handleCancel,
}: PostButtonGroupProps) {
  const submitButtonName = useMemo(() => {
    return mode === 'edit' ? '수정하기' : '작성하기';
  }, [mode]);

  const buttonBase = {
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 600,
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
    outline: 'none',
    lineHeight: 1.4,
  } as const;

  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Box
        component="button"
        onClick={() => handleWrite()}
        sx={{
          ...buttonBase,
          backgroundColor: editorTokens.accent,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: editorTokens.accentHover,
            boxShadow: `0 2px 8px ${editorTokens.accent}30`,
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        {submitButtonName}
      </Box>
      <Box
        component="button"
        onClick={() => handleCancel()}
        sx={{
          ...buttonBase,
          backgroundColor: 'transparent',
          color: editorTokens.inkSecondary,
          border: `1px solid ${editorTokens.border}`,
          '&:hover': {
            backgroundColor: editorTokens.parchment,
            borderColor: editorTokens.borderHover,
            color: editorTokens.ink,
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        취소
      </Box>
    </Box>
  );
}
