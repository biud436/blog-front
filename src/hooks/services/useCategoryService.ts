import { CategoryState, useCategoryStore } from '@/store/category';

export function useCategoryService(): CategoryState {
  return useCategoryStore();
}
