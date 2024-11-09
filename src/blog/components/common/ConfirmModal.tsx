'use client';

import React from 'react';
import { MODAL_IDS, useModalStore } from '@/store/modal/ModalStore';
import { Modal } from './Modal';

// 확인 모달 컴포넌트

export const ConfirmModal = () => {
  const { closeModal } = useModalStore();

  return (
    <Modal modalId={MODAL_IDS.CONFIRM}>
      <div className="flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          취소
        </button>
        <button
          onClick={() => {
            // 확인 로직
            closeModal();
          }}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};
