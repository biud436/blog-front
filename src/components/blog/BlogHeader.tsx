'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import EditIcon from '@mui/icons-material/EditOutlined';
import MenuIcon from '@mui/icons-material/MenuRounded';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { URL_MAP } from '@/common/URL';
import { useMenuStore } from '@/store/menu';
import { usePaletteStore } from '@/store/palette';
import { ThemeToggle } from './ThemeToggle';

/** 단축키 표기: 맥이면 ⌘, 아니면 Ctrl (하이드레이션 이후에 결정) */
export function useShortcutLabel() {
  const [label, setLabel] = useState('Ctrl');
  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)) {
      setLabel('⌘');
    }
  }, []);
  return label;
}

export function SiteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href={URL_MAP.MAIN} className="b-logo" onClick={onClick}>
      <span className="b-logo__mark" aria-hidden="true">
        {MetaCommonConfig.site_name.charAt(0)}
      </span>
      <span className="b-logo__text">
        {MetaCommonConfig.site_name}
        <span className="b-logo__dot" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function BlogHeader({
  showThemeToggle = true,
}: {
  showThemeToggle?: boolean;
}) {
  const router = useRouter();
  const openMenu = useMenuStore(state => state.open);
  const openPalette = usePaletteStore(state => state.open);
  const shortcut = useShortcutLabel();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goWrite = () => router.push(URL_MAP.POST_EDIT);

  return (
    <header className={`b-header ${scrolled ? 'b-header--scrolled' : ''}`}>
      <div className="b-container b-header__inner">
        <SiteLogo />

        <button
          type="button"
          className="b-search-btn b-hide-mobile"
          onClick={openPalette}
        >
          <SearchIcon fontSize="small" />
          <span>검색</span>
          <kbd className="b-kbd">{shortcut}</kbd>
          <kbd className="b-kbd">K</kbd>
        </button>
        <button
          type="button"
          className="b-icon-btn b-show-mobile"
          aria-label="검색"
          onClick={openPalette}
        >
          <SearchIcon />
        </button>

        <a
          className="b-icon-btn b-hide-mobile"
          href={MetaCommonConfig.github_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          className="b-icon-btn b-hide-mobile"
          href="/rss"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS"
          title="RSS"
        >
          <RssFeedIcon />
        </a>
        {showThemeToggle && <ThemeToggle />}

        <span className="b-header__divider b-hide-mobile" aria-hidden="true" />
        <button
          type="button"
          className="b-btn b-btn--primary b-btn--sm b-hide-mobile"
          onClick={goWrite}
        >
          <EditIcon /> 글쓰기
        </button>
        <button
          type="button"
          className="b-icon-btn b-show-mobile"
          aria-label="글쓰기"
          onClick={goWrite}
        >
          <EditIcon />
        </button>
        <button
          type="button"
          className="b-icon-btn"
          aria-label="메뉴 열기"
          onClick={openMenu}
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
