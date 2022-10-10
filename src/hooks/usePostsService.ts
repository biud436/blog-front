import { PostsServiceContext, IPostsService } from '@/services/PostsService';
import { useContext } from 'react';

/**
 * 포스트 서비스를 제공하는 훅
 *
 * @returns
 */
export function usePostsService(): IPostsService {
    const service = useContext(PostsServiceContext);

    if (service === undefined) {
        throw new Error(
            'usePostsService must be used within a PostsServiceProvider',
        );
    }

    return service;
}
