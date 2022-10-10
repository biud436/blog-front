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
}

export type PostsSearchType = 'title' | 'content';
