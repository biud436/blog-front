'use client';

import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { THEME_STORAGE_KEY } from './theme';

type BlogTheme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<BlogTheme>('light');

  useEffect(() => {
    setTheme(
      document.documentElement.getAttribute('data-blog-theme') === 'dark'
        ? 'dark'
        : 'light',
    );
  }, []);

  const toggle = () => {
    const next: BlogTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-blog-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 현재 세션에만 적용합니다.
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <button
      type="button"
      className="b-icon-btn"
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}
