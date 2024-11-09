import { create } from 'zustand';
import { CategoryItemId } from '@/services/CategoryService';
import { BaseDataListDto } from '../../models/BaseDataListDto';
import { PostDto } from '../../models/PostDto';
import { PostsSearchType } from '../../models/PostsSearchType';
import { Paginable } from '../../models/Paginable';
import { Searchable } from '../../models/Searchable';

interface PostsState extends Searchable<PostsSearchType>, Paginable {
  // State
  list: BaseDataListDto;
  entities: PostDto[] | undefined;
  search: {
    type: PostsSearchType | undefined;
    query: string | undefined;
  };
  categories: Record<string, string> | undefined;
  modalEntity: PostDto | undefined;
  isOpenModal: boolean;
  defaultCategory: string;
  pageSize: number;
  currentCategoryId: CategoryItemId;
  _isSearchMode: boolean;

  // Actions
  setPageNumber: (pageNumber: number) => void;
  getPageNumber: () => number;
  setPageSize: (pageSize: number) => void;
  getPageSize: () => number;
  setPagination: (pagination: BaseDataListDto) => void;
  getPagination: () => BaseDataListDto;
  setEntities: (entities: PostDto[]) => void;
  getEntities: () => PostDto[] | undefined;
  setSearchType: (searchType: PostsSearchType) => void;
  setSearchQuery: (searchQuery: string) => void;
  getSearchType: () => PostsSearchType | undefined;
  getSearchQuery: () => string | undefined;
  clearSearch: () => void;
  setSearchMode: (isSearchMode: boolean) => void;
  isSearchMode: () => boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  setModalEntity: (modalEntity: PostDto) => void;
  getModalEntity: () => PostDto | undefined;
  getSearchCategories: () => Record<string, string> | undefined;
  getDefaultCategory: () => string;
  setCurrentCategoryId: (categoryId: CategoryItemId) => void;
  getCurrentCategoryId: () => CategoryItemId;
}

const usePostsStore = create<PostsState>((set, get) => ({
  // Initial State
  list: {
    currentPage: 1,
    totalCount: 0,
    maxPage: 0,
    currentBlock: 1,
    maxBlock: 0,
  },
  entities: undefined,
  search: {
    type: 'content',
    query: '',
  },
  categories: {
    content: '내용',
    title: '제목',
  },
  modalEntity: undefined,
  isOpenModal: false,
  defaultCategory: 'content',
  pageSize: 10,
  currentCategoryId: 1,
  _isSearchMode: false,

  // Actions
  setPageNumber: pageNumber =>
    set(state => ({
      list: { ...state.list, currentPage: pageNumber },
    })),

  getPageNumber: () => get().list.currentPage,

  setPageSize: pageSize => set({ pageSize }),

  getPageSize: () => get().pageSize,

  setPagination: pagination => set({ list: pagination }),

  getPagination: () => get().list,

  setEntities: entities => set({ entities }),

  getEntities: () => get().entities,

  setSearchType: searchType =>
    set(state => ({
      search: { ...state.search, type: searchType },
    })),

  setSearchQuery: searchQuery =>
    set(state => ({
      search: { ...state.search, query: searchQuery },
    })),

  getSearchType: () => get().search.type,

  getSearchQuery: () => get().search.query,

  clearSearch: () =>
    set({
      search: {
        type: 'content',
        query: '',
      },
    }),

  setSearchMode: isSearchMode => set({ _isSearchMode: isSearchMode }),

  isSearchMode: () => get()._isSearchMode,

  setOpenModal: isOpenModal =>
    set(state => ({
      isOpenModal,
      modalEntity: !isOpenModal ? undefined : state.modalEntity,
    })),

  setModalEntity: modalEntity => set({ modalEntity }),

  getModalEntity: () => get().modalEntity,

  getSearchCategories: () => get().categories,

  getDefaultCategory: () => get().defaultCategory,

  setCurrentCategoryId: categoryId => set({ currentCategoryId: categoryId }),

  getCurrentCategoryId: () => get().currentCategoryId,
}));

export default usePostsStore;
