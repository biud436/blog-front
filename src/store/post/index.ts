import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { makePersistable } from 'mobx-persist-store';

enableStaticRendering(typeof window === 'undefined');

export interface Post {
    id: number;
    title: string;
    content: string;
    uploadDate: string;
    user: {
        username: string;
        profile: {
            nickname: string;
        };
    };
    category: {
        name: string;
    };
    viewCount: {
        count: number;
    };
    images: PostImage[];
    thumbnail?: string;
    previewContent?: string;
}

export interface PostImage {
    readonly id: number;
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly destination: string;
    readonly filename: string;
    readonly path: string;
    readonly size: number;
    readonly postId: number;
}

export class PostStore {
    data: Post = Object.create(null);

    constructor() {
        makeAutoObservable(this);

        if (typeof window !== 'undefined') {
            makePersistable(this, {
                name: 'PostStore',
                properties: ['data'],
                storage: window.localStorage,
            });
        }
    }

    setPost(post: Post) {
        this.data = post;
    }

    getPost() {
        return this.data;
    }

    setData(data: Post) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}
