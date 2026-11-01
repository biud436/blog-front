'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Post } from '@/models/Post';
import { ImageZoom, ZoomImage } from './ImageZoom';

const ViewerSkeleton = () => (
  <div
    style={{ display: 'grid', gap: 14 }}
    aria-busy="true"
    aria-label="본문을 불러오는 중"
  >
    {[92, 100, 84, 96, 60, 100, 88].map((width, i) => (
      <div
        key={i}
        className="b-skeleton"
        style={{ height: 16, width: `${width}%` }}
      />
    ))}
  </div>
);

const Viewer = dynamic(() => import('./viewer/TuiEditorViewer'), {
  ssr: false,
  loading: ViewerSkeleton,
});

export type PostContentProps = {
  post: Post;
};

export function PostContent({ post }: PostContentProps) {
  const [zoom, setZoom] = useState<ZoomImage | null>(null);
  const closeZoom = useCallback(() => setZoom(null), []);

  // 링크가 걸리지 않은 본문 이미지를 누르면 크게 보여줍니다.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'IMG' || target.closest('a')) return;
    const img = target as HTMLImageElement;
    setZoom({ src: img.currentSrc || img.src, alt: img.alt });
  };

  return (
    <div className="b-prose" onClick={handleClick}>
      <Viewer content={post.content} />
      <ImageZoom image={zoom} onClose={closeZoom} />
    </div>
  );
}
