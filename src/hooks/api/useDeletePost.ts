import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import { useModalStore } from '@/store/modal/ModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

/**
 * 게시글 삭제 훅
 */
export function useDeletePost() {
  const modalStore = useModalStore();
  const router = useRouter();

  const deletePost = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: postsService.deletePost,
    onSuccess: async () => {
      modalStore.openModal('alert', {
        title: '삭제 완료',
        message: '게시글이 삭제되었습니다.',
      });
      await router.push('/');
    },
    onError: error => {
      handleAxiosError(error);
    },
  });

  return {
    deletePost,
  };
}
