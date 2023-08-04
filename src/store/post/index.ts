import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { Post } from '../../models/Post';

enableStaticRendering(typeof window === 'undefined');

export class PostStore {
    data: Post = Object.create(null);
    private fetchCount = 0;

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

    refresh() {
        this.fetchCount++;
    }

    getFetchCount() {
        return this.fetchCount;
    }
}
