'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { PostEntity } from '@/models/PostEntity';
import { plainText } from '../utils';
import { Thumbnail } from './Thumbnail';
import { PostMeta } from './PostMeta';

/** 비공개 글은 비밀글 경로로 이동합니다. */
export function postHref(post: PostEntity): string {
  return post.isPrivate ? `/secret/${post.id}` : `/posts/${post.id}`;
}

export function excerptOf(post: PostEntity): string {
  if (post.isPrivate) return '비공개 글입니다.';
  return plainText(post.previewContent || post.content);
}

function PostCard({ post, index }: { post: PostEntity; index: number }) {
  const category = post.category?.name ?? '';
  const excerpt = excerptOf(post);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={postHref(post)} className="b-card">
        <Thumbnail
          image={post.images?.[0]?.path}
          label={category || 'Post'}
          isPrivate={post.isPrivate}
          eager={index < 4}
        />
        <div className="b-card__body">
          <PostMeta category={category} date={post.uploadDate} />
          <h3 className="b-card__title">{post.title}</h3>
          {excerpt && <p className="b-card__excerpt">{excerpt}</p>}
        </div>
      </Link>
    </motion.div>
  );
}

export function PostGrid({ posts }: { posts: PostEntity[] }) {
  return (
    <div className="b-grid">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}

export function PostGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="b-grid" aria-busy="true" aria-label="글 목록을 불러오는 중">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{ display: 'grid', gap: 14 }}>
          <div
            className="b-skeleton"
            style={{ aspectRatio: '16 / 10', borderRadius: 14 }}
          />
          <div className="b-skeleton" style={{ height: 12, width: '40%' }} />
          <div className="b-skeleton" style={{ height: 20, width: '90%' }} />
          <div className="b-skeleton" style={{ height: 14, width: '70%' }} />
        </div>
      ))}
    </div>
  );
}
