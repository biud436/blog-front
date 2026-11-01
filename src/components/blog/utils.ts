import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { DateUtil, Formatter } from '@/lib/date';
import type { CSSProperties } from 'react';

function hashOf(seed: string | number): number {
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** 썸네일이 없는 글/카테고리 점에 쓰는 차분한 색상 (orange, blue, green, violet, pink, amber, cyan, red) */
const HUES = [24, 212, 152, 262, 336, 42, 190, 4];

export function hueOf(seed: string | number): number {
  return HUES[hashOf(seed) % HUES.length];
}

/** CSS custom property `--h` used by `.b-gen`, `.b-tree__dot`, `.b-palette__swatch` */
export function hueStyle(seed: string | number): CSSProperties {
  return { '--h': hueOf(seed) } as CSSProperties;
}

/**
 * `useCategoryTree` appends the post count to the category name as "Name (12)".
 * Split it back so the count can be rendered separately.
 */
export function splitCategoryName(name: string): {
  label: string;
  count?: number;
} {
  const match = /^(.*?)\s*\((\d+)\)$/.exec(name ?? '');
  if (!match) return { label: name ?? '' };
  return { label: match[1], count: Number(match[2]) };
}

export function relativeDate(dateStr?: string): string {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return DateUtil.ToDateStringBySeoul(dateStr, Formatter.DATE);
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return DateUtil.ToDateStringBySeoul(dateStr, 'YYYY년 M월 D일');
}

export function isRecent(dateStr?: string, days = 5): boolean {
  if (!dateStr) return false;
  return Date.now() - new Date(dateStr).getTime() <= days * 24 * 60 * 60 * 1000;
}

/** Rough reading time for Korean + code heavy markdown. */
export function readingMinutes(markdown?: string): number {
  if (!markdown) return 1;
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/[#>*_`~|[\]()-]/g, ' ')
    .replace(/\s+/g, ' ');
  return Math.max(1, Math.round(text.length / 500));
}

/** Strip the most common markdown tokens for card excerpts. */
export function plainText(markdown?: string): string {
  if (!markdown) return '';
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Depth-first flatten of the category tree. */
export function flattenCategories(
  list: CategoryDepthVO[] | undefined,
  out: CategoryDepthVO[] = [],
): CategoryDepthVO[] {
  (list ?? []).forEach(category => {
    out.push(category);
    flattenCategories(category.children, out);
  });
  return out;
}
