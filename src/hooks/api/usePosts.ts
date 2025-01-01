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

  const { data, isLoading, error } = useQuery({
    queryKey: ['/posts/posts', pageNumber, categoryId],
    queryFn: async () =>
      postsStore.isSearchMode()
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
