'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { DateUtil, Formatter } from '@/lib/date';
import { Post } from '@/models/Post';
import { formatDate, readingMinutes } from '@/components/blog/utils';

export type PostHeaderProps = {
  post: Post;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PostHeader({ post }: PostHeaderProps) {
  const category = post.category?.name;
  const nickname = post.user?.profile?.nickname ?? '';
  const views = post.viewCount?.count;

  return (
    <motion.header
      className="b-post-head"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <nav className="b-crumbs" aria-label="경로">
        <Link href="/">홈</Link>
        {category && (
          <>
            <ChevronRightIcon aria-hidden="true" />
            <span>{category}</span>
          </>
        )}
      </nav>

      {category && <span className="b-post-cat">{category}</span>}

      <h1 className="b-post-title">{post.title}</h1>

      <div className="b-post-meta">
        <div className="b-author">
          {nickname && (
            <span className="b-avatar" aria-hidden="true">
              {nickname.charAt(0)}
            </span>
          )}
          <div>
            <b>{nickname}</b>
            {post.uploadDate && (
              <small>
                <time
                  dateTime={post.uploadDate}
                  title={DateUtil.ToDateStringBySeoul(
                    post.uploadDate,
                    Formatter.DATETIME,
                  )}
                >
                  {formatDate(post.uploadDate)}
                </time>
              </small>
            )}
          </div>
        </div>
        <div className="b-post-stats">
          <span>
            <ScheduleIcon /> {readingMinutes(post.content)}분 분량
          </span>
          {typeof views === 'number' && (
            <span>
              <VisibilityIcon /> {views.toLocaleString('ko-KR')}
            </span>
          )}
        </div>
      </div>
    </motion.header>
  );
}
