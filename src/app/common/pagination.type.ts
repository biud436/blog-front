export type PaginationResult = {
  totalCount: number;
  currentPage: number;
  maxPage: number;
  currentBlock: number;
  maxBlock: number;
};

export type Paginatable<T> = {
  pagination: PaginationResult;
  entities: T[];
};
