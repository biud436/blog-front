import { HttpMethod } from '@/app/providers/authProvider';
import { PostsSearchType } from '@/store/posts/posts.dto';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { createContext, ReactNode, useState } from 'react';
import { IReactService, ReactServiceStore } from './types/ReactServiceStore';

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

export class CategoryService {
    categories: CategoryDepthVO[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

export const CategoryServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const [categoryService, setCategoryService] = useState(
            new CategoryService(),
        );

        return (
            <>
                <CategoryServiceContext.Provider value={categoryService}>
                    {children}
                </CategoryServiceContext.Provider>
            </>
        );
    },
);
