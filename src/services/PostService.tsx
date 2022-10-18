import { RequestHandler } from '@/app/api/axios';
import { API_URL, post } from '@/app/api/request';
import { Post, PostStore } from '@/store/post';
import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { createContext, ReactNode } from 'react';

export interface IPostService {
    isSamePost(postId: number): boolean;
    fetch(postId: number): Promise<void>;
    isLoadingState(): boolean;
    isErrorState(): boolean;
    getErrorMessage(): string;
    setData(data: Post): void;
    getData(): Post;
    getNickname(): string;
    getTitle(): string;
    getContent(): string;
    getCount(): number;
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

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Get the post content from the server.
     *
     * @param postId
     */
    async fetch(postId: number) {
        this.isLoading = true;

        try {
            const raw = (await axios.get(
                `${API_URL}/posts/${postId}`,
            )) as AxiosResponse<IServerResponse>;
            const res = raw.data;

            console.log(res);

            const message = res.message;
            const statusCode = res.statusCode;
            const result = res.result;

            const data = res.data as Post;

            this.setData(data);

            this.isError = false;
        } catch (e: any) {
            console.error(e);
            this.errorMessage = e.message ?? 'Unknown error';
            this.isError = true;
        } finally {
            this.isLoading = false;
        }
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
