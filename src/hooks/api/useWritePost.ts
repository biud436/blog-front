import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import { useMutation } from '@tanstack/react-query';

export function useWritePost() {
  const writePost = useMutation({
    mutationKey: ['writePost'],
    mutationFn: postsService.writePost,
    onSuccess: () => {
      //
    },
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    writePost,
  };
}
