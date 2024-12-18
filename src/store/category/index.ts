import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { CategoryItemId } from '@/store/category/CategoryItemId';
import { create } from 'zustand';

export interface CategoryState {
    categories: CategoryDepthVO[];
    isReady: boolean;
    currentMenuCategoryId: CategoryItemId;
    setCategories: (categories: CategoryDepthVO[]) => void;
    getCategories: () => CategoryDepthVO[];
    setCurrentMenuCategoryId: (id: CategoryItemId) => void;
    getCurrentMenuCategoryId: () => CategoryItemId;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    // State
    categories: [],
    isReady: false,
    currentMenuCategoryId: undefined,

    // Actions
    setCategories: (categories: CategoryDepthVO[]) => {
        set((state) => ({
            categories,
            isReady: true
        }));
    },

    getCategories: () => {
        return get().categories;
    },

    setCurrentMenuCategoryId: (id: CategoryItemId) => {
        set({ currentMenuCategoryId: id });
    },

    getCurrentMenuCategoryId: () => {
        return get().currentMenuCategoryId;
    }
}));