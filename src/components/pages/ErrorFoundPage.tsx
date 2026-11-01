import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Meta } from '@/components/common/utils/Meta';

interface ErrorComponentProps {
  message: string;
  statusCode: number;
}

export const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <MainLayout>
      <Meta title="오류 페이지" description="오류 페이지" />
      <section className="b-error">
        <div>
          <div className="b-error__code" aria-hidden="true">
            {props.statusCode}
            <span>.</span>
          </div>
          <h1 className="b-error__title">
            {props.message ?? '알 수 없는 오류입니다.'}
          </h1>
          <p className="b-error__desc">
            {props.statusCode === 403
              ? '이 글을 보려면 권한이 필요해요.'
              : '요청을 처리하는 중 문제가 생겼어요.'}
          </p>
          <Link href="/" className="b-btn b-btn--primary">
            홈으로 가기
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};
