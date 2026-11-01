/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { DiscussionEmbed } from 'disqus-react';
import React, { useEffect, useRef, useState } from 'react';

interface DisqusProps {
  identifier: string;
  url: string;
  title: string;
}

/** 현재 블로그 테마(라이트/다크). Disqus는 로드 시점의 글자색으로 테마를 정하므로 바뀌면 다시 불러옵니다. */
function useBlogThemeAttribute() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.getAttribute('data-blog-theme') ?? 'light');
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-blog-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

const DisqusThread = ({ identifier, url, title }: DisqusProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const theme = useBlogThemeAttribute();

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

  // 바깥 div에 id="disqus_thread"를 주면 안 됩니다. DiscussionEmbed가 같은 id의 div를 직접 만들고,
  // 언마운트 시 getElementById('disqus_thread')의 자식을 모두 지우기 때문에
  // id가 겹치면 React가 관리하는 노드까지 지워져 removeChild 오류가 납니다.
  return (
    <div className="b-comments" ref={elementRef}>
      {theme !== null && (
        <DiscussionEmbed
          key={`_disqus_thread${identifier}-${theme}`}
          shortname="biud436s-log"
          config={{
            url: url,
            identifier: identifier,
            title: title,
            language: 'ko',
          }}
        />
      )}
    </div>
  );
};

export default DisqusThread;
