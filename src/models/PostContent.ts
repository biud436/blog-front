import { z } from 'zod';

export const PostContentSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number(),
});

export type PostContent = z.infer<typeof PostContentSchema>;
