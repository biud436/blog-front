export interface IPostImage {
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
