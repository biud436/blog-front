import { Button, Grid } from '@mui/material';
import { useAuthorized } from '@/hooks/useAuthorized';
import { useNavigate } from 'react-router';
import { usePostService } from '@/hooks/usePostService';
import { toast } from 'react-toastify';

export function PostFooter({ goBack }: { goBack: () => void }) {
    const navigate = useNavigate();
    const [isAuthorized] = useAuthorized();
    const postService = usePostService();

    const handleDeletePost = async () => {
        const currentPostId = postService.getId();

        if (confirm('정말 삭제하시겠습니까?')) {
            const res = await postService.deletePost(currentPostId);

            if (res.result === 'success') {
                navigate('/');
            } else {
                toast.error('삭제에 실패했습니다.');
            }
        }
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => goBack()}
                >
                    이전
                </Button>
            </Grid>
            {isAuthorized && (
                <Grid container spacing={0} xs={4}>
                    <Grid
                        item
                        xs={12}
                        gap={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => navigate('/post/edit?mode=edit')}
                        >
                            수정
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDeletePost}
                        >
                            삭제
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
