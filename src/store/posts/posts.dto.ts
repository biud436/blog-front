export class PostImage {
    id: number | undefined;
    originalname: string | undefined;
    mimetype: string | undefined;
    path: string | undefined;
    size: number | undefined;
    postId: number | undefined;
}

export class PostDto {
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
    uploadDate: string | undefined;
    user:
        | {
              username: string | undefined;
              profile: {
                  nkickname: string | undefined;
              };
          }
        | undefined;
    category:
        | {
              name: string | undefined;
          }
        | undefined;
    viewCount:
        | {
              count: number | undefined;
          }
        | undefined;
    images: PostImage[] | undefined;
}

export type PostsSearchType = 'title' | 'content';
