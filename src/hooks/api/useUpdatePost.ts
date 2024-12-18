import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import usePostService from '@/store/post/PostService';
import { useMutation } from '@tanstack/react-query';

export function useUpdatePost() {
  const postId = usePostService(state => state.getId());

  const updatePost = useMutation({
    mutationKey: ['updatePost', postId],
    mutationFn: postsService.updatePost,
    onSuccess: () => {
      //
    },
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    updatePost,
  };
}
