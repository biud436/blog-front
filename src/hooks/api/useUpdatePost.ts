import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import usePostService from '@/store/post/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 블로그 포스트를 수정하는 훅
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const postId = usePostService(state => state.getId());

  const updatePost = useMutation({
    mutationKey: ['updatePost', postId],
    mutationFn: postsService.updatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/posts', postId],
      });
    },
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    /**
     * 포스트를 수정합니다.
     */
    updatePost,
  };
}
