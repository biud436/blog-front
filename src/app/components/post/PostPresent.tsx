import { Post } from '@/store/post';
import { Card, Divider, Grid, Typography } from '@mui/material';
import Markdown from 'marked-react';
import { BackButton } from './BackButton';

export function PostPresent({
    post,
    goBack,
}: {
    post: Post;
    goBack: () => void;
}) {
    return (
        <>
            <Card
                sx={{ padding: 2, marginBottom: 3 }}
                key={post.id}
                elevation={3}
            >
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
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
            <BackButton goBack={goBack} />
        </>
    );
}
