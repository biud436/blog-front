'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { SearchBuilder } from '@/components/common/builder/SearchBuilder';
import { PostsSearchType } from '@/models/PostsSearchType';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import usePostsStore from '@/store/posts';
import { usePosts } from '@/hooks/api/usePosts';
import { useFetchData } from '@/hooks/api/useFetchData';
import { useBlogNavigation } from '@/hooks/blog/useBlogNavigation';
import { HomeIntro } from '@/components/blog/home/HomeIntro';
import { TopStories } from '@/components/blog/home/TopStories';
import { CategoryTabs } from '@/components/blog/home/CategoryTabs';
import { PostGrid, PostGridSkeleton } from '@/components/blog/home/PostGrid';
import { Pagination } from '@/components/blog/home/Pagination';
import { flattenCategories, splitCategoryName } from '@/components/blog/utils';

export const SearchBox = SearchBuilder<PostsSearchType>(usePostsStore);

/** 백엔드 PaginationConfig.limit.numberPerPage 와 같은 값 */
const PAGE_SIZE = 8;

const scrollToPosts = () =>
  document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });

export const PostsPresent = () => {
  const categoryService = useCategoryService();
  const postsStore = usePostsStore();
  const { selectCategory, clearSearch } = useBlogNavigation();

  const { data, isLoading } = usePosts();
  const { fetchData } = useFetchData();

  const currentCategoryId = categoryService.getCurrentMenuCategoryId();
  const isSearch = postsStore.isSearchMode();
  const pageNumber = postsStore.getPageNumber();
  const posts = data?.entities ?? [];

  useEffect(() => {
    fetchData();
  }, [currentCategoryId]);

  // 다른 페이지에서 "/#posts"로 이동해 온 경우 목록으로 스크롤합니다.
  useEffect(() => {
    if (window.location.hash !== '#posts') return;
    const id = window.setTimeout(scrollToPosts, 300);
    return () => window.clearTimeout(id);
  }, []);

  /* 필터가 없는 목록에서 본 전체 글 수/최신 글 날짜를 기억해 소개 영역에 보여줍니다. */
  const overview = useRef<{ total?: number; latest?: string }>({});
  if (data && !isSearch && !currentCategoryId) {
    overview.current.total = data.pagination.totalCount;
    if (pageNumber === 1) overview.current.latest = posts[0]?.uploadDate;
  }

  const categories = categoryService.categories;
  const root = categories[0];
  const allCategories = useMemo(
    () => flattenCategories(categories),
    [categories],
  );
  const tabs = useMemo(
    () => (root ? [root, ...(root.children ?? [])] : []),
    [root],
  );
  const activeCategory = allCategories.find(c => c.id === currentCategoryId);

  /*
   * 백엔드의 /posts 응답은 카테고리를 골라도 totalCount·maxPage가 전체 글 기준입니다.
   * 카테고리 트리의 글 수(자손 포함)로 개수와 페이지 수를 다시 계산합니다.
   */
  const categoryCount =
    activeCategory && activeCategory.id !== root?.id && !isSearch
      ? splitCategoryName(activeCategory.name).count
      : undefined;
  const listCount = categoryCount ?? data?.pagination.totalCount;
  const maxPage =
    data && categoryCount !== undefined
      ? Math.min(
          data.pagination.maxPage,
          Math.max(1, Math.ceil(categoryCount / PAGE_SIZE)),
        )
      : data?.pagination.maxPage;

  /* 페이지 전환 중에도 페이지네이션이 사라지지 않도록 마지막 값을 유지합니다. */
  const lastMaxPage = useRef(0);
  if (maxPage !== undefined) lastMaxPage.current = maxPage;

  const handlePage = (page: number) => {
    fetchData(page);
    scrollToPosts();
  };

  // 첫 페이지(필터 없음)에서는 앞의 4개 글을 상단 영역에 보여줍니다.
  const TOP_COUNT = 4;
  const showTop =
    pageNumber === 1 && !isSearch && !currentCategoryId && posts.length > 0;
  const gridPosts = showTop ? posts.slice(TOP_COUNT) : posts;

  const listTitle = isSearch
    ? '검색 결과'
    : activeCategory && activeCategory.id !== root?.id
    ? splitCategoryName(activeCategory.name).label
    : '전체 글';

  return (
    <>
      <HomeIntro
        totalCount={
          overview.current.total ??
          (isSearch || currentCategoryId
            ? undefined
            : data?.pagination.totalCount)
        }
        categoryCount={Math.max(0, allCategories.length - (root ? 1 : 0))}
        latestDate={overview.current.latest}
      />

      {showTop && (
        <div className="b-container">
          <TopStories posts={posts.slice(0, TOP_COUNT)} />
        </div>
      )}

      <span className="b-anchor" id="posts" aria-hidden="true" />
      <div className="b-tabs-bar">
        <div className="b-container">
          <CategoryTabs
            categories={tabs}
            rootId={root?.id}
            currentId={currentCategoryId}
            onSelect={selectCategory}
          />
        </div>
      </div>

      <section className="b-container" aria-labelledby="b-list-title">
        <div className="b-list-head">
          <h2 className="b-list-head__title" id="b-list-title">
            {listTitle}
            {data && listCount !== undefined && (
              <span className="b-list-head__count">
                {listCount.toLocaleString('ko-KR')}
              </span>
            )}
          </h2>
          {isSearch && (
            <span className="b-search-chip">
              {postsStore.getSearchType() === 'title' ? '제목' : '내용'}: “
              {postsStore.getSearchQuery()}”
              <button
                type="button"
                aria-label="검색 해제"
                onClick={clearSearch}
              >
                <CloseIcon fontSize="small" />
              </button>
            </span>
          )}
        </div>

        {isLoading ? (
          <PostGridSkeleton />
        ) : posts.length === 0 ? (
          <div className="b-empty">
            <h3>{isSearch ? '검색 결과가 없어요' : '아직 글이 없어요'}</h3>
            <p style={{ margin: 0 }}>
              {isSearch
                ? '다른 검색어로 다시 찾아보세요.'
                : '이 카테고리에는 아직 글이 없어요.'}
            </p>
            {isSearch && (
              <button
                type="button"
                className="b-btn b-btn--sm"
                style={{ marginTop: 8 }}
                onClick={clearSearch}
              >
                검색 초기화
              </button>
            )}
          </div>
        ) : (
          gridPosts.length > 0 && <PostGrid posts={gridPosts} />
        )}

        <Pagination
          count={lastMaxPage.current}
          page={pageNumber}
          onChange={handlePage}
        />
      </section>
    </>
  );
};
