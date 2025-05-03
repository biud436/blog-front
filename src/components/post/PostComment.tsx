/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { DiscussionEmbed } from 'disqus-react';
import React, { useEffect, useRef } from 'react';

interface DisqusProps {
  identifier: string;
  url: string;
  title: string;
}

const DisqusThread = ({ identifier, url, title }: DisqusProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    /**
     * Disqus iframe이 2개 이상 생성되는 경우가 있다.
     * 이때, disqus 리셋을 시도한다.
     *
     * disqus는 뒤늦게 생성되므로, setTimeout을 사용한다.
     */
    setTimeout(() => {
      const thread = document.getElementById('disqus_thread');
      if (!thread) return;

      const iframes = thread.getElementsByTagName('iframe');
      const dsqIframes = Array.from(iframes).filter(iframe =>
        iframe.name?.startsWith('dsq-'),
      );

      if (dsqIframes.length > 1 && (window as any).DISQUS) {
        console.warn('Disqus iframe duplicated. Resetting...');
        (window as any).DISQUS.reset();
      }
    }, 300);
  }, [identifier, url, title]);

  return (
    <div id="disqus_thread" ref={elementRef}>
      <DiscussionEmbed
        key={'_disqus_thread' + identifier}
        shortname="biud436s-log"
        config={{
          url: url,
          identifier: identifier,
          title: title,
          language: 'ko',
        }}
      />
    </div>
  );
};

export default DisqusThread;
