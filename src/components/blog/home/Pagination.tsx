'use client';

import React from 'react';
import usePagination from '@mui/material/usePagination';
import { LayoutGroup, motion } from 'motion/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';

export function Pagination({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: (page: number) => void;
}) {
  const { items } = usePagination({
    count,
    page,
    boundaryCount: 1,
    siblingCount: 1,
    onChange: (_event, value) => onChange(value),
  });

  if (count <= 1) return null;

  return (
    <LayoutGroup id="b-pager">
      <nav className="b-pager" aria-label="페이지 이동">
        {items.map(({ page: itemPage, type, selected, ...item }, index) => {
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            return (
              <span
                key={index}
                className="b-pager__item b-pager__item--ellipsis"
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          if (type === 'page') {
            return (
              <button
                key={index}
                type="button"
                className={`b-pager__item ${
                  selected ? 'b-pager__item--active' : ''
                }`}
                {...item}
              >
                {selected && (
                  <motion.span
                    layoutId="b-pager-fill"
                    className="b-pager__fill"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                {itemPage}
              </button>
            );
          }

          if (type !== 'previous' && type !== 'next') return null;

          return (
            <button
              key={index}
              type="button"
              className="b-pager__item"
              aria-label={type === 'previous' ? '이전 페이지' : '다음 페이지'}
              {...item}
            >
              {type === 'previous' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
