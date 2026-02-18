import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '블로그 에디터',
  description: '포스트를 작성하거나 수정합니다',
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}
