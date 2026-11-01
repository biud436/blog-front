import { useEffect, useState } from 'react';

export type BlogTheme = 'light' | 'dark';

/**
 * <html data-blog-theme>의 현재 값. 토글·OS 설정 변경 등 어디서 바뀌어도 따라갑니다.
 * 마운트 전(서버 렌더링 포함)에는 null입니다.
 */
export function useBlogThemeAttribute(): BlogTheme | null {
  const [theme, setTheme] = useState<BlogTheme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(
        root.getAttribute('data-blog-theme') === 'dark' ? 'dark' : 'light',
      );
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
