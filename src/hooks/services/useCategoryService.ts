import {
  CategoryService,
  CategoryServiceContext,
} from '@/services/CategoryService';
import { useContext } from 'react';

export function useCategoryService(): CategoryService {
  const service = useContext(CategoryServiceContext);

  if (service === undefined) {
    throw new Error(
      'useCategoryService must be used within a CategoryServiceProvider',
    );
  }

  return service;
}
