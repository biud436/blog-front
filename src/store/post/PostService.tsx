/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { Post } from '@/models/Post';

// State interface
interface PostServiceState {
  // State
  data: Post;
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
  isFetchTempPost: boolean;
  tempPostContent: TempPostContent;
  fetchCount: number;

  // Actions
  isSamePost: (postId: number) => boolean;
  isLoadingState: () => boolean;
  isErrorState: () => boolean;
  getErrorMessage: () => string;
  setData: (data: Post) => void;
  getData: () => Post;
  getNickname: () => string;
  getTitle: () => string;
  getContent: () => string;
  getCount: () => number;
  getId: () => number;
  isFetchTempPostState: () => boolean;
  fetchTempPostState: () => void;
  flushTempPostState: () => void;
  setTempPostContent: (content: TempPostContent) => void;
  getTempPostContent: () => TempPostContent;
  clearTempPostContent: () => void;
  refresh: () => void;
  getFetchCount: () => number;
  setError: (isError: boolean) => void;
  setErrorMessage: (message: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export interface TempPostContent {
  title: string;
  content: string;
}

export interface IServerResponse {
  message: string;
  statusCode: number;
  result: 'success' | 'failure';
  data: Post | Record<string, any>;
}

const usePostService = create<PostServiceState>((set, get) => ({
  // Initial state
  data: Object.create(null),
  isError: false,
  isLoading: false,
  errorMessage: '',
  isFetchTempPost: false,
  tempPostContent: {
    content: '',
    title: '',
  },
  fetchCount: 0,

  // Actions
  isSamePost: postId => get().data.id === postId,

  isLoadingState: () => get().isLoading,

  isErrorState: () => get().isError,

  getErrorMessage: () => get().errorMessage,

  setData: data => set({ data }),

  getData: () => get().data,

  getNickname: () => get().data?.user?.profile?.nickname ?? '',

  getTitle: () => get().data?.title ?? '',

  getContent: () => get().data?.content ?? '',

  getCount: () => get().data?.viewCount?.count ?? 0,

  getId: () => get().data.id,

  isFetchTempPostState: () => get().isFetchTempPost,

  fetchTempPostState: () => set({ isFetchTempPost: true }),

  flushTempPostState: () => set({ isFetchTempPost: false }),

  setTempPostContent: content => set({ tempPostContent: content }),

  getTempPostContent: () => get().tempPostContent,

  clearTempPostContent: () =>
    set({
      tempPostContent: {
        content: '',
        title: '',
      },
    }),

  refresh: () => set(state => ({ fetchCount: state.fetchCount + 1 })),

  getFetchCount: () => get().fetchCount,

  // Helper actions
  setError: isError => set({ isError }),
  setErrorMessage: message => set({ errorMessage: message }),
  setLoading: isLoading => set({ isLoading }),
}));

export default usePostService;
