import usePostsStore from '@/store/posts';
import { useCategoryService } from '../services/useCategoryService';
import { toast } from 'react-toastify';

/**
 * 새로운 페이지를 불러오는 훅
 */
export function useFetchData() {
  const categoryService = useCategoryService();
  const postsStore = usePostsStore();

  const fetchData = async (page?: number) => {
    try {
      if (page) {
        postsStore.setPageNumber(page);
      }

      // 카테고리 설정
      postsStore.setCurrentCategoryId(
        categoryService.getCurrentMenuCategoryId(),
      );
    } catch (e) {
      toast.error('조회 결과가 없습니다');
      postsStore.setEntities([]);
    }
  };

  return {
    fetchData,
  };
}
