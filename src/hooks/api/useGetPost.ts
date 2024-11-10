import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export function useGetPost() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams?.get('id') as string, 10);

  const getPost = useMutation({
    mutationKey: ['/posts', id],
    mutationFn: postsService.getPost,
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    getPost,
  };
}
