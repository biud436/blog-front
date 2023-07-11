/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/blog/api/request';
import { PostsServiceContext, IPostsService } from '@/services/PostsService';
import { ReactServiceStore } from '@/services/types/ReactServiceStore';
import { PostsSearchType } from '@/models/PostsSearchType';
import axios from 'axios';
import { useContext } from 'react';

/**
 * 포스트 서비스를 제공하는 훅
 *
 * @returns
 */
export function usePostsService(): IPostsService {
    const service = useContext(PostsServiceContext);

    if (service === undefined) {
        throw new Error(
            'usePostsService must be used within a PostsServiceProvider',
        );
    }

    return service;
}

export function usePostsService2(): IPostsService {
    const search = async (
        pageNumber: number,
        searchProperty: string,
        searchQuery: string,
    ) => {
        const res = await axios.get(
            `${API_URL}/posts/search?pageNumber=${pageNumber}&searchProperty=${searchProperty}&searchQuery=${encodeURIComponent(
                searchQuery,
            )}`,
        );

        return res.data;
    };

    const view = async (
        pageNumber: number,
        categoryId?: number,
    ): Promise<any> => {
        const res = await axios.get(
            `${API_URL}/posts?page=${pageNumber}&categoryId=${categoryId}`,
        );

        return res.data;
    };

    const fetch = (
        store: ReactServiceStore<PostsSearchType>,
        categoryId?: number,
    ): Promise<any> => {
        const res = store.isSearchMode()
            ? search(
                  store.getPageNumber(),
                  store.getSearchType()!,
                  store.getSearchQuery()!,
              )
            : view(store.getPageNumber(), categoryId);

        return res;
    };

    const getBreadcrumb = async (categoryName: string): Promise<any> => {
        const res = await axios.get(
            `${API_URL}/posts/breadcrumbs?categoryName=${categoryName}`,
        );

        return res.data;
    };

    return {
        fetch,
        getBreadcrumb,
        search,
        view,
    };
}
