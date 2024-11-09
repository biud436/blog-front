import { z } from 'zod';

export const CategoryDepthVOSchema = z.lazy(() =>
  z.object({
    left: z.number(),
    right: z.number(),
    name: z.string(),
    depth: z.number(),
    id: z.number(),
    open: z.boolean(),
    children: z.array(CategoryDepthVOSchema),
  }),
);

export type CategoryDepthVO = z.infer<typeof CategoryDepthVOSchema>;
