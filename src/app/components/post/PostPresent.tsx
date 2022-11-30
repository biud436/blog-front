import { Post } from '@/store/post';
import {
    Card,
    Divider,
    Grid,
    Typography,
    Paper,
    Container,
    useMediaQuery,
    Box,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PostFooter } from './PostFooter';
import GithubComment from './Comment';
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
                }}
            >
                <Grid item xs={12} sm={12} md={10} lg={10}>
                    <Card
                        sx={{
                            marginBottom: 3,
                            padding: {
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 3,
                            },
                            boxShadow: {
                                xs: 2,
                                sm: 2,
                                md: 2,
                                lg: 2,
                                xl: 2,
                            },
                            borderLeft: '5px solid #1976d2',
                            width: '100%',
                        }}
                        key={post.id}
                    >
                        <Grid container gap={2}>
                            <PostHeader post={post} />
                            <PostContent post={post} />
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
                            ⭐️ 댓글
                        </Typography>
                        <GithubComment />
                    </Card>
                    <PostFooter post={post} goBack={goBack} />
                </Grid>
                <Grid
                    item
                    xs={0}
                    sm={0}
                    md={2}
                    lg={2}
                    display={{
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                        lg: 'block',
                    }}
                >
                    <TocWrapper content={post.content} />
                </Grid>
            </Grid>
            <ToastContainer />
        </Box>
    );
}
