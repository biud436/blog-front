export type BaseDataListDto = {
  currentPage: number;
  totalCount: number;
  maxPage: number;
  currentBlock: number;
  maxBlock: number;
};

export interface Paginable {
  setPageNumber(pageNumber: number): void;
  getPageNumber(): number;
  setPagination(pagination: BaseDataListDto): void;
  getPagination(): BaseDataListDto;
}
