/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SearchBuilder } from '@/components/common/builder/SearchBuilder';
import { PostsSearchType } from '@/models/PostsSearchType';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid2 as Grid,
  Pagination,
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

  const handlePage = (_event: React.ChangeEvent<unknown>, page: number) => {
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
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
      }}
    >
      <CssBaseline />

      {/* Header Section */}
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
          mb: 6,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 800,
            color: '#1a1a1a',
            mb: 2,
            letterSpacing: '-0.02em',
          }}
        >
          최근 포스트
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: '#666',
            fontWeight: 400,
          }}
        >
          개발과 기술에 대한 이야기
        </Typography>
      </Box>

      {/* Posts Grid */}
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          sx={{
            mb: 6,
          }}
        >
          {data?.entities &&
            data?.entities?.map(post => {
              const isValidImage = post.images && post.images.length > 0;

              // Check if post is new (within last 5 days)
              const uploadDate = new Date(post.uploadDate!);
              const now = new Date();
              const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const isNewPost = diffDays <= 5;

              return (
                <Grid
                  key={'unique__' + post.id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 4,
                  }}
                >
                  <Card
                    onClick={() => goToPage(post)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #e5e5e5',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        border: '1px solid #999',
                        '& .post-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                    elevation={0}
                  >
                    {/* Image Section */}
                    {isValidImage && (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '45%', // Reduced aspect ratio for shorter images
                          overflow: 'hidden',
                          backgroundColor: '#f5f5f5',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={post?.images?.[0].path}
                          alt={post.title}
                          className="post-image"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                        {post.isPrivate && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <LockIcon sx={{ fontSize: 18, color: '#fff' }} />
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* Content Section */}
                    <CardContent
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: { xs: 3, sm: 4 },
                        position: 'relative',
                      }}
                    >
                      {/* NEW Badge - Top Right */}
                      {isNewPost && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '6px',
                            backgroundColor: '#ff4757',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#fff',
                            letterSpacing: '0.5px',
                          }}
                        >
                          NEW
                        </Box>
                      )}

                      {/* Title */}
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          fontWeight: 700,
                          lineHeight: 1.3,
                          color: '#1a1a1a',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          letterSpacing: '-0.01em',
                          pr: isNewPost ? 6 : 0,
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Content Preview */}
                      {post.content && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#666',
                            fontSize: '0.9375rem',
                            lineHeight: 1.6,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: isValidImage ? 2 : 4,
                            WebkitBoxOrient: 'vertical',
                            mb: 'auto',
                          }}
                        >
                          {post.content}
                        </Typography>
                      )}

                      {/* Date at bottom */}
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#999',
                          fontSize: '0.8125rem',
                          mt: 'auto',
                          pt: 1,
                        }}
                      >
                        {DateUtil.ToDateStringBySeoul(
                          post?.uploadDate!,
                          Formatter.DATETIME,
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Pagination
            count={data?.pagination.maxPage}
            page={postsStore.getPageNumber()}
            boundaryCount={2}
            color="primary"
            size="medium"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '6px',
                minWidth: '32px',
                height: '32px',
                border: '1px solid #e5e5e5',
                color: '#666',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #999',
                },
                '&.Mui-selected': {
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid #1a1a1a',
                  '&:hover': {
                    backgroundColor: '#333',
                    border: '1px solid #333',
                  },
                },
              },
            }}
            showFirstButton
            showLastButton
            onChange={(e, p) => {
              handlePage(e, p);
            }}
          />
        </Box>

        {/* Search Component */}
        <SearchComponent fetchDataBySearch={fetchDataBySearch} />
      </Box>
    </Box>
  );
};
