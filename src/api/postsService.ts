import instance from '@/lib/axios-new';
import { API_URL, CacheControl } from '@/lib/request';
import { PostContent } from '@/models/PostContent';
import axios from 'axios';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export interface UpdatePostProps {
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
    const res = await axios.get(`/posts/${postId}`, {
      withCredentials: true,
    });

    return res.data?.data;
  },

  async getCategories() {
    const res = await axios.get('/posts/categories');

    return res.data.data;
  },
};
