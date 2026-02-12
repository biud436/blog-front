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
  InputBase,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { DateUtil, Formatter } from '@/lib/date';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PostEntity } from '@/models/PostEntity';
import { BlogLoading } from './BlogLoading';
import { useRouter } from 'next/navigation';
import usePostsStore from '@/store/posts';
import { usePosts } from '@/hooks/api/usePosts';
import { useFetchDataBySearch } from '@/hooks/api/useFetchDataBySearch';
import { useFetchData } from '@/hooks/api/useFetchData';

export const SearchBox = SearchBuilder<PostsSearchType>(usePostsStore);

/* ── Design Tokens ───────────────────────────────────── */
const tokens = {
  ink: '#1c1917',
  inkSecondary: '#57534e',
  inkTertiary: '#a8a29e',
  inkMuted: '#d6d3d1',
  parchment: '#fafaf9',
  surface: '#ffffff',
  accent: '#c2410c',
  accentSoft: '#fff7ed',
  border: 'rgba(28, 25, 23, 0.06)',
  borderHover: 'rgba(28, 25, 23, 0.12)',
  shadow: {
    sm: '0 1px 2px rgba(28,25,23,0.04), 0 1px 3px rgba(28,25,23,0.06)',
    md: '0 2px 4px rgba(28,25,23,0.03), 0 4px 12px rgba(28,25,23,0.06), 0 8px 24px rgba(28,25,23,0.04)',
    lg: '0 4px 8px rgba(28,25,23,0.04), 0 8px 24px rgba(28,25,23,0.08), 0 16px 48px rgba(28,25,23,0.06)',
    hover:
      '0 4px 12px rgba(28,25,23,0.06), 0 12px 32px rgba(28,25,23,0.1), 0 20px 56px rgba(28,25,23,0.06)',
  },
  radius: { sm: '8px', md: '16px', lg: '24px' },
};

/* ── Relative date helper ────────────────────────────── */
function relativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return DateUtil.ToDateStringBySeoul(dateStr, Formatter.DATETIME);
}

