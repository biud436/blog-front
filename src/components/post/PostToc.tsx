'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
} from 'motion/react';
import Drawer from '@mui/material/Drawer';
import TocIcon from '@mui/icons-material/TocRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardRounded';
import { toast } from 'react-toastify';

export interface TocHeading {
  id: string;
  text: string;
  depth: number;
}

const ACTIVE_OFFSET = 120;

export async function copyCurrentUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('링크를 복사했어요', {
      position: 'bottom-center',
      autoClose: 1600,
    });
  } catch {
    toast.error('링크를 복사하지 못했어요', { position: 'bottom-center' });
  }
}

/**
 * 본문 제목(h1~h3)을 모읍니다.
 * 뷰어가 동적으로 로드되므로 MutationObserver로 제목이 생기는 시점을 기다립니다.
 */
export function useTocHeadings(
  containerRef: RefObject<HTMLElement | null>,
): TocHeading[] {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const collect = () => {
      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(
          '.toastui-editor-contents h1[id], .toastui-editor-contents h2[id], .toastui-editor-contents h3[id]',
        ),
      );
      if (nodes.length === 0) return;
      const minLevel = Math.min(...nodes.map(node => Number(node.tagName[1])));
      setHeadings(
        nodes.map(node => ({
          id: node.id,
          text: node.textContent?.trim() ?? '',
          depth: Number(node.tagName[1]) - minLevel + 1,
        })),
      );
    };

    collect();
    const observer = new MutationObserver(collect);
    observer.observe(container, { childList: true, subtree: true });
    const stop = window.setTimeout(() => observer.disconnect(), 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(stop);
    };
  }, [containerRef]);

  return headings;
}

/** 현재 읽고 있는 제목의 id (스크롤마다 rAF로 한 번만 계산) */
export function useActiveHeading(headings: TocHeading[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0)
          current = heading.id;
      }
      setActiveId(current ?? headings[0].id);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  return activeId;
}

/**
 * 본문 진행률(0~1 MotionValue, 0~100 정수).
 * 본문 시작이 화면 위 120px에 닿으면 0, 본문 끝이 화면 아래에 닿으면 1입니다.
 * 뷰어가 늦게 로드되어 본문 높이가 바뀌므로 ResizeObserver로도 다시 계산합니다.
 */
export function useArticleProgress(
  containerRef: RefObject<HTMLElement | null>,
) {
  const progress = useMotionValue(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight + ACTIVE_OFFSET;
      const value =
        distance <= 0
          ? rect.top <= ACTIVE_OFFSET
            ? 1
            : 0
          : Math.min(1, Math.max(0, (ACTIVE_OFFSET - rect.top) / distance));
      progress.set(value);
      const next = Math.round(value * 100);
      setPercent(prev => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(el);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [containerRef, progress]);

  return { progress, percent };
}

export function jumpToHeading(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
}

/** 목록 항목 (데스크톱 목차와 모바일 시트가 함께 씁니다) */
export function TocList({
  headings,
  activeId,
  layoutId,
  onSelect,
}: {
  headings: TocHeading[];
  activeId: string | null;
  layoutId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="b-toc__list">
      {headings.map(heading => {
        const isActive = heading.id === activeId;
        return (
          <li key={heading.id}>
            <button
              type="button"
              className={[
                'b-toc__link',
                `b-toc__link--d${Math.min(heading.depth, 3)}`,
                isActive ? 'b-toc__link--active' : '',
              ].join(' ')}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onSelect(heading.id)}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className="b-toc__indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              {heading.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

interface TocState {
  headings: TocHeading[];
  activeId: string | null;
  progress: MotionValue<number>;
  percent: number;
}

/** 1280px 이상에서 본문 오른쪽에 붙는 목차 */
function DesktopToc({ headings, activeId, progress, percent }: TocState) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="b-toc__head">
        <span>{headings.length > 0 ? '목차' : '읽는 중'}</span>
        <span className="b-toc__pct">{percent}%</span>
      </div>
      <div className="b-toc__bar">
        <motion.div style={{ scaleX: progress }} />
      </div>

      {headings.length > 0 && (
        <TocList
          headings={headings}
          activeId={activeId}
          layoutId="b-toc-indicator"
          onSelect={jumpToHeading}
        />
      )}

      <div className="b-toc__actions">
        <button
          type="button"
          className="b-btn b-btn--sm"
          onClick={copyCurrentUrl}
        >
          <LinkIcon /> 링크 복사
        </button>
        <button
          type="button"
          className="b-icon-btn"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpwardIcon />
        </button>
      </div>
    </motion.div>
  );
}

/**
 * 1280px 미만에서는 오른쪽 목차 대신, 읽는 동안 하단에 현재 섹션을 보여주는 버튼을 띄우고
 * 누르면 아래에서 목차 시트를 엽니다.
 */
function MobileToc({ headings, activeId, progress, percent }: TocState) {
  const [open, setOpen] = useState(false);
  const pendingJump = useRef<string | null>(null);

  const visible = headings.length > 0 && percent > 0 && percent < 100;
  const current = headings.find(heading => heading.id === activeId);

  const select = (id: string) => {
    // 시트가 닫히며 스크롤 잠금이 풀린 뒤에 이동해야 정확한 위치로 갑니다.
    pendingJump.current = id;
    setOpen(false);
  };

  return (
    <>
      <div className="b-toc-fab-wrap">
        <AnimatePresence>
          {visible && !open && (
            <motion.button
              type="button"
              className="b-toc-fab"
              aria-label={`목차 열기, 현재 섹션: ${current?.text ?? ''}`}
              aria-haspopup="dialog"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(true)}
            >
              <TocIcon fontSize="small" />
              <span className="b-toc-fab__text">{current?.text ?? '목차'}</span>
              <span className="b-toc-fab__pct">{percent}%</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: 'b-sheet' }}
        SlideProps={{
          onExited: () => {
            if (pendingJump.current) jumpToHeading(pendingJump.current);
            pendingJump.current = null;
          },
        }}
      >
        <div className="b-sheet__handle" aria-hidden="true" />
        <div className="b-toc__head">
          <span>목차</span>
          <span className="b-toc__pct">{percent}%</span>
        </div>
        <div className="b-toc__bar">
          <motion.div style={{ scaleX: progress }} />
        </div>
        <TocList
          headings={headings}
          activeId={activeId}
          layoutId="b-toc-indicator-sheet"
          onSelect={select}
        />
        <div className="b-toc__actions">
          <button
            type="button"
            className="b-btn b-btn--sm"
            onClick={copyCurrentUrl}
          >
            <LinkIcon /> 링크 복사
          </button>
          <button
            type="button"
            className="b-btn b-btn--sm"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArrowUpwardIcon /> 맨 위로
          </button>
        </div>
      </Drawer>
    </>
  );
}

/** 목차 데이터는 한 번만 계산해 데스크톱 목차와 모바일 시트가 함께 씁니다. */
export function PostReadingAids({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const headings = useTocHeadings(containerRef);
  const activeId = useActiveHeading(headings);
  const { progress, percent } = useArticleProgress(containerRef);
  const state = { headings, activeId, progress, percent };

  return (
    <>
      <aside className="b-post-aside" aria-label="목차">
        <DesktopToc {...state} />
      </aside>
      <MobileToc {...state} />
    </>
  );
}
