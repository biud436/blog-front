import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { editorTokens } from '@/components/pages/PostEditorContainer';

interface PostSelectCategoryProps {
  currentCategoryId: number;
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<number>>;
  categories: CategoryDepthVO[];
}

export function PostSelectCategory({
  currentCategoryId,
  setCurrentCategoryId,
  categories,
}: PostSelectCategoryProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        component="label"
        sx={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: editorTokens.inkTertiary,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          mb: 1,
        }}
      >
        카테고리
      </Typography>
      <Box
        component="select"
        value={currentCategoryId}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrentCategoryId(+e.target.value)
        }
        sx={{
          width: '100%',
          padding: '10px 16px',
          fontSize: '0.9375rem',
          fontFamily: 'inherit',
          color: editorTokens.ink,
          backgroundColor: editorTokens.parchment,
          border: `1px solid ${editorTokens.border}`,
          borderRadius: '8px',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5l3 3 3-3' stroke='%23a8a29e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          '&:hover': {
            borderColor: editorTokens.borderHover,
          },
          '&:focus': {
            borderColor: editorTokens.accent,
            boxShadow: `0 0 0 3px ${editorTokens.accentSoft}`,
          },
        }}
      >
        <option value={0}>카테고리를 선택하세요</option>
        {categories.map(category => (
          <option
            value={category.id}
            key={'post_select_category_' + category.id}
          >
            {'  '.repeat(category.depth)}
            {category.name}
          </option>
        ))}
      </Box>
    </Box>
  );
}
