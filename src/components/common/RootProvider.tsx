import React from 'react';
import { CategoryServiceProvider } from '@/services/CategoryService';
import { RootServiceProvider } from '@/services/RootService';

export interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <RootServiceProvider>
      <CategoryServiceProvider>{children}</CategoryServiceProvider>
    </RootServiceProvider>
  );
}
