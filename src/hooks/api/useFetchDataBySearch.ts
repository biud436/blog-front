/* eslint-disable @typescript-eslint/no-explicit-any */
import usePostsStore from '@/store/posts';
import { useCategoryService } from '../services/useCategoryService';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useQueryClient } from '@tanstack/react-query';
import { PostsSearchType } from '@/models/PostsSearchType';

export function useFetchDataBySearch() {
  const categoryService = useCategoryService();
  const postsStore = usePostsStore();
  const pageNumber = postsStore.getPageNumber();
  const categoryId = categoryService.getCurrentMenuCategoryId();
  const queryClient = useQueryClient();

  const fetchDataBySearch = async () => {
    try {
      postsStore.setSearchMode(true);
      postsStore.setPageNumber(1);

      // TODO: tanstack query로 완전히 교체되면 이 라인을 삭제할 것.
      mutate(['/posts/posts', pageNumber, categoryId]);

      await queryClient.invalidateQueries({
        queryKey: ['/posts/posts', pageNumber, categoryId],
      });
    } catch (e: any) {
      postsStore.setSearchType(
        postsStore.getDefaultCategory() as PostsSearchType,
      );
      postsStore.setSearchQuery('');

      toast.error(e.message);
    }
  };

  return {
    fetchDataBySearch,
  };
}
