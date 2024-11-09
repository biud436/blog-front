'use client';

import React from 'react';
import { useModalStore } from '@/store/modal/ModalStore';

interface ModalProps {
  modalId: string;
  children?: React.ReactNode;
}

export const Modal = ({ modalId, children }: ModalProps) => {
  const { activeModal, modalOptions, closeModal } = useModalStore();

  if (activeModal !== modalId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal} />
      <div className="relative z-50 w-full max-w-lg p-6 mx-4 bg-white rounded-lg">
        {modalOptions?.title && (
          <h2 className="mb-4 text-xl font-semibold">{modalOptions.title}</h2>
        )}
        {modalOptions?.message && (
          <p className="mb-4">{modalOptions.message}</p>
        )}
        {children}
      </div>
    </div>
  );
};
