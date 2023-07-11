import { IPostImage } from './IPostImage';

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
    images: IPostImage[];
    thumbnail?: string;
    previewContent?: string;
}
