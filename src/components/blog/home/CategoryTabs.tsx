'use client';

import React from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { CategoryDepthVO } from '@/models/CategoryDepthVO';
import { splitCategoryName } from '../utils';

/** 목록 상단에 붙어 따라오는 카테고리 탭 */
export function CategoryTabs({
  categories,
  rootId,
  currentId,
  onSelect,
}: {
  categories: CategoryDepthVO[];
  rootId?: number;
  currentId?: number | null;
  onSelect: (category: CategoryDepthVO) => void;
}) {
  if (categories.length === 0) return null;

  return (
    <LayoutGroup id="b-category-tabs">
      <div className="b-tabs" role="tablist" aria-label="카테고리">
        {categories.map(category => {
          const { label, count } = splitCategoryName(category.name);
          const isActive =
            category.id === rootId ? !currentId : currentId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`b-tab ${isActive ? 'b-tab--active' : ''}`}
              onClick={() => onSelect(category)}
            >
              {category.id === rootId ? '전체' : label}
              {count !== undefined && (
                <span className="b-tab__count">{count}</span>
              )}
              {isActive && (
                <motion.span
                  layoutId="b-tab-bar"
                  className="b-tab__bar"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
