import { Post } from '@/store/post';
import { Card, Divider, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PostFooter } from './PostFooter';
import GithubComment from './Comment';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
                    <Grid item xs={12}></Grid>
                </Grid>
                <Divider />
                <Typography
                    variant="subtitle1"
                    sx={{
                        marginTop: 1,
                        color: 'primary.main',
                        cursor: 'pointer',
                    }}
                >
                    ⭐️ Comments
                </Typography>
                <GithubComment />
            </Card>
            <ToastContainer />
            <PostFooter goBack={goBack} />
        </>
    );
}
