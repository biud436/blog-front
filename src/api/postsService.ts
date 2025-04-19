import instance from '@/lib/axios-new';
import { API_URL, CacheControl } from '@/lib/request';
import { BlogServerResponse } from '@/models/BlogServerResponse';
import { Post } from '@/models/Post';
import { PostContent } from '@/models/PostContent';
import { PostEntity } from '@/models/PostEntity';
import axios from 'axios';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export interface UpdatePostProps {
  postId: number;
  payload: PostContent;
}
export interface PostsSearchType {
  pageNumber: number;
  searchProperty: string | undefined;
  searchQuery: string | undefined;
}
export interface GetPostsDto {
  pageNumber: number;
  categoryId?: number | undefined | null;
  // pageSize?: number;
  // searchProperty?: 'title' | 'content';
  // searchQuery?: string;
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

  async getPost(postId: number): Promise<Post> {
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
  }: PostsSearchType): Promise<BlogServerResponse<PostEntity>['data']> {
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
  }: GetPostsDto): Promise<BlogServerResponse<PostEntity>['data']> {
    const res = await axios.get(
      `/posts?page=${pageNumber}&categoryId=${categoryId}`,
    );

    return res.data.data;
  },
};
