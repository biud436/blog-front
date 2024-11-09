import { z } from 'zod';
import { PostImage } from './PostImage';

export const PostDtoSchema = z.object({
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
  images: z.array(z.custom<PostImage>()),
  isPrivate: z.boolean().optional(),
});

export type PostDto = z.infer<typeof PostDtoSchema>;
