'use client';

import React from 'react';
import { MainLayout } from '@/layouts/BlogMainLayout';

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return <MainLayout name={''}>{children}</MainLayout>;
}
