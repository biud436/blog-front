'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog } from '@mui/material';
import { motion } from 'motion/react';
import SearchIcon from '@mui/icons-material/Search';
import TitleIcon from '@mui/icons-material/TitleRounded';
import NotesIcon from '@mui/icons-material/NotesRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturnRounded';
import MetaCommonConfig from '@/components/common/utils/meta-config.json';
import { usePaletteStore } from '@/store/palette';
import { useCategoryStore } from '@/store/category';
import { useBlogNavigation } from '@/hooks/blog/useBlogNavigation';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { flattenCategories, hueStyle, splitCategoryName } from './utils';

type PaletteItem =
  | { kind: 'search'; field: 'title' | 'content' }
  | {
      kind: 'category';
      category: CategoryDepthVO;
      label: string;
      count?: number;
    }
  | { kind: 'home' }
  | { kind: 'github' };

const isTypingTarget = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) ||
    !!el.closest?.('.toastui-editor-defaultUI')
  );
};

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

/** ⌘K / Ctrl+K / "/" 로 여는 커맨드 팔레트: 글 검색 + 카테고리 이동 */
export function CommandPalette() {
  const isOpen = usePaletteStore(state => state.isOpen);
  const close = usePaletteStore(state => state.close);
  const categories = useCategoryStore(state => state.categories);
  const { selectCategory, search, goHome } = useBlogNavigation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        usePaletteStore.getState().toggle();
      } else if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault();
        usePaletteStore.getState().open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const trimmed = query.trim();

  const items = useMemo<PaletteItem[]>(() => {
    const lower = trimmed.toLowerCase();
    const categoryItems: PaletteItem[] = flattenCategories(categories)
      .map(category => ({
        kind: 'category' as const,
        category,
        ...splitCategoryName(category.name),
      }))
      .filter(item => !lower || item.label.toLowerCase().includes(lower));

    return [
      ...(trimmed
        ? ([
            { kind: 'search', field: 'title' },
            { kind: 'search', field: 'content' },
          ] as PaletteItem[])
        : ([{ kind: 'home' }] as PaletteItem[])),
      ...categoryItems,
      ...(trimmed ? [] : ([{ kind: 'github' }] as PaletteItem[])),
    ];
  }, [categories, trimmed]);

  useEffect(() => {
    setActive(0);
  }, [trimmed]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (item: PaletteItem | undefined) => {
    if (!item) return;
    close();
    switch (item.kind) {
      case 'search':
        search(trimmed, item.field);
        break;
      case 'category':
        selectCategory(item.category);
        break;
      case 'home':
        goHome(true);
        break;
      case 'github':
        window.open(
          MetaCommonConfig.github_url,
          '_blank',
          'noopener,noreferrer',
        );
        break;
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(i => (i + 1) % Math.max(items.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(i => (i - 1 + items.length) % Math.max(items.length, 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(items[active]);
    }
  };

  const renderItem = (item: PaletteItem, index: number) => {
    const isActive = index === active;
    let icon: React.ReactNode;
    let label: React.ReactNode;
    let end: React.ReactNode = null;

    switch (item.kind) {
      case 'search':
        icon = item.field === 'title' ? <TitleIcon /> : <NotesIcon />;
        label = (
          <span>
            {item.field === 'title' ? '제목' : '내용'}에서{' '}
            <mark>“{trimmed}”</mark> 검색
          </span>
        );
        end = isActive ? <KeyboardReturnIcon /> : null;
        break;
      case 'category':
        icon = (
          <span className="b-palette__swatch" style={hueStyle(item.label)} />
        );
        label = (
          <span
            style={{ paddingLeft: Math.max(0, item.category.depth - 1) * 14 }}
          >
            <Highlight text={item.label} query={trimmed} />
          </span>
        );
        end = item.count !== undefined ? `${item.count}개` : null;
        break;
      case 'home':
        icon = <HomeIcon />;
        label = '최신 글 보기';
        break;
      case 'github':
        icon = <GitHubIcon />;
        label = 'GitHub 열기';
        end = '↗';
        break;
    }

    return (
      <button
        key={
          item.kind === 'category'
            ? `c-${item.category.id}`
            : `${item.kind}-${index}`
        }
        type="button"
        role="option"
        aria-selected={isActive}
        data-index={index}
        className={`b-palette__item ${
          isActive ? 'b-palette__item--active' : ''
        }`}
        onMouseMove={() => setActive(index)}
        onClick={() => run(item)}
      >
        {isActive && (
          <motion.span
            layoutId="b-palette-hl"
            className="b-palette__hl"
            transition={{ type: 'spring', stiffness: 600, damping: 45 }}
          />
        )}
        {icon}
        {label}
        {end && <span className="b-palette__end">{end}</span>}
      </button>
    );
  };

  const firstCategoryIndex = items.findIndex(item => item.kind === 'category');

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      maxWidth={false}
      aria-label="검색 및 이동"
      sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
      PaperProps={{
        elevation: 0,
        className: 'b-palette b-portal',
        sx: {
          m: 0,
          mt: { xs: '10vh', md: '14vh' },
          maxWidth: 'none',
          borderRadius: '16px',
          backgroundColor: 'var(--b-surface)',
          border: '1px solid var(--b-border)',
          boxShadow: 'var(--b-shadow-lg)',
          overflow: 'hidden',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(10, 10, 12, 0.4)' },
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="b-palette__input-row">
          <SearchIcon />
          <input
            className="b-palette__input"
            autoFocus
            placeholder="검색어 또는 카테고리 이름을 입력하세요"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="b-palette-list"
          />
          <kbd className="b-kbd">esc</kbd>
        </div>

        <div
          className="b-palette__list"
          id="b-palette-list"
          role="listbox"
          ref={listRef}
        >
          {items.length === 0 && (
            <div
              className="b-palette__group"
              style={{ padding: 24, textAlign: 'center' }}
            >
              일치하는 항목이 없어요
            </div>
          )}
          {items.map((item, index) => (
            <React.Fragment key={`g-${index}`}>
              {index === 0 && item.kind !== 'category' && (
                <div className="b-palette__group">
                  {trimmed ? '검색' : '바로가기'}
                </div>
              )}
              {index === firstCategoryIndex && (
                <div className="b-palette__group">카테고리</div>
              )}
              {item.kind === 'github' && (
                <div className="b-palette__group">링크</div>
              )}
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>

        <div className="b-palette__foot">
          <span>
            <kbd className="b-kbd">↑</kbd>
            <kbd className="b-kbd">↓</kbd> 이동
          </span>
          <span>
            <kbd className="b-kbd">↵</kbd> 선택
          </span>
          <span>
            <kbd className="b-kbd">/</kbd> 어디서든 열기
          </span>
        </div>
      </motion.div>
    </Dialog>
  );
}
