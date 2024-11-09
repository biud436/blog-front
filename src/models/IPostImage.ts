import { z } from 'zod';

export const IPostImageSchema = z.object({
  id: z.number(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.number(),
  postId: z.number(),
});

export type IPostImage = z.infer<typeof IPostImageSchema>;
