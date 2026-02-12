import React from 'react';
import { Button, Grid2 as Grid } from '@mui/material';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';
import { useAuthorized } from '@/hooks/server/useAuthorized';
import { useDeletePost } from '@/hooks/api/useDeletePost';

interface PostFooterProps {
  post: Post;
  goBack: () => void;
}

/* ── Design Tokens ────────────────────────────────────── */
const tokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  border: 'rgba(28, 25, 23, 0.06)',
  borderHover: 'rgba(28, 25, 23, 0.12)',
  surface: '#ffffff',
};

export function PostFooter({ post, goBack }: PostFooterProps) {
  const router = useRouter();
  const { isAuthorized } = useAuthorized();
  const { deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost.mutate(post.id);
  };

  const handleEditPost = () => {
    const id = post.id;
    router.push(`/edit2?mode=edit&id=${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent={isAuthorized ? 'space-between' : 'flex-start'}
      sx={{
        paddingTop: '24px',
        borderTop: `1px solid ${tokens.border}`,
      }}
    >
      {/* Back button */}
      <Grid>
        <Button
          onClick={() => goBack()}
          sx={{
            color: tokens.ink,
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            padding: '8px 20px',
            border: `1px solid ${tokens.borderHover}`,
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: tokens.ink,
              borderColor: tokens.ink,
              color: tokens.surface,
            },
          }}
        >
          ← 이전
        </Button>
      </Grid>

      {/* Admin controls */}
      {isAuthorized && (
        <Grid
          sx={{
            display: 'flex',
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleEditPost}
            sx={{
              color: tokens.inkSecondary,
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 20px',
              border: `1px solid ${tokens.borderHover}`,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: tokens.accentSoft,
                borderColor: tokens.accent,
                color: tokens.accent,
              },
            }}
          >
            수정
          </Button>
          <Button
            onClick={handleDeletePost}
            sx={{
              color: tokens.inkTertiary,
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 20px',
              border: `1px solid ${tokens.borderHover}`,
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#fef2f2',
                borderColor: '#ef4444',
                color: '#ef4444',
              },
            }}
          >
            삭제
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
