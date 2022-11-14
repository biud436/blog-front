import { PostContext } from '@/services/PostService';
import { useContext } from 'react';

export function usePostService() {
    const service = useContext(PostContext);

    if (service === undefined) {
        throw new Error('usePostService must be used within a PostProvider');
    }

    return service;
}
