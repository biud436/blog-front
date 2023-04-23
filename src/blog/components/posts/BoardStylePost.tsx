/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Box, Stack, TableCell, TableRow } from '@mui/material';
import { DateUtil, Formatter } from '../../api/date';
import { CardStylePostProps } from './CardStylePost';
import LockIcon from '@mui/icons-material/Lock';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export function BoardStylePost({
    post,
    mediaProp,
    goToPage,
}: CardStylePostProps): JSX.Element {
    return (
        <TableRow>
            <TableCell align="center">{post.category?.name}</TableCell>
            <TableCell
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        color: '#1976d2',
                    },
                }}
                onClick={() => goToPage(post)}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    gap={2}
                    alignItems="center"
                    justifyContent="start"
                >
                    {post.title}

                    {post.isPrivate && (
                        <Box
                            className={
                                'rounded-md bg-gray-200 p-1 inline-block'
                            }
                        >
                            <LockIcon />
                        </Box>
                    )}

                    {post.images && post.images.length > 0 && (
                        <InsertPhotoIcon />
                    )}
                </Stack>
            </TableCell>
            <TableCell align="center">{post.user?.profile.nickname}</TableCell>
            <TableCell align="center">
                {DateUtil.ToDateStringBySeoul(
                    post.uploadDate!,
                    Formatter.DATETIME,
                )}
            </TableCell>
            <TableCell align="center">{post.viewCount?.count ?? 0}</TableCell>
        </TableRow>
    );
}
