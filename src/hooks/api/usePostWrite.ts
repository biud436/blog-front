/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { PostContent } from '@/models/PostContent';
import usePostService from '@/store/post/PostService';
import { useUpdatePost } from '@/hooks/api/useUpdatePost';
import { useWritePost } from '@/hooks/api/useWritePost';
import { URL_MAP } from '@/common/URL';
import { useRootStore } from '@/store';
import { UseFormWatch } from 'react-hook-form';
import { MyBlogEditor } from '@/components/post/editor/types/PostEditorType';
import { EditMode } from '@/components/pages/PostEditorContainer';

/**
 * 글 작성 및 수정 훅
 *
 * @param mode
 * @param editorRef
 * @param watch
 * @param currentCategoryId
 * @returns
 */
export function usePostWrite(
  mode: EditMode,
  editorRef: React.RefObject<MyBlogEditor>,
  watch: UseFormWatch<{
    title: string;
  }>,
  currentCategoryId: number,
) {
  const router = useRouter();
  const postService = usePostService();

  /**
   * useSWR 호환용 mutate 함수
   */
  const { mutate } = useSWRConfig();

  const { updatePost } = useUpdatePost();
  const { writePost } = useWritePost();
  const rootStore = useRootStore();

  const handleWrite = useCallback(async () => {
    const title = watch('title');

    if (!title) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    const content = editorRef.current?.getInstance().getMarkdown();

    if (!content) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    const payload = {
      title,
      content: DOMPurify.sanitize(content),
      categoryId: currentCategoryId,
      isPrivate: rootStore.isPrivate,
    } as PostContent;

    try {
      if (mode === 'edit') {
        // 데이터
        const data = {
          postId: postService.getId(),
          payload,
        };
        // 옵션
        const extraOptions = {
          onSuccess: async () => {
            mutate(['/posts', postService.getId()]);
          },
        };
        await updatePost.mutateAsync(data, extraOptions);
      } else {
        const extraOptions = {
          onSuccess: () => {
            postService.refresh();
          },
        };
        await writePost.mutateAsync(payload, extraOptions);
      }

      router.push(URL_MAP.MAIN);
    } catch (e: any) {
      toast.error(e.message);
    }
  }, [editorRef, watch, currentCategoryId, mode, rootStore.isPrivate]);

  return {
    /**
     * 글 작성 및 수정 이벤트
     */
    handleWrite,
  };
}
