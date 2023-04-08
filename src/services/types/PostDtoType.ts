export interface Pagination {
    currentPage: number;
    totalCount: number;
    maxPage: number;
    currentBlock: number;
    maxBlock: number;
}

export interface User {
    id: number;
    username: string;
    profile: {
        nickname: string;
        profileImage: string | null;
    };
    role: string;
}

export interface Category {
    name: string;
    groupId: number;
}

export interface Entity {
    id: number;
    categoryId: number;
    isPrivate: boolean;
    title: string;
    content: string;
    uploadDate: string;
    user: User;
    category: Category;
    images: string[];
    previewContent: string;
}

export interface BlogServerResponse {
    message: string;
    statusCode: number;
    result: 'success' | 'failure';
    data: {
        pagination: Pagination;
        entities: Entity[];
    };
}
