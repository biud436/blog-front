import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import { useMutation } from '@tanstack/react-query';

/**
 * 새로운 포스트를 작성하는 훅훅
 */
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
    /**
     * 새 포스트를 작성합니다.
     */
    writePost,
  };
}
