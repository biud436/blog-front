/* eslint-disable @typescript-eslint/no-empty-function */
import { create } from 'zustand';
import { Post } from '../../models/Post';

// PostStore의 상태와 액션들을 정의하는 인터페이스
interface PostState {
  // State
  data: Post;
  fetchCount: number;

  // Actions
  setPost: (post: Post) => void;
  getPost: () => Post;
  setData: (data: Post) => void;
  getData: () => Post;
  refresh: () => void;
  getFetchCount: () => number;
}

// Server Side Rendering을 위한 조건부 store 생성
const usePostStore = create<PostState>()((set, get) => ({
  // Initial State
  data: Object.create(null),
  fetchCount: 0,

  // Actions
  setPost: post => set({ data: post }),

  getPost: () => get().data,

  setData: data => set({ data }),

  getData: () => get().data,

  refresh: () => set(state => ({ fetchCount: state.fetchCount + 1 })),

  getFetchCount: () => get().fetchCount,
}));

// SSR을 위한 조건부 export
export default typeof window === 'undefined'
  ? // Server: 더미 스토어 반환
    () =>
      ({
        data: Object.create(null),
        fetchCount: 0,
        setPost: () => {},
        getPost: () => Object.create(null),
        setData: () => {},
        getData: () => Object.create(null),
        refresh: () => {},
        getFetchCount: () => 0,
      } as PostState)
  : // Client: 실제 스토어 반환
    usePostStore;
