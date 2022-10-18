import { PageWrapper } from '@/app/components/PageWrapper';
import { usePost } from '@/hooks/usePost';
import { PostContext, PostServiceProvider } from '@/services/PostService';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import Markdown from 'marked-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

export const PostPage = observer(() => {
    const params = useParams();
    const { postId } = params;
    const { post } = usePost(+postId!);
    const navigate = useNavigate();

    useEffect(() => {}, [post]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageWrapper name={post.title}>
            <>
                <Card
                    sx={{ padding: 2, marginBottom: 3 }}
                    key={post.id}
                    elevation={3}
                >
                    <Grid container gap={1}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                sx={{ color: 'primary.main' }}
                            >
                                {post.title}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="flex-start"
                            gap={3}
                        >
                            <Typography variant="subtitle2">
                                조회수{' '}
                                <Typography sx={{ color: 'GrayText' }}>
                                    {post.viewCount?.count}
                                </Typography>
                            </Typography>
                            <Typography variant="subtitle2">
                                작성자{' '}
                                <Typography sx={{ color: 'GrayText' }}>
                                    {post.user?.profile?.nickname}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Markdown>{post.content}</Markdown>
                        </Grid>
                    </Grid>
                </Card>
                <Grid container spacing={0} direction="row" alignItems="center">
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => goBack()}
                        >
                            이전
                        </Button>
                    </Grid>
                </Grid>
            </>
        </PageWrapper>
    );
});
