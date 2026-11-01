'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import CloseIcon from '@mui/icons-material/CloseRounded';

export interface ZoomImage {
  src: string;
  alt: string;
}

/** 본문 이미지를 화면 가득 보여줍니다. 배경/이미지/Esc로 닫습니다. */
export function ImageZoom({
  image,
  onClose,
}: {
  image: ZoomImage | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    root.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [image, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          key={image.src}
          className="b-zoom b-portal"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt || '이미지 크게 보기'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          {image.alt && <p className="b-zoom__caption">{image.alt}</p>}
          <button
            ref={closeRef}
            type="button"
            className="b-zoom__close"
            aria-label="닫기"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
