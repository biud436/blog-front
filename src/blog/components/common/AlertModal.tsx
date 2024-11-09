'use client';

import React from 'react';
import { MODAL_IDS } from '@/store/modal/ModalStore';
import { Modal } from './Modal';

export const AlertModal = () => {
  return (
    <Modal modalId={MODAL_IDS.ALERT}>
      <button
        onClick={() => {
          // 확인 로직
        }}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        확인
      </button>
    </Modal>
  );
};
