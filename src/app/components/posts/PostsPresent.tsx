import { SearchBuilder } from '@/app/components/builder/SearchBuilder';
import { useAuth } from '@/app/providers/authProvider';
import { usePostsService } from '@/hooks/usePostsService';
import { PostsServiceProvider } from '@/services/PostsService';
import { postsStore } from '@/store/posts';
import { PostsSearchType } from '@/store/posts/posts.dto';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
    Alert,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    css,
    Divider,
    Grid,
    Pagination,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Markdown from 'marked-react';
import { DateUtil, Formatter } from '../../api/date';
import { useNavigate } from 'react-router';
import { URL_MAP } from '@/common/URL';
import { useCategoryService } from '@/hooks/useCategoryService';

function PageHeader() {
    return <></>;
}

const PageDescription = observer(() => {
    return <></>;
});

const SearchBox = SearchBuilder<PostsSearchType>(postsStore);

const PostsContainer = observer(() => {
    const auth = useAuth();
    const service = usePostsService();
    const categoryService = useCategoryService();
    const navigate = useNavigate();

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
            const res = await service.fetch(
                postsStore,
                categoryService.getCurrentMenuCategoryId(),
            );

            const { entities, pagination } = res.data;

            postsStore.setPagination(pagination);
            postsStore.setEntities(entities);
        } catch (e: any) {
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
        navigate(`/posts/${postId}`);
    };

    return (
        <>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    {postsStore.getEntities() &&
                        postsStore.getEntities()?.map(post => {
                            return (
                                <Card
                                    sx={{
                                        padding: 2,
                                        marginBottom: 3,
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                    key={post.id}
                                    elevation={3}
                                >
                                    <CardHeader
                                        title={post.title}
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'primary.main',
                                        }}
                                        onClick={() => goToPage(post.id!)}
                                    ></CardHeader>
                                    <CardActions sx={{ justifyContent: 'end' }}>
                                        <Typography variant="subtitle2">
                                            {post.category?.name}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {DateUtil.ToDateStringBySeoul(
                                                post?.uploadDate!,
                                                Formatter.DATETIME,
                                            )}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            );
                        })}
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
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
                <SearchBox
                    store={postsStore}
                    fetchDataBySearch={fetchDataBySearch}
                />
            </Grid>
        </>
    );
});

export const PostsPresent = observer(() => {
    return (
        <>
            <PostsServiceProvider>
                <Grid container gap={3}>
                    <PageHeader />
                    <PageDescription />
                    <PostsContainer />
                </Grid>
            </PostsServiceProvider>
        </>
    );
});
