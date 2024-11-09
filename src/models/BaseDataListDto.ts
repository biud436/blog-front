import { z } from 'zod';

export const BaseDataListDtoSchema = z.object({
  currentPage: z.number(),
  totalCount: z.number(),
  maxPage: z.number(),
  currentBlock: z.number(),
  maxBlock: z.number(),
});

export type BaseDataListDto = z.infer<typeof BaseDataListDtoSchema>;
