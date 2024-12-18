import { PaginationResult } from "./PaginationResult";

export type Paginatable<T> = {
  pagination: PaginationResult;
  entities: T[];
};
