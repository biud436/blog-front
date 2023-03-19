import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, ReactNode, useState } from 'react';

export interface CategoryDepthVO {
    left: number;
    right: number;
    name: string;
    depth: number;

    /**
     * category id
     */
    id: number;

    open: boolean;

    children: CategoryDepthVO[];
}

export const CategoryServiceContext = createContext<
    CategoryService | undefined
>(undefined);

export type CategoryItemId = number | undefined | null;

export class CategoryService {
    categories: CategoryDepthVO[] = [];
    isReady = false;
    currentMenuCategoryId: CategoryItemId = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setCategories(categories: CategoryDepthVO[]) {
        this.categories = categories;

        if (!this.isReady) {
            this.isReady = true;
        }
    }

    getCategories() {
        return this.categories;
    }

    setCurrentMenuCategoryId(id: CategoryItemId) {
        this.currentMenuCategoryId = id;
    }

    getCurrentMenuCategoryId() {
        return this.currentMenuCategoryId;
    }
}

export const CategoryServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const [categoryService] = useState(new CategoryService());

        return (
            <>
                <CategoryServiceContext.Provider value={categoryService}>
                    {children}
                </CategoryServiceContext.Provider>
            </>
        );
    },
);
