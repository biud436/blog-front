'use client';

import React, { useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { applyStoredTheme, THEME_STORAGE_KEY } from './theme';
import { BlogTheme, useBlogThemeAttribute } from './useBlogTheme';

const readStored = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

export function ThemeToggle() {
  const theme = useBlogThemeAttribute() ?? 'light';

  // 직접 고른 적이 없으면 OS 설정이 바뀔 때 바로 따라갑니다.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const stored = readStored();
      if (stored !== 'light' && stored !== 'dark') applyStoredTheme();
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: BlogTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-blog-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 저장소를 쓸 수 없는 환경에서는 현재 세션에만 적용합니다.
    }
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
