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
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Grid size={{ xs: 8 }}>
        <Button variant="contained" color="primary" onClick={() => goBack()}>
          이전
        </Button>
      </Grid>
      {isAuthorized && (
        <Grid container spacing={0}>
          <Grid
            size={{ xs: 12 }}
            gap={2}
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Button variant="outlined" color="warning" onClick={handleEditPost}>
              수정
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeletePost}>
              삭제
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
