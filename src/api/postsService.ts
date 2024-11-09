import instance from '@/blog/api/axios-new';
import { CacheControl } from '@/blog/api/request';
import { PostContent } from '@/models/PostContent';

interface UpdatePostProps {
  postId: number;
  payload: PostContent;
}

export const postsService = {
  async writePost(payload: PostContent) {
    const res = await instance.post(`/posts`, payload);

    return res.data;
  },
  async updatePost({ payload, postId }: UpdatePostProps) {
    const res = await instance.patch(`/posts/${postId}`, payload, {
      headers: {
        ...CacheControl.NoCache,
      },
    });

    return res.data;
  },
  async deletePost(postId: number) {
    const res = await instance.delete(`/posts/${postId}`);

    return res.data;
  },

  async getPost(postId: number) {
    const res = await instance.get(`/posts/${postId}`, {
      withCredentials: true,
    });

    return res.data?.data;
  },
};
