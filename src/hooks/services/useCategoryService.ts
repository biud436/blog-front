import { CategoryState, useCategoryStore } from '@/store/category';

/**
 * 카테고리 서비스를 가져오는 훅
 */
export function useCategoryService(): CategoryState {
  return useCategoryStore();
}
