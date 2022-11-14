import { SearchBuilder } from '@/app/components/builder/SearchBuilder';
import { useAuth } from '@/app/providers/auth/authProvider';
import { usePostsService } from '@/hooks/usePostsService';
import { PostsServiceProvider } from '@/services/PostsService';
import { postsStore } from '@/store/posts';
import { PostsSearchType } from '@/store/posts/posts.dto';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
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
            postsStore.setSearchType(postsStore.getDefaultCategory() as any);
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
        navigate(`/posts/${postId}`);
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
                    md={6}
                    lg={6}
                    spacing={2}
                    rowSpacing={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: 4,
                    }}
                >
                    {postsStore.getEntities() &&
                        postsStore.getEntities()?.map(post => {
                            return (
                                <Card
                                    sx={{
                                        marginBottom: 3,
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minWidth: 400,
                                        maxWidth: 400,
                                    }}
                                    key={post.id}
                                    elevation={2}
                                >
                                    {post.images && post.images.length > 0 && (
                                        <CardMedia
                                            component="img"
                                            image={post.images[0]!.path}
                                            alt={post.title}
                                            sx={{
                                                cursor: 'pointer',
                                                width: '100%',
                                                height: 200,
                                            }}
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
                                            padding: 3,
                                            '& .MuiCardHeader-title': {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                width: '80%',
                                                padding: 3,
                                            },
                                        }}
                                        onClick={() => goToPage(post.id!)}
                                    ></CardHeader>
                                    <CardActions sx={{ justifyContent: 'end' }}>
                                        <Typography variant="subtitle2">
                                            {post.category?.name}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            );
                        })}
                </Grid>
            </Grid>
            <Grid item spacing={0} direction="row">
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

export const PostsPresent = observer(() => {
    return (
        <>
            <PostsServiceProvider>
                <PageHeader />
                <PageDescription />
                <PostsContainer />
            </PostsServiceProvider>
        </>
    );
});

export const SearchComponent = observer(
    ({
        fetchDataBySearch,
    }: {
        fetchDataBySearch: (page?: number) => Promise<void>;
    }) => {
        return (
            <SearchBox
                store={postsStore}
                fetchDataBySearch={fetchDataBySearch}
            />
        );
    },
);
