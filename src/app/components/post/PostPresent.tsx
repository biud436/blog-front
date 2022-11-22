import { Post } from '@/store/post';
import {
    Card,
    Divider,
    Grid,
    Typography,
    Paper,
    Container,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PostFooter } from './PostFooter';
import GithubComment from './Comment';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PostContentToc } from './PostContentToc';
import React from 'react';
import dynamic from 'next/dynamic';

const PostContentTocDynamic = dynamic(
    () => import('./PostContentToc').then(m => m.PostContentToc),
    {
        ssr: false,
        loading: () => <div>Loading...</div>,
    },
);

export function TocWrapper({ content }: { content: string }) {
    return (
        <Paper>
            <PostContentTocDynamic content={content} />
        </Paper>
    );
}

export function PostPresent({
    post,
    goBack,
}: {
    post: Post;
    goBack: () => void;
}) {
    return (
        <Container>
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Grid item xs={10}>
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
                </Grid>
                <Grid item xs={2}>
                    <TocWrapper content={post.content} />
                </Grid>
            </Grid>
            <ToastContainer />
            <PostFooter post={post} goBack={goBack} />
        </Container>
    );
}
