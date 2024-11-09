import { z } from 'zod';

export const PaginationScheme = z.object({
  currentPage: z.number(),
  totalCount: z.number(),
  maxPage: z.number(),
  currentBlock: z.number(),
  maxBlock: z.number(),
});

export type Pagination = z.infer<typeof PaginationScheme>;
