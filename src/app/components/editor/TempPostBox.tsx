import { Grid, Typography, SxProps, Modal, Box, Divider } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useSWR, { mutate } from 'swr';
import CloseIcon from '@mui/icons-material/Close';
import { usePostService } from '@/hooks/usePostService';
import { toJS } from 'mobx';
import { useTempPost, useTempPostList } from '@/hooks/useTempPostList';

export type TempPostBoxStyleKeyCollection = [
    'mainBox',
    'tempPostModal',
    'postListBoxItem',
][number];

export const styles: Record<TempPostBoxStyleKeyCollection, SxProps> = {
    mainBox: {
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: '#f5f5f5',
        },
        mb: 2,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
    },
    tempPostModal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '80%',
            sm: '80%',
            md: '90%',
            lg: '50%',
            xl: '50%',
        },
        bgcolor: 'background.paper',
        border: '1px solid #e0e0e0',
        boxShadow: 24,
        p: 4,
    },
    postListBoxItem: {
        border: '1px solid #e0e0e0',
        p: 2,
        m: 1,
        ml: 0,

        '&:hover': {
            background: '#f5f5f5',
            cursor: 'pointer',
        },
    },
};

const getPost = (url: string) => {
    return axios.get(url).then(res => res.data);
};

const getPostById = (url: string) => {
    return axios.get(url).then(res => res.data);
};

interface CreatePostTempDo {
    title: string;
    content: string;
}

const createPost = (url: string, createPostTempDto: CreatePostTempDo) => {
    return axios
        .post(url, createPostTempDto)
        .then(res => res.data)
        .catch(err => {
            console.error(err);
        });
};

export const TempPostBox = observer(() => {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const postService = usePostService();
    const [selectedId, setSelectedId] = useState(1);
    const { posts } = useTempPostList();
    const { post, postMutate } = useTempPost(selectedId);
    const countText = useMemo(() => {
        return `임시 저장 (${count} 개)`;
    }, [count]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getTempPostById = async (post: any) => {
        const id = post.id;

        const newPost = await postMutate('/admin/temp/post/' + id);

        postService.setTempPostContent({
            title: newPost.data.title,
            content: newPost.data.content,
        });
        postService.fetchTempPostState();
        setSelectedId(id);

        handleClose();
    };

    const removeTempPostById = (id: number) => {
        if (typeof window !== 'undefined') {
            if (!id) id = 1;
            alert('임시 포스트 삭제 처리 ' + id);
        }
    };

    useEffect(() => {
        if (posts) {
            setCount(posts.data.count);
        }
    }, [posts]);

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={styles.mainBox}
                onClick={handleOpen}
            >
                <Typography variant="subtitle1">{countText}</Typography>
                <CircularProgress size={20} />
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.tempPostModal}>
                    <Typography variant="subtitle1">
                        <strong>임시 저장 목록 </strong>({count} / 20 개)
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>선택된 포스트 </strong>
                        {post?.data?.id}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>선택된 포스트 제목 </strong>
                        {post?.data?.title}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>선택된 포스트 내용 </strong>
                        {post?.data?.content}
                    </Typography>

                    {posts?.data?.entities?.map((post: any) => (
                        <Box
                            sx={styles.postListBoxItem}
                            onClick={() => getTempPostById(post)}
                        >
                            <Grid container>
                                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <Typography variant="subtitle1">
                                        {post.id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                                    <Typography variant="subtitle1">
                                        {post.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <Typography variant="subtitle1">
                                        {post.createdAt}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sm={1}
                                    md={1}
                                    lg={1}
                                    xl={1}
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        removeTempPostById(1);
                                    }}
                                >
                                    <CloseIcon />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Modal>
        </React.Fragment>
    );
});
