'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { PostEntity } from '@/models/PostEntity';
import { FeaturedPost } from './FeaturedPost';
import { Thumbnail } from './Thumbnail';
import { PostMeta } from './PostMeta';
import { postHref } from './PostGrid';

const ease = [0.22, 1, 0.36, 1] as const;

function CompactPost({ post, index }: { post: PostEntity; index: number }) {
  const category = post.category?.name ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18 + index * 0.06, ease }}
    >
      <Link href={postHref(post)} className="b-compact">
        <div className="b-compact__body">
          <PostMeta category={category} date={post.uploadDate} />
          <h3 className="b-compact__title">{post.title}</h3>
        </div>
        <Thumbnail
          image={post.images?.[0]?.path}
          label={category || 'Post'}
          isPrivate={post.isPrivate}
          eager
        />
      </Link>
    </motion.div>
  );
}

/** 첫 페이지 상단: 가장 최신 글을 크게, 그다음 글들을 옆에 목록으로 보여줍니다. */
export function TopStories({ posts }: { posts: PostEntity[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <div className={`b-top ${rest.length === 0 ? 'b-top--single' : ''}`}>
      <FeaturedPost post={lead} />
      {rest.length > 0 && (
        <div className="b-top__side">
          <div className="b-top__label">최근 글</div>
          {rest.map((post, index) => (
            <CompactPost key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
