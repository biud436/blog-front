/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { DateUtil, Formatter } from '@/blog/api/date';
import { Post } from '@/models/Post';
import { Avatar, Button, Divider, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export function PostHeader({ post }: { post: Post }) {
    return (
        <>
            <Grid
                item
                xs={12}
                justifyContent="flex-start"
                sx={{
                    display: 'flex',
                    mb: 1,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ color: 'text.primary', fontWeight: 'bold' }}
                >
                    {post.title}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="flex-start"
                alignItems={'center'}
                flexDirection={{
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                }}
                flexShrink={{
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 1,
                }}
                mb={3}
                gap={3}
            >
                <Avatar>{post.user?.profile?.nickname[0]}</Avatar>
                <Typography
                    sx={{ color: 'GrayText', fontWeight: 'bold' }}
                    variant="h6"
                >
                    {post.user?.profile?.nickname}
                </Typography>
                <Typography sx={{ color: 'GrayText' }}>
                    {DateUtil.ToDateStringBySeoul(
                        post?.uploadDate!,
                        Formatter.DATETIME,
                    )}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </>
    );
}
