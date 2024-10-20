import React from 'react';
import { Button, Grid } from '@mui/material';
import { usePostService } from '@/hooks/services/usePostService';
import { toast } from 'react-toastify';
import { Post } from '@/models/Post';
import { useRouter } from 'next/navigation';
import { useAuthorized } from '@/hooks/server/useAuthorized';

export function PostFooter({
  post,
  goBack,
}: {
  post: Post;
  goBack: () => void;
}) {
  const router = useRouter();
  const { isAuthorized } = useAuthorized();
  const postService = usePostService();

  const handleDeletePost = async () => {
    const currentPostId = post.id;

    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await postService.deletePost(currentPostId);

      if (res.result === 'success') {
        router.push('/');
      } else {
        toast.error('삭제에 실패했습니다.');
      }
    }
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
      <Grid item xs={8}>
        <Button variant="contained" color="primary" onClick={() => goBack()}>
          이전
        </Button>
      </Grid>
      {isAuthorized && (
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
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