/* ── Hero Card (첫 번째 포스트) ──────────────────────── */
const HeroCard = ({
  post,
  isNew,
  onClick,
}: {
  post: PostEntity;
  isNew: boolean;
  onClick: () => void;
}) => {
  const hasImage = post.images && post.images.length > 0;

  return (
    <Card
      onClick={onClick}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        cursor: 'pointer',
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.surface,
        boxShadow: tokens.shadow.md,
        border: `0.5px solid ${tokens.border}`,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        minHeight: { md: '340px' },
        '&:hover': {
          boxShadow: tokens.shadow.hover,
          transform: 'translateY(-2px)',
          '& .hero-image': {
            transform: 'scale(1.03)',
          },
        },
      }}
    >
      {/* Image */}
      {hasImage && (
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '55%' },
            minHeight: { xs: '220px', md: 'auto' },
            overflow: 'hidden',
            backgroundColor: '#f5f0eb',
          }}
        >
          <CardMedia
            component="img"
            image={post.images?.[0].path}
            alt={post.title}
            className="hero-image"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {/* Subtle gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: {
                xs: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.04))',
                md: 'linear-gradient(to right, transparent 70%, rgba(255,255,255,0.06))',
              },
              pointerEvents: 'none',
            }}
          />
        </Box>
      )}

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 3, sm: 4, md: 5 },
          gap: 2,
        }}
      >
        {/* Meta row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {post.category && (
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: tokens.accent,
              }}
            >
              {post.category.name}
            </Typography>
          )}
          {isNew && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: tokens.accent,
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            fontWeight: 700,
            lineHeight: 1.25,
            color: tokens.ink,
            letterSpacing: '-0.025em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </Typography>

        {/* Preview */}
        {post.content && (
          <Typography
            sx={{
              color: tokens.inkSecondary,
              fontSize: '1rem',
              lineHeight: 1.7,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.content}
          </Typography>
        )}

        {/* Footer meta */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 'auto',
            pt: 1,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 14, color: tokens.inkTertiary }} />
          <Typography
            sx={{
              fontSize: '0.8125rem',
              color: tokens.inkTertiary,
              fontFeatureSettings: '"tnum"',
            }}
          >
            {relativeDate(post.uploadDate!)}
          </Typography>
          {post.isPrivate && (
            <LockIcon sx={{ fontSize: 14, color: tokens.inkTertiary, ml: 1 }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

/* ── Standard Post Card ──────────────────────────────── */
const PostCard = ({
  post,
  isNew,
  onClick,
}: {
  post: PostEntity;
  isNew: boolean;
  onClick: () => void;
}) => {
  const hasImage = post.images && post.images.length > 0;

  return (
    <Card
      onClick={onClick}
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.surface,
        boxShadow: tokens.shadow.sm,
        border: `0.5px solid ${tokens.border}`,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          boxShadow: tokens.shadow.lg,
          transform: 'translateY(-3px)',
          '& .card-image': {
            transform: 'scale(1.04)',
          },
        },
      }}
    >
      {/* Image */}
      {hasImage && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '52%',
            overflow: 'hidden',
            backgroundColor: '#f5f0eb',
          }}
        >
          <CardMedia
            component="img"
            image={post.images?.[0].path}
            alt={post.title}
            className="card-image"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {post.isPrivate && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(28, 25, 23, 0.65)',
                backdropFilter: 'blur(4px)',
                borderRadius: tokens.radius.sm,
                p: '6px 10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LockIcon sx={{ fontSize: 15, color: '#fff' }} />
            </Box>
          )}
        </Box>
      )}

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 3,
          '&:last-child': { pb: 3 },
        }}
      >
        {/* Category + NEW dot */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {post.category && (
            <Typography
              sx={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: tokens.accent,
              }}
            >
              {post.category.name}
            </Typography>
          )}
          {isNew && (
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: tokens.accent,
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            fontWeight: 650,
            lineHeight: 1.35,
            color: tokens.ink,
            letterSpacing: '-0.015em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </Typography>

        {/* Preview */}
        {post.content && (
          <Typography
            sx={{
              color: tokens.inkSecondary,
              fontSize: '0.875rem',
              lineHeight: 1.65,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: hasImage ? 2 : 3,
              WebkitBoxOrient: 'vertical',
              mb: 'auto',
            }}
          >
            {post.content}
          </Typography>
        )}

        {/* Date */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 'auto',
            pt: 1,
            borderTop: `1px solid ${tokens.border}`,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 13, color: tokens.inkTertiary }} />
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: tokens.inkTertiary,
              fontFeatureSettings: '"tnum"',
            }}
          >
            {relativeDate(post.uploadDate!)}
          </Typography>
          {!hasImage && post.isPrivate && (
            <LockIcon
              sx={{ fontSize: 13, color: tokens.inkTertiary, ml: 'auto' }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

/* ── Inline Search ───────────────────────────────────── */
const InlineSearch = ({
  fetchDataBySearch,
}: {
  fetchDataBySearch: (page?: number) => Promise<void>;
}) => {
  const store = usePostsStore();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        maxWidth: '560px',
        margin: '0 auto',
        backgroundColor: tokens.surface,
        border: `1px solid ${tokens.borderHover}`,
        borderRadius: '12px',
        px: 2,
        py: 0.5,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:focus-within': {
          borderColor: tokens.accent,
          boxShadow: `0 0 0 3px ${tokens.accentSoft}`,
        },
      }}
    >
      {/* Category select */}
      <Select
        value={(store.getSearchType() ?? store.getDefaultCategory()!) as string}
        onChange={(e: SelectChangeEvent) => {
          store.setSearchType(e.target.value as any);
        }}
        variant="standard"
        disableUnderline
        sx={{
          fontSize: '0.8125rem',
          color: tokens.inkSecondary,
          fontWeight: 500,
          minWidth: '72px',
          '& .MuiSelect-select': {
            py: 1,
            pr: 3,
          },
          '&:before, &:after': { display: 'none' },
        }}
      >
        {Object.keys(store.getSearchCategories()!).map(key => {
          const items = store.getSearchCategories()!;
          return (
            <MenuItem key={key} value={key} sx={{ fontSize: '0.8125rem' }}>
              {items[key]}
            </MenuItem>
          );
        })}
      </Select>

      {/* Divider */}
      <Box
        sx={{
          width: '1px',
          height: '24px',
          backgroundColor: tokens.inkMuted,
          flexShrink: 0,
        }}
      />

      {/* Input */}
      <InputBase
        placeholder="검색어를 입력하세요"
        value={store.getSearchQuery() ?? ''}
        onChange={e => {
          const { value } = e.target;
          if (value === '') store.setSearchMode(false);
          store.setSearchQuery(value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') fetchDataBySearch(1);
        }}
        sx={{
          flex: 1,
          fontSize: '0.875rem',
          color: tokens.ink,
          '& input::placeholder': {
            color: tokens.inkTertiary,
            opacity: 1,
          },
        }}
      />

      {/* Search button */}
      <IconButton
        onClick={() => fetchDataBySearch(1)}
        size="small"
        sx={{
          color: tokens.inkTertiary,
          transition: 'color 0.15s ease',
          '&:hover': {
            color: tokens.accent,
            backgroundColor: tokens.accentSoft,
          },
        }}
      >
        <SearchIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════ */
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

  const posts = data?.entities ?? [];
  const heroPost = posts[0];
  const remaining = posts.slice(1);
  const isFirstPage = postsStore.getPageNumber() === 1;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        backgroundColor: tokens.parchment,
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          maxWidth: '960px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* ── Header ─────────────────────────────────── */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 750,
              color: tokens.ink,
              mb: 1,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            최근 포스트
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.9375rem', sm: '1.0625rem' },
              color: tokens.inkTertiary,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            개발과 기술에 대한 이야기
          </Typography>
        </Box>

        {/* ── Hero Card (첫 페이지 첫 번째 포스트) ────── */}
        {isFirstPage &&
          heroPost &&
          (() => {
            const uploadDate = new Date(heroPost.uploadDate!);
            const now = new Date();
            const diffDays = Math.ceil(
              Math.abs(now.getTime() - uploadDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            return (
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <HeroCard
                  post={heroPost}
                  isNew={diffDays <= 5}
                  onClick={() => goToPage(heroPost)}
                />
              </Box>
            );
          })()}

        {/* ── Post Grid ──────────────────────────────── */}
        <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ mb: 5 }}>
          {(isFirstPage ? remaining : posts).map(post => {
            const uploadDate = new Date(post.uploadDate!);
            const now = new Date();
            const diffDays = Math.ceil(
              Math.abs(now.getTime() - uploadDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <Grid key={'post__' + post.id} size={{ xs: 12, sm: 6 }}>
                <PostCard
                  post={post}
                  isNew={diffDays <= 5}
                  onClick={() => goToPage(post)}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* ── Pagination ──────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <Pagination
            count={data?.pagination.maxPage}
            page={postsStore.getPageNumber()}
            boundaryCount={2}
            size="medium"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '0.8125rem',
                fontWeight: 500,
                borderRadius: tokens.radius.sm,
                minWidth: '36px',
                height: '36px',
                color: tokens.inkSecondary,
                border: 'none',
                transition: 'all 0.15s ease',
                '&:hover': {
                  backgroundColor: 'rgba(28, 25, 23, 0.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: tokens.ink,
                  color: tokens.surface,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#292524',
                  },
                },
                '&.MuiPaginationItem-previousNext, &.MuiPaginationItem-firstLast':
                  {
                    border: `1px solid ${tokens.borderHover}`,
                    '&:hover': {
                      borderColor: tokens.inkTertiary,
                      backgroundColor: tokens.surface,
                    },
                  },
              },
            }}
            showFirstButton
            showLastButton
            onChange={(e, p) => handlePage(e, p)}
          />
        </Box>

        {/* ── Search ──────────────────────────────────── */}
        <Box sx={{ py: 3 }}>
          <InlineSearch fetchDataBySearch={fetchDataBySearch} />
        </Box>
      </Box>
    </Box>
  );
};
