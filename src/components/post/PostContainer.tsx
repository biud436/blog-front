import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { Post } from '@/models/Post';
import { ScrollProgressBar } from '@/components/common/atomic/ScrollProgressBar';
import { PostFooter } from './PostFooter';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import { PostReadingAids } from './PostToc';
import { RelatedPosts } from './RelatedPosts';
import 'react-toastify/dist/ReactToastify.css';

export type PostContainerProps = {
  /**
   * 포스트 데이터
   */
  post: Post;
  /**
   * 뒤로가기
   */
  goBack: () => void;
};

const DisqusThread = dynamic(() => import('./PostComment'), {
  ssr: false,
  loading: () => (
    <div
      className="b-skeleton"
      style={{ height: 120 }}
      aria-label="댓글을 불러오는 중"
    />
  ),
});

export function PostContainer({ post, goBack }: PostContainerProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  const nickname = post.user?.profile?.nickname;

  return (
    <article>
      <ScrollProgressBar />
      <PostHeader post={post} />

      <div className="b-post-layout">
        <motion.div
          ref={articleRef}
          className="b-post-article"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <PostContent post={post} />
        </motion.div>

        <PostReadingAids containerRef={articleRef} />
      </div>

      {nickname && (
        <section className="b-post-section">
          <div className="b-author-card">
            <span className="b-avatar" aria-hidden="true">
              {nickname.charAt(0)}
            </span>
            <div>
              <div className="b-author-card__name">{nickname}</div>
              <div className="b-author-card__desc">
                {MetaCommonConfig.tagline}
              </div>
            </div>
            <div className="b-author-card__links">
              <a
                className="b-icon-btn"
                href={MetaCommonConfig.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                className="b-icon-btn"
                href="/rss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSS"
              >
                <RssFeedIcon />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="b-post-section" aria-labelledby="b-comments-title">
        <h2 className="b-section-title" id="b-comments-title">
          댓글
        </h2>
        <DisqusThread
          identifier={post.id.toString()}
          url={`https://blog.biud436.com/posts/${post.id}`}
          title={post.title}
        />
      </section>

      <section className="b-post-section">
        <PostFooter post={post} goBack={goBack} />
      </section>

      <RelatedPosts
        postId={post.id}
        categoryId={post.categoryId ?? post.category?.id}
        categoryName={post.category?.name}
      />
    </article>
  );
}
