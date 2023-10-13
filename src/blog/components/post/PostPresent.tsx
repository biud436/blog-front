/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post } from '@/models/Post';
import { Divider, Grid, Paper, Box } from '@mui/material';
import { PostFooter } from './PostFooter';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import dynamic from 'next/dynamic';

const PostContentTocDynamic = dynamic(
    async () => {
        const [m] = await Promise.all([import('./PostContentToc')]);

        return m.PostContentToc;
    },
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
        <Box>
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '98vh',
                }}
            >
                <Grid item xs={12} sm={12} md={11} lg={11}>
                    <Box
                        sx={{
                            marginBottom: 3,
                            padding: {
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 3,
                            },
                            width: '100%',
                        }}
                        key={post.id}
                    >
                        <Grid container gap={2}>
                            <PostHeader post={post} />
                            <PostContent post={post} />
                        </Grid>
                        <Divider
                            sx={{
                                mb: 3,
                            }}
                        />
                    </Box>
                    <PostFooter post={post} goBack={goBack} />
                </Grid>
                <Box
                    sx={{
                        display: 'inline-flex',
                    }}
                >
                    <TocWrapper content={post.content} />
                </Box>
            </Grid>
            <ToastContainer />
        </Box>
    );
}
