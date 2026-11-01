'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/** 글 읽기 진행률을 화면 최상단에 얇은 바로 표시합니다. */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div className="b-progress" style={{ scaleX }} aria-hidden="true" />
  );
};
