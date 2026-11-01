import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Post } from '@/models/Post';
import { useAuthorized } from '@/hooks/server/useAuthorized';
import { useDeletePost } from '@/hooks/api/useDeletePost';
import { copyCurrentUrl } from './PostToc';

interface PostFooterProps {
  post: Post;
  goBack: () => void;
}

export function PostFooter({ post, goBack }: PostFooterProps) {
  const router = useRouter();
  const { isAuthorized } = useAuthorized();
  const { deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost.mutate(post.id);
  };

  const handleEditPost = () => {
    router.push(`/edit2?mode=edit&id=${post.id}`);
  };

  return (
    <div className="b-post-footer">
      <div className="b-post-footer__group">
        <button
          type="button"
          className="b-btn b-btn--sm"
          onClick={() => goBack()}
        >
          <ArrowBackIcon /> 이전으로
        </button>
        <button
          type="button"
          className="b-btn b-btn--sm"
          onClick={copyCurrentUrl}
        >
          <LinkIcon /> 링크 복사
        </button>
      </div>

      {isAuthorized && (
        <div className="b-post-footer__group">
          <button
            type="button"
            className="b-btn b-btn--sm"
            onClick={handleEditPost}
          >
            <EditIcon /> 수정
          </button>
          <button
            type="button"
            className="b-btn b-btn--sm b-btn--danger"
            onClick={handleDeletePost}
          >
            <DeleteIcon /> 삭제
          </button>
        </div>
      )}
    </div>
  );
}
