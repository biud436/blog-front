import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/layouts/BlogMainLayout';

export const NotFoundPage = () => {
  return (
    <MainLayout>
      <section className="b-error">
        <div>
          <div className="b-error__code" aria-hidden="true">
            404<span>.</span>
          </div>
          <h1 className="b-error__title">페이지를 찾을 수 없어요</h1>
          <p className="b-error__desc">
            주소가 바뀌었거나 삭제된 페이지일 수 있어요.
          </p>
          <Link href="/" className="b-btn b-btn--primary">
            홈으로 가기
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};
