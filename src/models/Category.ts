import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string(),
  groupId: z.number(),
});

export type Category = z.infer<typeof CategorySchema>;
