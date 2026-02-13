import { Box } from '@mui/material';
import React from 'react';
import { editorTokens } from '@/components/pages/PostEditorContainer';

export interface PostTitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

export function PostTitleInput({ title, setTitle }: PostTitleInputProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: editorTokens.ink,
          letterSpacing: '-0.02em',
          lineHeight: 1.4,
          padding: 0,
          background: 'transparent',
          fontFamily: 'inherit',
        }}
      />
      <Box
        sx={{
          height: '2px',
          background: `linear-gradient(90deg, ${editorTokens.accent} 0%, ${editorTokens.accentSoft} 100%)`,
          borderRadius: '1px',
          mt: 1.5,
        }}
      />
    </Box>
  );
}
