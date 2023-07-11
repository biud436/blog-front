import React from 'react';
import { postsStore } from '@/store';
import { PostDto } from '@/models/PostDto';
import {
    SxProps,
    Table,
    TableContainer,
    Paper,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
} from '@mui/material';
import { BoardStylePost } from './BoardStylePost';

export function BoardStyle({
    goToPage,
}: {
    goToPage: (post: PostDto) => void;
}) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ p: 2 }}>
            <Table className="table-fixed">
                <TableHead>
                    <TableRow className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-gray-300 rounded-t-full">
                        <TableCell align="center">카테고리</TableCell>
                        <TableCell align="center">제목</TableCell>
                        <TableCell align="center">작성자</TableCell>
                        <TableCell align="center">작성일</TableCell>
                        <TableCell align="center">조회수</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {postsStore.getEntities() ? (
                        postsStore.getEntities()?.map(post => {
                            const mediaProp: SxProps = {
                                cursor: 'pointer',
                                width: '100%',
                                minHeight: 200,
                                maxHeight: 200,
                            };
                            return (
                                <BoardStylePost
                                    key={'unique__' + post.id}
                                    {...{ post, mediaProp, goToPage }}
                                />
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>
                                조회 결과가 없습니다
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
