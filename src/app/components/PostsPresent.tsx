import { SearchBuilder } from '@/app/components/atomic/Search';
import { useAuth } from '@/app/providers/authProvider';
import { usePostsService } from '@/hooks/usePostsService';
import { PostsServiceProvider } from '@/services/PostsService';
import { postsStore } from '@/store/posts';
import { PostsSearchType } from '@/store/posts/posts.dto';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
    Alert,
    Breadcrumbs,
    Card,
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
import { DateUtil, Formatter } from '../api/date';

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

    const fetchData = async (page?: number) => {
        try {
            if (page) {
                postsStore.setPageNumber(page);
            }

            const res = await service.fetch(postsStore);

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
    }, []);

    return (
        <>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12} md={10} lg={11}>
                    {postsStore.getEntities() &&
                        postsStore.getEntities()?.map(post => {
                            return (
                                <Card
                                    sx={{ padding: 2 }}
                                    key={post.id}
                                    elevation={3}
                                >
                                    <Grid container gap={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                {post.title}
                                            </Typography>
                                            <Stack
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <Typography variant="subtitle2">
                                                    {post.category?.name}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {post.viewCount?.count}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {DateUtil.ToDateStringBySeoul(
                                                        post?.uploadDate!,
                                                        Formatter.DATETIME,
                                                    )}
                                                </Typography>
                                            </Stack>

                                            <Divider />
                                            <Markdown>{post.content}</Markdown>
                                        </Grid>
                                    </Grid>
                                </Card>
                            );
                        })}
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
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
