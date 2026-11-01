'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsService } from '@/api/postsService';
import { PostEntity } from '@/models/PostEntity';
import { PostGrid } from '@/components/blog/home/PostGrid';
import { splitCategoryName } from '@/components/blog/utils';

const MAX_ITEMS = 4;

/** 홈 목록(usePosts)과 같은 키를 써서 이미 받아 둔 목록을 재사용합니다. */
const usePostList = (categoryId: number | null, enabled = true) =>
  useQuery({
    queryKey: ['/posts/posts', 1, categoryId, null],
    queryFn: () => postsService.getPosts({ pageNumber: 1, categoryId }),
    enabled,
    staleTime: 60_000,
  });

const pick = (posts: PostEntity[] | undefined, currentId: number) =>
  (posts ?? [])
    .filter(post => post.id !== currentId && !post.isPrivate)
    .slice(0, MAX_ITEMS);

/**
 * 글 하단의 "다른 글" 목록.
 * 같은 카테고리 글을 먼저 보여주고, 4개가 안 되면 최근 글로 채웁니다.
 */
export function RelatedPosts({
  postId,
  categoryId,
  categoryName,
}: {
  postId: number;
  categoryId?: number;
  categoryName?: string;
}) {
  const sameCategory = usePostList(categoryId ?? null, categoryId != null);
  const related = pick(sameCategory.data?.entities, postId);

  const needLatest =
    categoryId == null ||
    (sameCategory.isSuccess && related.length < MAX_ITEMS);
  const latest = usePostList(null, needLatest);

  if (categoryId != null && !sameCategory.isSuccess) return null;
  if (needLatest && !latest.isSuccess) return null;

  const relatedIds = new Set(related.map(post => post.id));
  const fill = needLatest
    ? pick(latest.data?.entities, postId).filter(
        post => !relatedIds.has(post.id),
      )
    : [];
  const posts = [...related, ...fill].slice(0, MAX_ITEMS);
  if (posts.length === 0) return null;

  const label = categoryName ? splitCategoryName(categoryName).label : '';
  const title =
    related.length === 0
      ? '최근 글'
      : related.length >= posts.length && label
      ? `${label}의 다른 글`
      : '더 읽어보기';

  return (
    <section className="b-related" aria-labelledby="b-related-title">
      <div className="b-container">
        <h2 className="b-section-title" id="b-related-title">
          {title}
        </h2>
        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
