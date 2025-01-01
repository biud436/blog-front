import uploadS3 from '@/api/uploadS3';
import { EditMode } from '@/components/pages/PostEditorContainer';
import { ImageCompressionUtils } from '@/lib/ImageCompressionService';
import usePostService from '@/store/post/PostService';
import { toast } from 'react-toastify';

export function useAddImageBlob(mode: EditMode) {
  const postService = usePostService();

  /**
   * 이미지 업로드 시, 훅을 통해 서버에 업로드 요청을 보냅니다.
   *
   * @param blob
   * @param callback
   */
  const addImageBlobHook = (
    blob: File,
    callback: (location: string, originalName: string) => void,
  ) => {
    ImageCompressionUtils.compress(blob, ImageCompressionUtils.options)
      .then(compressedFile => {
        const formData = new FormData();
        formData.append('files', compressedFile);
        formData.append(
          'postId',
          mode === 'edit' ? postService.getId() + '' : '0',
        );

        uploadS3(formData)
          .then(res => {
            const { data } = res.data;

            callback(data.location, data.originalName);
          })
          .catch(() => {
            toast.error('이미지 업로드에 실패하였습니다.');
          });
      })
      .catch(() => {
        toast.error('이미지 압축에 실패했습니다.');
      });

    return false;
  };

  return {
    /**
     * 이미지 업로드 시, 훅을 통해 서버에 업로드 요청을 보냅니다.
     *
     * @param blob
     * @param callback
     */
    addImageBlobHook,
  };
}
