import { Post } from '@/store/post';
import { Card, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BackButton } from './BackButton';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';

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
                    <PostHeader post={post} />
                    <PostContent post={post} />
                </Grid>
            </Card>
            <BackButton goBack={goBack} />
        </>
    );
}
