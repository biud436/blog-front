import { PostContext } from '@/services/PostService';
import { Post } from '@/store/post';
import { useContext, useEffect, useState } from 'react';

export function usePost(postId: number) {
    const [post, setPost] = useState<Post>(Object.create(null));
    const service = useContext(PostContext);

    if (service === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }

    useEffect(() => {
        getPostData();
    }, [post]);

    const getPostData = async () => {
        if (service.isSamePost(postId)) {
            setPost(service.getData());
            return;
        }
        await service.fetch(postId);

        setPost(service.getData());
    };

    return { post };
}
