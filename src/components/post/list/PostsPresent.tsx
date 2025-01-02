/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SearchBuilder } from '@/components/common/builder/SearchBuilder';
import { PostsSearchType } from '@/models/PostsSearchType';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  Grid2 as Grid,
  Pagination,
  SxProps,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { SearchComponent } from './SearchComponent';
import { DateUtil, Formatter } from '@/lib/date';
import LockIcon from '@mui/icons-material/Lock';
import { PostEntity } from '@/models/PostEntity';
import { BlogLoading } from './BlogLoading';
import { useRouter } from 'next/navigation';
import usePostsStore from '@/store/posts';
import { usePosts } from '@/hooks/api/usePosts';
import { useFetchDataBySearch } from '@/hooks/api/useFetchDataBySearch';
import { useFetchData } from '@/hooks/api/useFetchData';

export const SearchBox = SearchBuilder<PostsSearchType>(usePostsStore);

export const PostsPresent = () => {
  const categoryService = useCategoryService();
  const router = useRouter();

  const postsStore = usePostsStore();

  const { data, isLoading } = usePosts();
  const { fetchData } = useFetchData();
  const { fetchDataBySearch } = useFetchDataBySearch();

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData();
  }, [categoryService.getCurrentMenuCategoryId()]);

  const goToPage = (post: PostEntity) => {
    const postId = post.id;
    if (post.isPrivate) {
      router.push(`/secret/${postId}`);
      return;
    }
    router.push(`/posts/${postId}`);
  };

  if (isLoading) {
    return <BlogLoading />;
  }

  return (
    <Grid
      sx={{ flexGrow: 1 }}
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      flexDirection={'column'}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <CssBaseline />
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
          }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr 1fr ',
              lg: '1fr 1fr 1fr 1fr',
            },
            gridTemplateRows: '1fr',
            gap: 3,
            flexDirection: 'column',
            marginTop: 2,
            width: '100%',
            px: 2,
          }}
        >
          {data?.entities &&
            data?.entities?.map(post => {
              const mediaProp: SxProps = {
                cursor: 'pointer',
                width: '100%',
                minHeight: 200,
                maxHeight: 200,
                borderRadius: 3,
              };

              const isValidImage = post.images && post.images.length > 0;

              return (
                <Card
                  sx={{
                    marginBottom: 1,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    minHeight: 280,
                  }}
                  className="transition duration-300 ease-in-out transform shadow-md bg:gray-50 hover:bg-gray-100 hover:-translate-y-1 hover:scale-110"
                  key={'unique__' + post.id}
                  elevation={0}
                >
                  {isValidImage && (
                    <CardMedia
                      component="img"
                      image={post?.images?.[0].path}
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
                    titleTypographyProps={{
                      variant: 'h4',
                      align: 'left',
                    }}
                    sx={{
                      cursor: 'pointer',
                      color: 'text.primary',
                      fontWeight: 'bold',
                      width: '100%',
                      '& .MuiCardHeader-title': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '80%',
                      },
                      userSelect: 'none',
                    }}
                    onClick={() => goToPage(post)}
                  ></CardHeader>
                  {!isValidImage && (
                    <CardContent>
                      {post.content && (
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                          }}
                        >
                          {post.content}
                        </Typography>
                      )}
                    </CardContent>
                  )}
                  <CardActions
                    sx={{
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Avatar variant="rounded">
                      {post.user?.profile?.nickname?.[0]}
                    </Avatar>
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
            })}
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={data?.pagination.maxPage}
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
};
