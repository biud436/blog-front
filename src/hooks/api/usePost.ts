import { Post } from '@/models/Post';
import { useEffect, useState } from 'react';
import usePosts from './usePosts';

export function usePost(postId: number) {
  const [post, setPost] = useState<Post>(Object.create(null));
  const { raw, error } = usePosts(postId);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (raw) {
      const res = raw;
      const data = res.data as Post;

      setPost(data);
    }
  }, [raw, error]);

  return { post, error };
}
