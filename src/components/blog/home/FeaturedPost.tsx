'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { PostEntity } from '@/models/PostEntity';
import { Thumbnail } from './Thumbnail';
import { PostMeta } from './PostMeta';
import { excerptOf, postHref } from './PostGrid';

/** 첫 페이지의 가장 최신 글을 크게 보여줍니다. */
export function FeaturedPost({ post }: { post: PostEntity }) {
  const category = post.category?.name ?? '';
  const excerpt = excerptOf(post);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={postHref(post)} className="b-feature">
        <Thumbnail
          image={post.images?.[0]?.path}
          label={category || 'Post'}
          isPrivate={post.isPrivate}
          eager
        />
        <div className="b-feature__body">
          <PostMeta category={category} date={post.uploadDate} />
          <h2 className="b-feature__title">{post.title}</h2>
          {excerpt && <p className="b-feature__excerpt">{excerpt}</p>}
          {post.user?.profile?.nickname && (
            <div className="b-author" style={{ marginTop: 6 }}>
              <span
                className="b-avatar"
                aria-hidden="true"
                style={{ width: 34, height: 34, fontSize: '0.86rem' }}
              >
                {post.user.profile.nickname.charAt(0)}
              </span>
              <b style={{ fontSize: '0.9rem' }}>{post.user.profile.nickname}</b>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
