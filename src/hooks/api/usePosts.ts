import { useQuery } from '@tanstack/react-query';
import { useCategoryService } from '../services/useCategoryService';
import usePostsStore from '@/store/posts';
import { postsService } from '@/api/postsService';

export function usePosts() {
  const categoryService = useCategoryService();

  const postsStore = usePostsStore();
  const pageNumber = postsStore.getPageNumber();
  const categoryId = categoryService.getCurrentMenuCategoryId();
  const searchProperty = postsStore.getSearchType();
  const searchQuery = postsStore.getSearchQuery();
  const isSearchMode = postsStore.isSearchMode();

  const { data, isLoading, error } = useQuery({
    // 검색 조건을 키에 포함해야 검색/해제 시 항상 올바른 목록을 다시 가져옵니다.
    queryKey: [
      '/posts/posts',
      pageNumber,
      categoryId,
      isSearchMode ? { searchProperty, searchQuery } : null,
    ],
    queryFn: async () =>
      isSearchMode
        ? postsService.getPostsUsingSearch({
            pageNumber,
            searchProperty,
            searchQuery,
          })
        : postsService.getPosts({
            pageNumber,
            categoryId,
          }),
  });

  return {
    data,
    isLoading,
    error,
  };
}
