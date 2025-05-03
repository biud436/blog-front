'use client';

import React from 'react';
import { CommentCount } from 'disqus-react';
import { Post } from '@/models/Post';

interface PostCommentCountProps {
  post: Post;
}

const PostCommentCount = ({ post }: PostCommentCountProps) => {
  if (!post) {
    return null;
  }

  return (
    <CommentCount
      shortname="biud436s-log"
      config={{
        url: `https://blog.biud436.com/posts/${post?.id ?? 0}`,
        identifier: post.id?.toString(),
        title: post?.title ?? '',
      }}
    >
      <span style={{ color: 'gray' }}>댓글 수</span>
    </CommentCount>
  );
};

export default PostCommentCount;
