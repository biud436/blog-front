'use client';

import { postsService } from '@/api/postsService';
import { handleAxiosError } from '@/lib/errorInterceptor';
import { BlogServerResponse } from '@/models/BlogServerResponse';
import { useModalStore } from '@/store/modal/ModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type PostsListData = BlogServerResponse['data'];

/**
 * 게시글 삭제 훅
 */
export function useDeletePost() {
  const modalStore = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: postsService.deletePost,
    onSuccess: async (_, postId) => {
      // 캐시된 모든 목록(페이지/카테고리)에서 삭제된 글을 즉시 제거하여
      // 목록으로 돌아갔을 때 삭제된 글이 잠깐이라도 보이지 않도록 합니다.
      queryClient.setQueriesData<PostsListData>(
        { queryKey: ['/posts/posts'] },
        old =>
          old && {
            ...old,
            entities: old.entities.filter(post => post.id !== postId),
          },
      );

      // 삭제로 인해 페이지네이션이 바뀔 수 있으므로 목록 캐시를 무효화합니다.
      // staleTime(1분)과 관계없이 목록 화면이 마운트될 때 서버에서 다시 가져옵니다.
      await queryClient.invalidateQueries({ queryKey: ['/posts/posts'] });

      // 삭제된 글의 상세 캐시를 제거합니다.
      queryClient.removeQueries({ queryKey: ['/posts/:id', postId] });

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
