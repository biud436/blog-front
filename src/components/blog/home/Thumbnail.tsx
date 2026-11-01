'use client';

import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/LockOutlined';
import { hueStyle } from '../utils';

/** 썸네일. 이미지가 없거나 불러오지 못하면 카테고리 색으로 만든 커버를 보여줍니다. */
export function Thumbnail({
  image,
  label,
  isPrivate,
  eager,
}: {
  image?: string;
  label: string;
  isPrivate?: boolean;
  eager?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!image && failedSrc !== image;

  return (
    <div className="b-media">
      {showImage ? (
        // 외부 업로드 이미지이므로 next/image 대신 img를 사용합니다.
        <img
          src={image}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailedSrc(image)}
        />
      ) : (
        <div className="b-gen" style={hueStyle(label)}>
          <span className="b-gen__text">{label}</span>
        </div>
      )}
      {isPrivate && (
        <span className="b-media__lock">
          <LockIcon /> 비공개
        </span>
      )}
    </div>
  );
}
