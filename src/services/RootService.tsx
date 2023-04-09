/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from 'react';
import { createContext } from 'react';
import { IPostsService, usePostsServiceBuilder } from './PostsService';
import { IPostService, usePostServiceBuilder } from './PostService';
import { CategoryService, useCategoryServiceBuilder } from './CategoryService';
import { observer } from 'mobx-react-lite';

export interface RootServiceContextType {
    category: CategoryService;
    post: IPostService;
    posts: IPostsService;

    // isHydrated: boolean;
}

export const RootServiceContext = createContext<RootServiceContextType>(null!);

export const RootServiceProvider = observer(
    ({ children }: { children: React.ReactNode }) => {
        const categoryService = useCategoryServiceBuilder();
        const postService = usePostServiceBuilder();
        const postsService = usePostsServiceBuilder();

        const value = useMemo<RootServiceContextType>(
            () => ({
                category: categoryService,
                post: postService,
                posts: postsService,
            }),
            [categoryService, postService, postsService],
        );

        return (
            <RootServiceContext.Provider value={value}>
                {children}
            </RootServiceContext.Provider>
        );
    },
);
