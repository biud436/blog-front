import { PostImage } from './PostImage';

export class PostDto {
    id!: number;
    title!: string;
    content!: string;
    uploadDate!: string;
    user!: {
        username: string;
        profile: {
            nickname: string;
        };
    };
    category!: {
        name: string;
    };
    viewCount!: {
        count: number;
    };
    images!: PostImage[];
    isPrivate?: boolean | undefined;
}
