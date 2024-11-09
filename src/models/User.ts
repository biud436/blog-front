import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  profile: z.object({
    nickname: z.string(),
    profileImage: z.string().nullable(),
  }),
  role: z.string(),
});

export type User = z.infer<typeof UserSchema>;
