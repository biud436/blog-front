/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/blog/api/request';
import { HttpMethod, useAuth } from '@/blog/providers/auth/authProvider';
import { postsStore } from '@/store';
import { PostsSearchType } from '@/store/posts/posts.dto';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { IReactService, ReactServiceStore } from './types/ReactServiceStore';
import React from 'react';
import { BlogServerResponse } from './types/PostDtoType';

export type IPostsService = IReactService<PostsSearchType> & {
    getBreadcrumb: (categoryName: string) => Promise<any>;
};

export const PostsServiceContext = createContext<IPostsService | undefined>(
    undefined,
);

/**
 * 포스트 조회 서비스 (API)
 */
export class PostsServiceImpl implements IPostsService {
    constructor(
        private readonly requestData: (
            method: HttpMethod,
            fetchUrl: string,
            payload?: Record<string, any> | null | undefined,
        ) => Promise<any>,
    ) {
        makeAutoObservable(this);
    }

    async search(
        pageNumber: number,
        searchProperty: string,
        searchQuery: string,
    ) {
        const res = await axios.get(
            `${API_URL}/posts/search?pageNumber=${pageNumber}&searchProperty=${searchProperty}&searchQuery=${encodeURIComponent(
                searchQuery,
            )}`,
        );

        return res.data;
    }

    async view(pageNumber: number, categoryId?: number): Promise<any> {
        const res = await axios.get(
            `${API_URL}/posts?page=${pageNumber}&categoryId=${categoryId}`,
        );

        return res.data;
    }

    fetch(
        store: ReactServiceStore<PostsSearchType>,
        categoryId?: number,
    ): Promise<any> {
        const res = store.isSearchMode()
            ? this.search(
                  store.getPageNumber(),
                  store.getSearchType()!,
                  store.getSearchQuery()!,
              )
            : this.view(store.getPageNumber(), categoryId);

        return res;
    }

    async getBreadcrumb(categoryName: string): Promise<any> {
        const res = await axios.get(
            `${API_URL}/posts/breadcrumbs?categoryName=${categoryName}`,
        );

        return res.data;
    }
}

const fetcher = (url: string, queryParam: string) =>
    axios.get(`${url}?${queryParam}`).then(res => res.data);

export const PostsServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const auth = useAuth();
        const [postsService] = useState<IPostsService>(
            new PostsServiceImpl(auth.requestData),
        );

        const initialData = useMemo<BlogServerResponse>(
            () => ({
                message: '데이터 조회 성공',
                statusCode: 200,
                result: 'success',
                data: {
                    pagination: {
                        currentPage: 1,
                        totalCount: 1,
                        maxPage: 1,
                        currentBlock: 1,
                        maxBlock: 1,
                    },
                    entities: [],
                },
            }),
            [],
        );

        /**
         * =====================================================================
         * SWR을 이용한 데이터 조회 (클래스 믹스인)
         * =====================================================================
         */
        const [queryParam, setQueryParam] = useState('');
        const res = useSWR(
            queryParam ? [`${API_URL}/posts`, queryParam] : null,
            fetcher,
            {
                fallbackData: initialData,
            },
        );

        postsService.view = async (pageNumber: number, categoryId?: number) => {
            setQueryParam(`page=${pageNumber}&categoryId=${categoryId}`);
        };
        /**
         * =====================================================================
         * 데이터 조회
         * =====================================================================
         */
        useEffect(() => {
            if (res.data) {
                const { entities, pagination } = res.data?.data;

                postsStore.setPagination(pagination);
                postsStore.setEntities(entities);
            }
        }, [res.data]);

        return (
            <PostsServiceContext.Provider value={postsService}>
                {children}
            </PostsServiceContext.Provider>
        );
    },
);
