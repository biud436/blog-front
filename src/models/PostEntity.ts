import { Category } from './Category';
import { PostImage } from './PostImage';
import { User } from './User';

export interface PostEntity {
    id: number;
    categoryId: number;
    isPrivate: boolean;
    title: string;
    content: string;
    uploadDate: string;
    user: User;
    category: Category;
    images: PostImage[];
    previewContent: string;
}
