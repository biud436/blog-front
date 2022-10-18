import { makeAutoObservable } from 'mobx';

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
}

export class PostStore {
    data: Post = Object.create(null);

    constructor() {
        makeAutoObservable(this);
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
