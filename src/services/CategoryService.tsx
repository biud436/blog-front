'use client';

import { observer } from 'mobx-react-lite';
import React, { createContext, ReactNode, useState } from 'react';
import { CategoryDepthVO } from '../models/CategoryDepthVO';

export const CategoryServiceContext = createContext<
    CategoryService | undefined
>(undefined);

export type CategoryItemId = number | undefined | null;

export interface CategoryService {
    categories: CategoryDepthVO[];
    isReady: boolean;
    currentMenuCategoryId: CategoryItemId;
    setCategories(categories: CategoryDepthVO[]);
    getCategories(): CategoryDepthVO[];
    setCurrentMenuCategoryId(id: CategoryItemId);
    getCurrentMenuCategoryId(): CategoryItemId;
}

export function useCategoryServiceBuilder() {
    const [categories, setCategoriesAction] = useState<CategoryDepthVO[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [currentMenuCategoryId, setCurrentMenuCategoryIdAction] =
        useState<CategoryItemId>(undefined);

    const setCategories = (categories: CategoryDepthVO[]) => {
        setCategoriesAction(categories);

        if (!isReady) {
            setIsReady(true);
        }
    };

    const getCategories = () => {
        return categories;
    };

    const setCurrentMenuCategoryId = (id: CategoryItemId) => {
        setCurrentMenuCategoryIdAction(id);
    };

    const getCurrentMenuCategoryId = () => {
        return currentMenuCategoryId;
    };

    return {
        categories,
        isReady,
        currentMenuCategoryId,
        setCategories,
        getCategories,
        setCurrentMenuCategoryId,
        getCurrentMenuCategoryId,
    } as CategoryService;
}

export const CategoryServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const value = useCategoryServiceBuilder() as CategoryService;

        return (
            <>
                <CategoryServiceContext.Provider value={value}>
                    {children}
                </CategoryServiceContext.Provider>
            </>
        );
    },
);
