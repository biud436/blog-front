/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
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

        return (
            <RootServiceContext.Provider
                value={{
                    category: categoryService,
                    post: postService,
                    posts: postsService,
                }}
            >
                {children}
            </RootServiceContext.Provider>
        );
    },
);
