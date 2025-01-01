import { postsService } from '@/api/postsService';
import { skipToken, useQuery } from '@tanstack/react-query';

export function useSecretPost(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/posts/:id', id],
    queryFn: id
      ? async () => {
          return await postsService.getPost(id);
        }
      : skipToken,
  });

  return {
    data,
    isLoading,
    error,
  };
}
