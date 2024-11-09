import { z } from 'zod';

export const PostImageSchema = z.object({
  id: z.number(),
  mimetype: z.string(),
  originalname: z.string(),
  path: z.string(),
  postId: z.number(),
  size: z.number(),
});

export type PostImage = z.infer<typeof PostImageSchema>;
