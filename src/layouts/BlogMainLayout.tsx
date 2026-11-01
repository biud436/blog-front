'use client';

import React, { useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MotionConfig } from 'motion/react';
import { useCategoryService } from '@/hooks/services/useCategoryService';
import { useCategoryTree } from '@/hooks/api/useCategoryTree';
import useThemeStore from '@/store/theme';
import { MobileNav } from '../components/common/menu/MobileNav';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogFooter } from '@/components/blog/BlogFooter';
import { BackToTop } from '@/components/blog/BackToTop';
import { CommandPalette } from '@/components/blog/CommandPalette';
import { applyStoredTheme } from '@/components/blog/theme';

export const MainLayout = ({
  children,
  lightOnly = false,
}: {
  /** @deprecated 이전 헤더에서 쓰던 제목. 더 이상 표시하지 않습니다. */
  name?: string;
  /** 다크 모드를 지원하지 않는 화면(에디터)에서 라이트 테마로 고정합니다. */
  lightOnly?: boolean;
  children: React.ReactNode;
}) => {
  const blogTheme = useThemeStore(state => state.getBlog());
  const categoryService = useCategoryService();
  const { categories } = useCategoryTree();

  useLayoutEffect(() => {
    if (!lightOnly) return;
    document.documentElement.setAttribute('data-blog-theme', 'light');
    return () => applyStoredTheme();
  }, [lightOnly]);

  useEffect(() => {
    if (categories) {
      categoryService.setCategories(categories);
    }
  }, [categories]);

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <div className="b-root">
          <a className="b-skip" href="#main">
            본문으로 건너뛰기
          </a>
          <BlogHeader showThemeToggle={!lightOnly} />
          <MobileNav categoryList={categories ?? []} />
          <CommandPalette />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <BlogFooter />
          <BackToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
};
