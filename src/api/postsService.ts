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
export interface PostsSearchType {
  pageNumber: number;
  searchProperty: string;
  searchQuery: string;
}
export interface GetPostsDto {
  pageNumber: number;
  categoryId?: number;
  pageSize?: number;
  searchProperty?: 'title' | 'content';
  searchQuery?: string;
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
  /**
   * 포스트 목록을 조회합니다.
   * TODO: 조회와 검색이 따로 존재합니다. API 설계가 잘못된 것 같습니다.
   */
  async getPostsUsingSearch({
    pageNumber,
    searchProperty,
    searchQuery,
  }: PostsSearchType) {
    const res = await axios.get(
      `/posts/search?pageNumber=${pageNumber}&searchProperty=${searchProperty}&searchQuery=${encodeURIComponent(
        searchQuery ?? '',
      )}`,
    );

    return res.data.data;
  },
  /**
   * 포스트 목록을 조회합니다.
   * TODO: 조회와 검색이 따로 존재합니다. API 설계가 잘못된 것 같습니다.
   */
  async getPosts({
    pageNumber,
    categoryId,
    pageSize,
    searchProperty,
    searchQuery,
  }: GetPostsDto) {
    const res = await axios.get(
      `/posts?page=${pageNumber}&categoryId=${categoryId}&pageSize=${pageSize}&searchProperty=${searchProperty}&searchQuery=${searchQuery}`,
    );

    return res.data.data;
  },
};
