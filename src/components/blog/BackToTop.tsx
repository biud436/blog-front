'use client';

import React, { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardRounded';

/** 스크롤 진행률을 얇은 링으로 보여주는 맨 위로 버튼 */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, 'change', value => {
    const next = value > 800;
    setShow(prev => (prev === next ? prev : next));
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="b-top-btn"
          // 개발 모드에서는 React Query Devtools 버튼과 겹치지 않도록 띄웁니다.
          style={
            process.env.NODE_ENV === 'development' ? { bottom: 84 } : undefined
          }
          aria-label="맨 위로"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            className="b-top-btn__ring"
            viewBox="0 0 48 48"
            width="48"
            height="48"
            aria-hidden="true"
          >
            <motion.circle
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="var(--b-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUpwardIcon fontSize="small" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
