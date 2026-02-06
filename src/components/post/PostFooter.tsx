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
        paddingTop: '32px',
        borderTop: '1px solid #e6e6e6',
      }}
    >
      {/* Back button - Medium style: minimal design */}
      <Grid>
        <Button
          onClick={() => goBack()}
          sx={{
            color: '#242424',
            fontSize: '16px',
            fontWeight: 500,
            textTransform: 'none',
            padding: '8px 16px',
            border: '1px solid #242424',
            borderRadius: '24px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#242424',
              color: '#ffffff',
            },
          }}
        >
          ← 이전
        </Button>
      </Grid>

      {/* Admin controls - only visible to authorized users */}
      {isAuthorized && (
        <Grid
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            onClick={handleEditPost}
            sx={{
              color: '#6B6B6B',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 16px',
              border: '1px solid #e6e6e6',
              borderRadius: '24px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f7f7f7',
                borderColor: '#242424',
                color: '#242424',
              },
            }}
          >
            수정
          </Button>
          <Button
            onClick={handleDeletePost}
            sx={{
              color: '#6B6B6B',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              padding: '8px 16px',
              border: '1px solid #e6e6e6',
              borderRadius: '24px',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#ff4444',
                borderColor: '#ff4444',
                color: '#ffffff',
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
