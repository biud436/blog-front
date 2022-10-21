import { makeAutoObservable } from 'mobx';
import { BaseDataListDto, Paginable } from '../types/list';
import { Searchable } from '../types/searchable';
import { PostDto, PostsSearchType } from './posts.dto';

export class PostsStore implements Searchable<PostsSearchType>, Paginable {
    list: BaseDataListDto = {
        currentPage: 1,
        totalCount: 0,
        maxPage: 0,
        currentBlock: 1,
        maxBlock: 0,
    };

    entities: PostDto[] | undefined;
    search: {
        type: PostsSearchType | undefined;
        query: string | undefined;
    } = {
        type: 'content',
        query: '',
    };

    categories: Record<string, string> | undefined = {
        content: '내용',
        title: '제목',
    };
    modalEntity: PostDto | undefined;

    isOpenModal: boolean = false;
    defaultCategory: string = 'content';

    /**
     * 현재 카테고리 ID
     */
    currentCategoryId: number | null = 1;

    private _isSearchMode: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setPageNumber(pageNumber: number) {
        this.list.currentPage = pageNumber;
    }

    getPageNumber() {
        return this.list.currentPage;
    }

    setPagination(pagination: BaseDataListDto) {
        this.list = pagination;
    }

    getPagination() {
        return this.list;
    }

    setEntities(entities: PostDto[]) {
        this.entities = entities;
    }

    getEntities() {
        return this.entities;
    }

    setSearchType(searchType: PostsSearchType): void {
        this.search.type = searchType;
    }

    setSearchQuery(searchQuery: string): void {
        this.search.query = searchQuery;
    }

    getSearchType() {
        return this.search.type;
    }

    getSearchQuery() {
        return this.search.query;
    }

    clearSearch(): void {
        this.search.type = 'content';
        this.search.query = '';
    }

    setSearchMode(isSearchMode: boolean): void {
        this._isSearchMode = isSearchMode;
    }

    isSearchMode(): boolean {
        return this._isSearchMode;
    }

    setOpenModal(isOpenModal: boolean) {
        this.isOpenModal = isOpenModal;

        if (!isOpenModal) {
            this.modalEntity = undefined;
        }
    }

    setModalEntity(modalEntity: PostDto) {
        this.modalEntity = modalEntity;
    }

    getModalEntity() {
        return this.modalEntity;
    }

    getSearchCategories(): Record<string, string> | undefined {
        return this.categories;
    }

    getDefaultCategory(): string {
        return this.defaultCategory;
    }

    setCurrentCategoryId(categoryId: number | null) {
        this.currentCategoryId = categoryId;
    }

    getCurrentCategoryId() {
        return this.currentCategoryId;
    }
}

export const postsStore = new PostsStore();
