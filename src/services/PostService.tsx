/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, CacheControl } from '@/blog/api/request';
import { PostStore } from '@/store/post';
import { Post } from '@/models/Post';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, ReactNode, useState } from 'react';

export interface IPostService {
    isSamePost(postId: number): boolean;
    isLoadingState(): boolean;
    isErrorState(): boolean;
    getErrorMessage(): string;
    setData(data: Post): void;
    getData(): Post;
    getNickname(): string;
    getTitle(): string;
    getContent(): string;
    getCount(): number;
    getId(): number;
    writePost: (payload: PostContent) => Promise<any>;
    updatePost: (postId: number, payload: PostContent) => Promise<any>;
    deletePost(postId: number): Promise<any>;
    getPost(postId: number): Promise<any>;
    isFetchTempPostState(): boolean;
    fetchTempPostState(): void;
    flushTempPostState(): void;
    setTempPostContent(content: TempPostContent): void;
    getTempPostContent(): TempPostContent;
    clearTempPostContent(): void;
    isFetchTempPost: boolean;
    refresh(): void;
    getFetchCount(): number;
}

export interface PostContent {
    title: string;
    content: string;
    categoryId: number;
}

export interface TempPostContent {
    title: string;
    content: string;
}

export interface IServerResponse {
    message: string;
    statusCode: number;
    result: 'success' | 'failure';
    data: Post | Record<string, any>;
}

export const PostContext = createContext<IPostService>(null!);

/**
 * 이 서비스는 Mobx(상태 관리)로 정의되어있습니다.
 */
export class PostServiceImpl implements IPostService {
    postStore: PostStore = new PostStore();
    isError = false;
    isLoading = false;
    errorMessage = '';

    isFetchTempPost = false;
    tempPostContent: TempPostContent = {
        content: '',
        title: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    isSamePost(postId: number): boolean {
        return this.getData().id === postId;
    }

    isLoadingState(): boolean {
        return this.isLoading;
    }

    isErrorState(): boolean {
        return this.isError;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

    setData(data: Post): void {
        this.postStore.setData(data);
    }

    getData(): Post {
        return this.postStore.getData();
    }

    getNickname(): string {
        return this.getData()?.user?.profile?.nickname ?? '';
    }

    getTitle(): string {
        return this.getData()?.title ?? '';
    }

    getContent(): string {
        return this.getData()?.content ?? '';
    }

    getCount(): number {
        return this.getData().viewCount.count ?? 0;
    }

    getId(): number {
        return this.getData().id;
    }

    isFetchTempPostState(): boolean {
        return this.isFetchTempPost;
    }

    fetchTempPostState(): void {
        this.isFetchTempPost = true;
    }

    flushTempPostState(): void {
        this.isFetchTempPost = false;
    }

    getTempPostContent(): TempPostContent {
        return this.tempPostContent;
    }

    setTempPostContent(content: TempPostContent): void {
        this.tempPostContent = content;
    }

    clearTempPostContent(): void {
        this.tempPostContent = {
            content: '',
            title: '',
        };
    }

    async writePost(payload: PostContent): Promise<any> {
        const res = await axios.post(`${API_URL}/posts`, payload);

        return res.data;
    }

    async updatePost(postId: number, payload: PostContent): Promise<any> {
        const res = await axios.patch(`${API_URL}/posts/${postId}`, payload, {
            headers: {
                ...CacheControl.NoCache,
            },
        });

        return res.data;
    }

    async deletePost(postId: number): Promise<any> {
        const res = await axios.delete(`${API_URL}/posts/${postId}`);

        return res.data;
    }

    async getPost(postId: number): Promise<any> {
        try {
            const res = await axios.get(`${API_URL}/posts/${postId}`, {
                withCredentials: true,
            });

            this.setData(res.data.data);
        } catch (e) {
            // empty
        } finally {
            this.isLoading = false;
        }
    }

    refresh(): void {
        this.postStore.refresh();
    }

    getFetchCount(): number {
        return this.postStore.getFetchCount();
    }
}

export function usePostServiceBuilder() {
    const [postService] = useState(() => new PostServiceImpl());

    return postService;
}

export const PostServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const postService = usePostServiceBuilder();

        return (
            <PostContext.Provider value={postService}>
                {children}
            </PostContext.Provider>
        );
    },
);
