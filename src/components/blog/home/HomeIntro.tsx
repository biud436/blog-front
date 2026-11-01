'use client';

import React from 'react';
import { motion } from 'motion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { relativeDate } from '../utils';

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeIntro({
  totalCount,
  categoryCount,
  latestDate,
}: {
  totalCount?: number;
  categoryCount: number;
  latestDate?: string;
}) {
  return (
    <section className="b-intro b-container">
      <motion.span
        className="b-intro__eyebrow"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {MetaCommonConfig.site_name}
      </motion.span>
      <motion.h1
        className="b-intro__title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease }}
      >
        {MetaCommonConfig.tagline}
      </motion.h1>
      <motion.div
        className="b-intro__meta"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease }}
      >
        {totalCount !== undefined && (
          <span className="b-chip">
            글 <b>{totalCount.toLocaleString('ko-KR')}</b>개
          </span>
        )}
        {categoryCount > 0 && (
          <span className="b-chip">
            카테고리 <b>{categoryCount}</b>개
          </span>
        )}
        {latestDate && (
          <span className="b-chip">
            최근 업데이트 <b>{relativeDate(latestDate)}</b>
          </span>
        )}
        <a
          className="b-chip"
          href={MetaCommonConfig.github_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon /> GitHub
        </a>
        <a
          className="b-chip"
          href="/rss"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RssFeedIcon /> RSS
        </a>
      </motion.div>
    </section>
  );
}
