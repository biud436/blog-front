'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCategoryStore } from '@/store/category';
import usePostsStore from '@/store/posts';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { PostsSearchType } from '@/models/PostsSearchType';

const scrollToPosts = () => {
  requestAnimationFrame(() => {
    document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
  });
};

/**
 * 카테고리 이동 / 검색 / 검색 해제를 한 곳에서 처리합니다.
 * 헤더, 사이드 메뉴, 카테고리 칩, 커맨드 팔레트가 공유합니다.
 */
export function useBlogNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const goHome = useCallback(
    (scroll: boolean) => {
      if (pathname !== '/') {
        router.push(scroll ? '/#posts' : '/');
        return;
      }
      if (scroll) scrollToPosts();
    },
    [pathname, router],
  );

  const selectCategory = useCallback(
    (category: CategoryDepthVO | null) => {
      const categoryStore = useCategoryStore.getState();
      const postsStore = usePostsStore.getState();
      const root = categoryStore.categories[0];
      const isRoot = !category || category.id === root?.id;

      categoryStore.setCurrentMenuCategoryId(isRoot ? null : category.id);
      postsStore.setSearchMode(false);
      postsStore.clearSearch();
      postsStore.setPageNumber(1);
      goHome(true);
    },
    [goHome],
  );

  const search = useCallback(
    (query: string, type: PostsSearchType) => {
      const postsStore = usePostsStore.getState();
      postsStore.setSearchType(type);
      postsStore.setSearchQuery(query);
      postsStore.setSearchMode(true);
      postsStore.setPageNumber(1);
      goHome(true);
    },
    [goHome],
  );

  const clearSearch = useCallback(() => {
    const postsStore = usePostsStore.getState();
    postsStore.setSearchMode(false);
    postsStore.clearSearch();
    postsStore.setPageNumber(1);
  }, []);

  return { selectCategory, search, clearSearch, goHome };
}
