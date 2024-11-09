import { z } from 'zod';
import { IPostImageSchema } from './IPostImage';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  uploadDate: z.string(),
  user: z.object({
    username: z.string(),
    profile: z.object({
      nickname: z.string(),
    }),
  }),
  category: z.object({
    name: z.string(),
  }),
  viewCount: z.object({
    count: z.number(),
  }),
  images: z.array(IPostImageSchema),
  thumbnail: z.string().optional(),
  previewContent: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;
