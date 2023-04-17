/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SearchBuilder } from '@/blog/components/builder/SearchBuilder';

import { usePostsService } from '@/hooks/services/usePostsService';
import { postsStore } from '@/store';
import { PostsSearchType } from '@/store/posts/posts.dto';

import {
    Box,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Grid,
    Pagination,
    SxProps,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { DateUtil, Formatter } from '../../api/date';

import { useCategoryService } from '@/hooks/services/useCategoryService';
import { useRouter } from 'next/router';
import { SearchComponent } from './SearchComponent';
import LockIcon from '@mui/icons-material/Lock';

export function PageHeader() {
    return <></>;
}

export const PageDescription = observer(() => {
    return <></>;
});

export const SearchBox = SearchBuilder<PostsSearchType>(postsStore);

export const PostsPresent = observer(() => {
    const service = usePostsService();
    const categoryService = useCategoryService();
    const router = useRouter();

    const fetchData = async (page?: number) => {
        try {
            if (page) {
                postsStore.setPageNumber(page);
            }

            // 카테고리 설정
            postsStore.setCurrentCategoryId(
                categoryService.getCurrentMenuCategoryId(),
            );

            // 카테고리 별 포스트 조회
            await service.fetch(
                postsStore,
                categoryService.getCurrentMenuCategoryId(),
            );
        } catch (e) {
            console.warn(e);
            toast.error('조회 결과가 없습니다');
            postsStore.setEntities([]);
        }
    };

    const fetchDataBySearch = async (page?: number) => {
        try {
            postsStore.setSearchMode(true);
            postsStore.setPageNumber(1);
            await fetchData(page);
        } catch (e: any) {
            postsStore.setSearchType(
                postsStore.getDefaultCategory() as PostsSearchType,
            );
            postsStore.setSearchQuery('');

            toast.error(e.message);
        }
    };

    const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
        fetchData(page);
    };

    useEffect(() => {
        fetchData();
    }, [categoryService.getCurrentMenuCategoryId()]);

    const goToPage = (postId: number) => {
        router.push(`/posts/[id]`, `/posts/${postId}`);
    };

    return (
        <Grid
            sx={{ flexGrow: 1 }}
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr',
                            md: '1fr 1fr ',
                            lg: '1fr 1fr 1fr',
                        },
                        gridTemplateRows: '1fr',
                        gap: 3,
                        flexDirection: 'column',
                        marginTop: 2,
                        width: '100%',
                        px: 2,
                    }}
                >
                    {postsStore.getEntities() &&
                        postsStore.getEntities()?.map(post => {
                            const mediaProp: SxProps = {
                                cursor: 'pointer',
                                width: '100%',
                                minHeight: 200,
                                maxHeight: 200,
                            };
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
                                    key={'unique__' + post.id}
                                    elevation={1}
                                >
                                    {post.images && post.images.length > 0 ? (
                                        <CardMedia
                                            component="img"
                                            image={post.images[0].path}
                                            alt={post.title}
                                            sx={mediaProp}
                                            onClick={() => goToPage(post.id!)}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            image="https://via.placeholder.com/300x200.png?text=No+Image"
                                            alt={post.title}
                                            sx={mediaProp}
                                            onClick={() => goToPage(post.id!)}
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
                                        onClick={() => goToPage(post.id!)}
                                    ></CardHeader>
                                    <CardActions
                                        sx={{
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                borderRadius: 10,
                                                background: theme =>
                                                    theme.palette.text
                                                        .secondary,
                                                color: theme =>
                                                    theme.palette.primary
                                                        .contrastText,
                                                p: 1,
                                            }}
                                        >
                                            <Typography variant="subtitle2">
                                                {post.category?.name}
                                            </Typography>
                                        </Box>
                                        {post.isPrivate && <LockIcon />}
                                    </CardActions>
                                </Card>
                            );
                        })}
                </Grid>
            </Grid>
            <Grid item>
                <Pagination
                    count={postsStore.getPagination().maxPage}
                    page={postsStore.getPageNumber()}
                    boundaryCount={2}
                    color="primary"
                    size="large"
                    sx={{ margin: 2 }}
                    showFirstButton
                    showLastButton
                    onChange={(e, p) => {
                        handlePage(e, p);
                    }}
                />
            </Grid>
            <SearchComponent fetchDataBySearch={fetchDataBySearch} />
        </Grid>
    );
});
