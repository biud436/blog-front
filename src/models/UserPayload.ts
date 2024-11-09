import { z } from 'zod';

export const UserPayload = z.object({
  id: z.number(),
  username: z.string(),
  scope: z.array(z.string()),
});

export type UserPayload = z.infer<typeof UserPayload>;
