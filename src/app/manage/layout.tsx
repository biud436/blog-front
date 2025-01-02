'use client';

import React from 'react';
import { ManageLayout } from '@/layouts/ManageLayout';

interface LayoutProps {
  children: React.ReactNode[];
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ManageLayout>
      <>{children}</>
    </ManageLayout>
  );
}
