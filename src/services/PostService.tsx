import { API_URL } from '@/blog/api/request';
import { Post, PostStore } from '@/store/post';
import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { createContext, ReactNode } from 'react';

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

export class PostServiceImpl implements IPostService {
    postStore: PostStore = new PostStore();
    isError: boolean = false;
    isLoading: boolean = false;
    errorMessage: string = '';

    isFetchTempPost: boolean = false;
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

    /**
     * 임시 저장된 포스트를 가져와야 하는가?
     * @returns
     */
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
        const res = await axios.patch(`${API_URL}/posts/${postId}`, payload);

        return res.data;
    }

    async deletePost(postId: number): Promise<any> {
        const res = await axios.delete(`${API_URL}/posts/${postId}`);

        return res.data;
    }

    async getPost(postId: number): Promise<any> {
        this.isLoading = true;

        try {
            const res = await axios.get(`${API_URL}/posts/${postId}`);

            this.setData(res.data.data);
        } catch (e) {
        } finally {
            this.isLoading = false;
        }
    }
}

export const PostServiceProvider = observer(
    ({ children }: { children: ReactNode }) => {
        const postService = new PostServiceImpl();

        return (
            <PostContext.Provider value={postService}>
                {children}
            </PostContext.Provider>
        );
    },
);
