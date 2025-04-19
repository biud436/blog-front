import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import usePostService from '@/store/post/PostService';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

/**
 * 블로그 포스트를 가져오는 훅
 */
export function useGetPost() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams?.get('id') as string, 10);
  const postService = usePostService();

  const getPost = useMutation({
    mutationKey: ['/posts', id],
    mutationFn: postsService.getPost,
    onSuccess: res => {
      postService.setData(res);
    },
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    /**
     * 블로그 포스트를 가져옵니다.
     */
    getPost,
  };
}
