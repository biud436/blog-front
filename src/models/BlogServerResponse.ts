import { Pagination } from './Pagination';
import { PostEntity } from './PostEntity';

export interface BlogServerResponse<T = PostEntity> {
  message: string;
  statusCode: number;
  result: 'success' | 'failure';
  data: {
    pagination: Pagination;
    entities: T[];
  };
}
