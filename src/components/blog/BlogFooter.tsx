'use client';

import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SearchIcon from '@mui/icons-material/Search';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { usePaletteStore } from '@/store/palette';

export function BlogFooter() {
  const openPalette = usePaletteStore(state => state.open);
  const year = new Date().getFullYear();
  const owner = MetaCommonConfig.site_name.replace(/의 블로그$/, '');

  return (
    <footer className="b-footer">
      <div className="b-container">
        <div className="b-footer__inner">
          <div>
            <div className="b-footer__brand">{MetaCommonConfig.site_name}</div>
            <p className="b-footer__desc">{MetaCommonConfig.tagline}</p>
          </div>
          <div className="b-footer__links">
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
            <button
              type="button"
              className="b-icon-btn"
              aria-label="검색"
              onClick={openPalette}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className="b-footer__copy">
          © 2023–{year} {owner}
        </div>
      </div>
    </footer>
  );
}
