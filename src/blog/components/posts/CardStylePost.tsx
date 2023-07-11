/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { PostDto } from '@/models/PostDto';
import {
    Box,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Typography,
} from '@mui/material';
import { DateUtil, Formatter } from '../../api/date';
import LockIcon from '@mui/icons-material/Lock';

export interface CardStylePostProps {
    post: PostDto;
    mediaProp;
    goToPage: (post: PostDto) => void;
}
export function CardStylePost({
    post,
    mediaProp,
    goToPage,
}: CardStylePostProps): JSX.Element {
    return (
        <Card
            sx={{
                marginBottom: 1,
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderLeft: '4px solid #1976d2',
            }}
            elevation={1}
        >
            {post.images && post.images.length > 0 ? (
                <CardMedia
                    component="img"
                    image={post.images[0].path}
                    alt={post.title}
                    sx={mediaProp}
                    onClick={() => goToPage(post)}
                />
            ) : (
                <CardMedia
                    component="img"
                    image="https://via.placeholder.com/300x200.png?text=No+Image"
                    alt={post.title}
                    sx={mediaProp}
                    onClick={() => goToPage(post)}
                />
            )}
            <CardHeader
                title={post.title}
                subheader={DateUtil.ToDateStringBySeoul(
                    post?.uploadDate!,
                    Formatter.DATETIME,
                )}
                sx={{
                    cursor: 'pointer',
                    color: 'primary.main',
                    width: '100%',
                    '& .MuiCardHeader-title': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '80%',
                    },
                }}
                onClick={() => goToPage(post)}
            ></CardHeader>
            <CardActions
                sx={{
                    alignSelf: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        borderRadius: 10,
                        background: theme => theme.palette.text.secondary,
                        color: theme => theme.palette.primary.contrastText,
                        p: 1,
                    }}
                >
                    <Typography variant="subtitle2">
                        {post.category?.name}
                    </Typography>
                </Box>

                {post.isPrivate && (
                    <Box
                        className={
                            'bg-slate-500 rounded text-white p-2 hover:bg-slate-600 cursor-pointer transition duration-300 ease-in-out'
                        }
                    >
                        <LockIcon />
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}
