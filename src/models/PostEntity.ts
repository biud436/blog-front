import { z } from 'zod';
import { CategorySchema } from './Category';
import { PostImageSchema } from './PostImage';
import { UserSchema } from './User';

export const PostEntitySchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  isPrivate: z.boolean(),
  title: z.string(),
  content: z.string(),
  uploadDate: z.string(),
  user: UserSchema,
  category: CategorySchema,
  images: z.array(PostImageSchema),
  previewContent: z.string(),
});

export type PostEntity = z.infer<typeof PostEntitySchema>;
