import { BaseDataListDto } from '@/models/BaseDataListDto';

export interface Paginable {
    setPageNumber(pageNumber: number): void;
    getPageNumber(): number;
    setPagination(pagination: BaseDataListDto): void;
    getPagination(): BaseDataListDto;
    setPageSize(pageSize: number): void;
    getPageSize(): number;
}
