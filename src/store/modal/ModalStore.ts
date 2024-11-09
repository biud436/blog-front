import { create } from 'zustand';

// 모달 옵션 인터페이스
export interface ModalOptions {
  title?: string;
  message?: string;
}

// 모달 ID 상수
export const MODAL_IDS = {
  CONFIRM: 'confirm',
  ALERT: 'alert',
  FORM: 'form',
} as const;

export type ModalId = typeof MODAL_IDS[keyof typeof MODAL_IDS];

interface ModalState {
  // 현재 열린 모달의 ID를 저장
  activeModal: ModalId | null;
  // 모달에 전달할 옵션과 추가 데이터
  modalOptions: ModalOptions | null;
  modalData: string | null;

  // 모달 열기 액션
  openModal: (
    modalId: ModalId,
    options?: ModalOptions,
    data?: string | null,
  ) => void;
  // 모달 닫기 액션
  closeModal: () => void;
  // 모달 옵션 설정 액션
  setModalOptions: (options: ModalOptions) => void;
  // 모달 데이터 설정 액션
  setModalData: (data: string | null) => void;
}

export const useModalStore = create<ModalState>(set => ({
  activeModal: null,
  modalOptions: null,
  modalData: null,

  openModal: (
    modalId: ModalId,
    options?: ModalOptions,
    data?: string | null,
  ) => {
    set({
      activeModal: modalId,
      modalOptions: options || null,
      modalData: data || null,
    });
  },

  closeModal: () => {
    set({
      activeModal: null,
      modalOptions: null,
      modalData: null,
    });
  },

  setModalOptions: (options: ModalOptions) => {
    set({
      modalOptions: options,
    });
  },

  setModalData: (data: string | null) => {
    set({
      modalData: data,
    });
  },
}));
