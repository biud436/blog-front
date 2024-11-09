import { z } from 'zod';

/**
 * 작성날짜: 2024.11.09
 */
export const PostContentSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number(),
});

export type PostContent = z.infer<typeof PostContentSchema>;
